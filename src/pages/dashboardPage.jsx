import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/navigationBar';
import AppointmentCard from '../components/appointmentCard';
import { getAppointments, getAllDoctors, createAppointment, updateAppointment, deleteAppointment } from '../utils/endpoints';
import { isLoggedIn, getUserId } from '../utils/authentication';

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Dashboard | Klinik Javen";
  }, []);

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    doctor_id: '',
    date_time: ''
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const userId = getUserId();
      
      const appointmentsResponse = await getAppointments(userId);
      if (appointmentsResponse.data && appointmentsResponse.data.success) {
        setAppointments(appointmentsResponse.data.payload);
      }

      const doctorsResponse = await getAllDoctors();
      if (doctorsResponse.data && doctorsResponse.data.success) {
        setDoctors(doctorsResponse.data.payload);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError('Gagal memuat data. Silakan refresh halaman.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      doctor_id: '',
      date_time: ''
    });
    setEditingAppointment(null);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const openEditModal = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      doctor_id: appointment.doctor_id,
      date_time: new Date(appointment.date_time).toISOString().slice(0, 16)
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const userId = getUserId();
    
    try {
      let response;
      
      if (editingAppointment) {
        response = await updateAppointment(editingAppointment.id, formData);
      } else {
        response = await createAppointment({
          user_id: userId,
          ...formData
        });
      }
      
      if (response.data.success) {
        loadData();
        closeModal();
      } else {
        setError(response.data.message || 'Gagal menyimpan janji temu');
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError('Gagal menyimpan janji temu. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Anda yakin ingin membatalkan janji temu ini?')) {
      setIsLoading(true);
      try {
        const response = await deleteAppointment(id);
        
        if (response.data.success) {
          setAppointments(appointments.filter(appointment => appointment.id !== id));
        } else {
          setError(response.data.message || 'Gagal menghapus janji temu');
        }
      } catch (err) {
        console.error("Error deleting appointment:", err);
        setError('Gagal menghapus janji temu. Silakan coba lagi.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Janji Temu Saya</h1>
          <button
            onClick={openModal}
            className="bg-[#0077b6] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Buat Janji Temu
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}
        
        {isLoading && !showModal ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#0077b6] border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            {appointments.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">Anda belum memiliki janji temu. Buat janji temu pertama Anda sekarang!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    onDelete={handleDeleteAppointment}
                    onUpdate={openEditModal}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingAppointment ? 'Edit Janji Temu' : 'Buat Janji Temu Baru'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="doctor_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Dokter
                </label>
                <select
                  id="doctor_id"
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                >
                  <option value="">-- Pilih Dokter --</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="date_time" className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal dan Waktu
                </label>
                <input
                  type="datetime-local"
                  id="date_time"
                  name="date_time"
                  value={formData.date_time}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0077b6] hover:bg-blue-800 text-white rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? 'Menyimpan...' : editingAppointment ? 'Perbarui' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;