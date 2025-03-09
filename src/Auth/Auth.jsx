import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google"; // For Google Login

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        {/* Render Login or Signup Form */}
        {isLogin ? <LoginForm /> : <SignupForm />}
        {/* Toggle between Login and Signup */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:text-blue-700 text-sm mb-4"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
        {/* Google Login */}
        <div className="mt-6">
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-2"></div>
            <span className="text-gray-500">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>
          <div className="mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log("Google Login Success:", credentialResponse);
              }}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", { phone, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Login
      </button>
    </form>
  );
};

// Signup Form Component
const SignupForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", { name, phone, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Auth;
