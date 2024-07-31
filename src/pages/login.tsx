import React, { useState, ChangeEvent, FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = 'site-key'; // Replace with your actual reCAPTCHA site key

// Define the shape of the form data
interface FormData {
  email: string;
  password: string;
  captcha: string | null;
}

const Login: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    captcha: null,
  });

  // Handler for input field changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Handler for reCAPTCHA value changes
  const handleRecaptchaChange = (value: string | null) => {
    setFormData(prevState => ({ ...prevState, captcha: value }));
  };

  // Handler for form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Validate input fields
    if (!formData.email || !formData.password ) {
      console.error('All fields are required.');
      return;
    }

    // Log the data to the console
    console.log('Submitting data:', formData);

    // Example API call (replace with your actual API endpoint)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-4 left-4 text-black text-3xl">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
      </div>
      <div className="w-full max-w-md px-8 space-y-8">
        <div className="text-center pb-11">
          <p className="text-gray-500 text-sm">START YOUR DATA MANAGEMENT EXPERIENCE</p>
          <h1 className="text-3xl text-black font-bold mt-4">Login your account</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div className="pb-4">
              <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">
                E-mail*
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.94 6.94a1 1 0 011.32-.08l.1.08 5.54 5.53 5.54-5.53a1 1 0 011.5 1.32l-.08.1-6.25 6.25a1 1 0 01-1.32.08l-.1-.08-6.25-6.25a1 1 0 010-1.42z" />
                  </svg>
                </span>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-100 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder='E-mail'
                />
              </div>
            </div>
            <div className="pb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password*
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a4 4 0 014 4v4h1.5a1.5 1.5 0 110 3H4.5a1.5 1.5 0 110-3H6V6a4 4 0 014-4zm1 6V6a1 1 0 10-2 0v2h2z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-100 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder='Password'
                />
              </div>
            </div>
          </div>
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
          />
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
