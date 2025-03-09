import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import icons from react-icons

export const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* review Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Give as Review on our service
            </h3>
            <div className="flex items-center gap-4 text-gray-400">
              <textarea
                className="w-full p-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write your review here..."
                rows={4}
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                Submit
              </button>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm">123 Restaurant Street, City, Country</li>
              <li className="text-sm">Email: info@myrestaurant.com</li>
              <li className="text-sm">Phone: +123 456 7890</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-blue-300 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} My Restaurant. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
