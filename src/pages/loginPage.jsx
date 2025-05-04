import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/endpoints';
import { saveUser } from '../utils/authentication';
import NavigationBar from '../components/navigationBar';

const LoginPage = () => {
  useEffect(() => {
    document.title = "Log in | Klinik Javen";
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await loginUser(formData);
      
      if (response.data.success) {
        saveUser(response.data.payload);
        navigate('/app');
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <NavigationBar />
      
      <div className="pt-20 sm:pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white rounded-2xl shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0077b6] to-[#48cae4] opacity-95"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
                <img 
                    src="/src/assets/auth_klinikjaven.png" 
                    alt="Klinik Javen Auth"
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    }}
                />
                </div>
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12 lg:px-16 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                  <div className="text-center md:text-left mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Masuk ke Akun Anda</h2>
                    <p className="mt-2 text-gray-600">Silakan masukkan kredensial Anda untuk mengakses layanan Klinik Javen.</p>
                  </div>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                      <div className="flex">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p>{error}</p>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0077b6] focus:ring focus:ring-[#0077b6] focus:ring-opacity-20 transition-all text-base py-3 px-4"
                          placeholder="nama@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0077b6] focus:ring focus:ring-[#0077b6] focus:ring-opacity-20 transition-all text-base py-3 px-4"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className={`w-full flex justify-center items-center bg-gradient-to-r from-[#0077b6] to-[#48cae4] hover:from-[#0077b6] hover:to-[#0077b6] text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077b6] ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Memproses...
                        </>
                      ) : 'Masuk'}
                    </button>
                  </form>
                  
                  <div className="mt-8 text-center">
                    <p className="text-gray-600">
                      Belum punya akun?{' '}
                      <Link to="/register" className="text-[#0077b6] hover:text-blue-800 font-medium">
                        Daftar Sekarang
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;