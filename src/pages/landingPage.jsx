import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/navigationBar';
import { isLoggedIn } from '../utils/authentication';
import landingImage from '../assets/landing_klinikjaven.png';

const LandingPage = () => {
  useEffect(() => {
    document.title = "Home | Klinik Javen";
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0077b6] via-[#0096c7] to-[#48cae4] h-[700px]"></div>        
        <NavigationBar isTransparent={true} />        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="py-20 md:py-28 md:flex md:items-center md:justify-between w-full">
            <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-4">
                Selamat Datang di Klinik Javen
              </h1>
              <p className="text-xl text-gray-100 mb-6">
                Reservasi dokter cepat, mudah, dan tanpa antri. Buat janji temu dengan dokter terbaik kami kapan saja dan di mana saja.
              </p>              
              {isLoggedIn() ? (
                <Link
                  to="/app"
                  className="inline-block bg-white hover:bg-gray-100 text-[#0077b6] font-medium py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg mr-4"
                >
                  Buka Dashboard
                </Link>
              ) : (
                <div className="flex flex-wrap space-y-3 md:space-y-0 md:space-x-4 justify-center md:justify-start">
                  <Link
                    to="/login"
                    className="inline-block bg-white hover:bg-gray-100 text-[#0077b6] font-medium py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg w-full md:w-auto"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#0077b6] font-medium py-3 px-8 rounded-md transition duration-300 text-lg w-full md:w-auto"
                  >
                    Daftar Sekarang
                  </Link>
                </div>
              )}
            </div>            
            <div className="md:w-1/2 flex justify-center">
              <img 
                src={landingImage} 
                alt="Klinik Javen"
                className="w-full h-auto object-cover transform hover:scale-105 transition duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Klinik+Javen';
                }}
              />
            </div>
          </div>
        </div>
      </div>      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-12 text-center">
            Mengapa Memilih Klinik Javen?
          </h2>          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-200/50 transition duration-300 flex flex-col items-center text-center">
              <div className="text-[#0077b6] mb-4 bg-gradient-to-br from-[#0077b6]/10 to-[#48cae4]/10 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Cepat & Efisien</h3>
              <p className="text-gray-600">Buat janji temu dalam hitungan menit tanpa perlu mengantri atau menelepon.</p>
            </div>            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-200/50 transition duration-300 flex flex-col items-center text-center">
              <div className="text-[#0077b6] mb-4 bg-gradient-to-br from-[#0077b6]/10 to-[#48cae4]/10 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 11.955 0 0112 2.944a11.955 11.955 11.955 0 01-8.618 3.04A12.02 12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Dokter Terpercaya</h3>
              <p className="text-gray-600">Kami hanya bekerja dengan dokter berpengalaman dan terpercaya di bidangnya.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-200/50 transition duration-300 flex flex-col items-center text-center">
              <div className="text-[#0077b6] mb-4 bg-gradient-to-br from-[#0077b6]/10 to-[#48cae4]/10 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Akses Mudah</h3>
              <p className="text-gray-600">Akses riwayat kunjungan, jadwal, dan buat janji temu dari mana saja dan kapan saja.</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#0077b6] to-[#48cae4] p-8 md:p-12 rounded-xl text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Siap untuk memulai pengalaman kesehatan yang lebih baik?
            </h2>            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isLoggedIn() ? (
                <Link
                  to="/app"
                  className="inline-block bg-white hover:bg-gray-100 text-[#0077b6] font-medium py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg w-full sm:w-auto"
                >
                  Buka Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-block bg-white hover:bg-gray-100 text-[#0077b6] font-medium py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg w-full sm:w-auto"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#0077b6] font-medium py-3 px-8 rounded-md transition duration-300 text-lg w-full sm:w-auto"
                  >
                    Daftar Sekarang
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;