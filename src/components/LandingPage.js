import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-red-600 text-2xl font-bold">Blood Donation</h1>
        <div>
          <Link to="#features" className="mx-4 text-gray-700">Features</Link>
          <Link to="#testimonials" className="mx-4 text-gray-700">Testimonials</Link>
          <Link to="#contact" className="mx-4 text-gray-700">Contact</Link>
          <Link to="/register">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">Register</button>
          </Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="bg-red-600 text-white text-center p-20">
        <h1 className="text-5xl font-bold">Save Lives, Donate Blood</h1>
        <p className="mt-4 text-lg">Join our platform to connect donors with those in need.</p>
        <Link to="/register">
          <button className="mt-6 px-6 py-3 bg-white text-red-600 font-semibold rounded-md shadow-md">
            Get Started
          </button>
        </Link>
      </header>
      
      {/* Features Section */}
      <section id="features" className="p-10 text-center">
        <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 shadow-lg rounded-md">
            <h3 className="text-xl font-bold">Find Donors Easily</h3>
            <p className="mt-2">Search by location, blood group, or name.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-md">
            <h3 className="text-xl font-bold">Manage Donations</h3>
            <p className="mt-2">Track donor history and availability.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-md">
            <h3 className="text-xl font-bold">Secure & Verified</h3>
            <p className="mt-2">Ensuring authentic donor information.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-200 p-10 text-center">
        <h2 className="text-3xl font-semibold">What Our Users Say</h2>
        <div className="mt-6 italic">"This platform helped me find a donor in an emergency. Life-saving!" - A User</div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="p-10 text-center">
        <h2 className="text-3xl font-semibold">Contact Us</h2>
        <p className="mt-4">Email: support@blooddonation.com</p>
        <p>Phone: +91 12345 67890</p>
      </section>
      
      {/* Footer */}
      <footer className="bg-red-600 text-white text-center p-5">
        <p>&copy; 2025 Blood Donation Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
