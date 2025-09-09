import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">
        
        {/* ==== Logo + Brand Name ==== */}
        <div className="max-w-96">
     
            <img
              src={assets.logo}
              alt="Logo"
              className="mb-4 h-8 md:h-9 invert opacity-80"
            />
            
          

          <p className="mt-6 text-sm text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been.
          </p>

          {/* ==== Social Links ==== */}
          <div className="flex items-center gap-2 mt-3">
            {/* social icons here */}
          </div>
        </div>

        {/* ==== Links ==== */}
        <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">RESOURCES</h2>
            <ul className="text-sm text-gray-500 space-y-2 list-none">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">COMPANY</h2>
            <ul className="text-sm text-gray-500 space-y-2 list-none">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-xs md:text-sm text-gray-500">
        Copyright 2024 © <a href="https://prebuiltui.com">QuickStay</a>. All Right Reserved.
      </p>
    </footer>
  )
}

export default Footer
