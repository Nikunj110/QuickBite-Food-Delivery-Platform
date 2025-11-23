import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div
      id='app-download'
      className='app my-20 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-12 text-center shadow-lg border border-gray-200'
    >
      <h2 className='text-3xl font-bold text-gray-900 mb-6'>
        For Better Experience Download <br />
        <span className='text-black'>Tomato</span> App
      </h2>
      <p className='text-gray-600 text-lg mb-8 max-w-2xl mx-auto'>
        Get exclusive offers, faster ordering, and a seamless experience with our mobile app
      </p>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        <img 
          className='h-16 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg' 
          src={assets.play_store} 
          alt="Play Store" 
        />
        <img 
          className='h-16 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg' 
          src={assets.app_store} 
          alt="App Store" 
        />
      </div>
    </div>
  )
}

export default AppDownload
