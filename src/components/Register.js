import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const API_URL = "http://localhost:5000/api/auth/register"; // Update with your API

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      console.log(data)
      const response = await axios.post(API_URL, data);
      setMessage({ type: "success", text: "Registration successful!" });
      reset(); // Reset form on success
    } catch (error) {
      console.log(error)
      const errorMsg = error.response?.data?.message || "Registration failed!";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Register as a Blood Donor</h2>

        {/* Success/Error Message */}
        {message && (
          <p className={`text-center p-2 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input {...register("name", { required: "Name is required" })} type="text" className="w-full p-2 border rounded-md" />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input {...register("email", { required: "Email is required" })} type="email" className="w-full p-2 border rounded-md" />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone</label>
            <input
              {...register("contact", { required: "Phone is required", pattern: { value: /^\d{10}$/, message: "Phone number must be 10 digits" } })}
              type="tel"
              className="w-full p-2 border rounded-md"
            />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Aadhar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Aadhar Number</label>
            <input
              {...register("aadharNumber", { required: "Aadhar is required", pattern: { value: /^\d{12}$/, message: "Aadhar number must be 12 digits" } })}
              type="text"
              className="w-full p-2 border rounded-md"
            />
            {errors.aadhar && <p className="text-red-600 text-sm">{errors.aadhar.message}</p>}
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Blood Group</label>
            <select {...register("bloodGroup", { required: "Select your blood group" })} className="w-full p-2 border rounded-md">
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            {errors.bloodGroup && <p className="text-red-600 text-sm">{errors.bloodGroup.message}</p>}
          </div>
          
          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Address with Pincode</label>
            <textarea {...register("address")} className="w-full p-2 border rounded-md" />
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Allergies (comma-separated)</label>
            <input {...register("medicalInfo.allergies")} type="text" className="w-full p-2 border rounded-md" />
          </div>

          {/* Continuous Medications */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Continuous Medications (comma-separated)</label>
            <input {...register("medicalInfo.continuousMedications")} type="text" className="w-full p-2 border rounded-md" />
          </div>

          {/* Last Blood Donation Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Last Blood Donation Date</label>
            <input {...register("medicalInfo.lastDonationDate")} type="date" className="w-full p-2 border rounded-md" />
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">User Type</label>
            <select {...register("role", { required: "Please select a user type" })} className="w-full p-2 border rounded-md">
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">Donor</option>
            </select>
            {errors.userType && <p className="text-red-600 text-sm">{errors.userType.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input {...register("password", { required: "Password is required", minLength: 6 })} type="password" className="w-full p-2 border rounded-md" />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              type="password"
              className="w-full p-2 border rounded-md"
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
