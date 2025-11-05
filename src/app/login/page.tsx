"use client"

import Image from "next/image"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include', // needed for Laravel Sanctum, safe for JWT too
      });

      const data = await res.json();

      if (res.ok) {
        // Store token if using JWT, or rely on cookies for Sanctum
        // localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        setErrors({ email: data.message || 'Login failed' });
      }
    } catch {
      setErrors({ email: 'Network error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center h-16 px-8 text-gray-600 text-lg font-medium">
        <div className="flex items-center gap-2">
          <Image
            src="/image/logo2.png"
            alt="OfficeSync Logo"
            width={56}
            height={56}
            className="w-8 h-8 rounded-lg object-cover"
            priority
          />
          <span className="font-semibold">OfficeSync</span>
        </div>
      </header>
      
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex w-full max-w-6xl min-h-[600px] sm:h-[700px] overflow-hidden border border-gray-100">
          {/* Left: Image */}
          <div className="w-1/2 h-full relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
            <Image
              src="/image/meeting.png"
              alt="Meeting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
              <h3 className="text-2xl font-bold mb-2">Welcome to OfficeSync</h3>
              <p className="text-blue-100">Streamline your document management and approval workflows</p>
            </div>
          </div>
          
          {/* Right: Form */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src="/image/logo2.png"
                    alt="OfficeSync Logo"
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mr-3"
                    priority
                  />
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">OfficeSync</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                <p className="text-sm sm:text-base text-gray-600">Sign in to your account to continue</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder-gray-600 bg-white ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center mt-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder-gray-600 bg-white ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <Eye className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center mt-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                    Forgot password?
                  </Link>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 text-sm sm:text-base rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
