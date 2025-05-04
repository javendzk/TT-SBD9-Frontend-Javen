import React from 'react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const AppointmentCard = ({ appointment, onDelete, onUpdate }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-[#0077b6]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{appointment.doctor.name}</h3>
          <p className="text-sm text-gray-600">{appointment.doctor.specialization}</p>
          <p className="text-sm text-gray-800 mt-2">
            <span className="font-medium">Jadwal:</span> {formatDate(appointment.date_time)}
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onUpdate(appointment)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button 
            onClick={() => onDelete(appointment.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;