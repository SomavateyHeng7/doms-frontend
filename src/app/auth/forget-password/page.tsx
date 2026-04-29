"use client"

import Image from "next/image"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/hooks/useTranslations"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { resetPassword } from "@/lib/api"

interface FormData {
  email: string
  newPassword: string
  confirmPassword: string
}

interface FormErrors {
  email?: string
  newPassword?: string
  confirmPassword?: string
  general?: string
}

export default function ForgetPasswordPage() {
  const { t } = useTranslations()
  const [formData, setFormData] = useState<FormData>({ email: "", newPassword: "", confirmPassword: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setErrors({})

    try {
      await resetPassword(formData.email, formData.newPassword, formData.confirmPassword)
      setIsSuccess(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to reset password. Please try again."
      setErrors({ general: message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <header className="flex items-center justify-between h-16 px-8 text-gray-600 text-lg font-medium">
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
        <LanguageSwitcher />
      </header>

      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex w-full max-w-6xl min-h-[600px] sm:h-[700px] overflow-hidden border border-gray-100">
          {/* Left: Image */}
          <div className="w-1/2 h-full relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10" />
            <Image
              src="/image/meeting.png"
              alt="Meeting"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-8 left-8 right-8 z-20 text-white">
              <h3 className="text-2xl font-bold mb-2">Reset Your Password</h3>
              <p className="text-blue-100">Enter your email and choose a new secure password to regain access.</p>
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
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {t("auth.forgotPassword")}
                </h2>
                <p className="text-sm sm:text-base text-gray-500">
                  Reset your account password below.
                </p>
              </div>

              {isSuccess ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Password Reset Successful</h3>
                  <p className="text-sm text-gray-500 text-center">
                    Your password has been updated. You can now sign in with your new password.
                  </p>
                  <Link
                    href="/auth/login"
                    className="mt-2 w-full text-center bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Back to Sign In
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {errors.general && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errors.general}
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("auth.email")}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder-gray-400 bg-white ${
                          errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center mt-1.5 text-sm text-red-600 gap-1">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password"
                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder-gray-400 bg-white ${
                          errors.newPassword ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? <Eye className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <div className="flex items-center mt-1.5 text-sm text-red-600 gap-1">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.newPassword}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("auth.confirmPassword")}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm new password"
                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black placeholder-gray-400 bg-white ${
                          errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <Eye className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center mt-1.5 text-sm text-red-600 gap-1">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 text-sm sm:text-base rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Resetting password...
                      </div>
                    ) : (
                      "Reset Password"
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
