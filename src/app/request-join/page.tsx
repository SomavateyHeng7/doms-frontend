"use client"

import Image from "next/image"

export default function RequestToJoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
       <header className="flex items-center h-14 sm:h-16 px-4 sm:px-8 text-gray-600 text-base sm:text-lg font-medium">
         <div className="flex items-center gap-2">
           <Image
             src="/image/logo2.png"
             alt="OfficeSync Logo"
             width={56}
             height={56}
             className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg object-cover"
             priority
           />
           <span className="font-semibold text-sm sm:text-base">OfficeSync</span>
         </div>
       </header>
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-[1100px] min-h-[600px] md:h-[700px] overflow-hidden">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 h-48 md:h-full relative">
            <Image
              src="/image/meeting.png"
              alt="Meeting"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            {/* Logo + Title */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <Image
                  src="/image/logo2.png"
                  alt="OfficeSync Logo"
                  width={56}
                  height={56}
                  className="rounded-xl object-cover mr-2 sm:mr-3 w-10 h-10 sm:w-14 sm:h-14"
                  priority
                />
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  OfficeSync
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Request to Join
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Please enter your details to request access
              </p>
            </div>

            {/* Form Inputs */}
            <form className="w-full max-w-sm flex flex-col gap-3 sm:gap-4 mx-auto">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Latin Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Khmer Name
                </label>
                <input
                  type="text"
                  placeholder="ចន ដូ"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="JohnDoe@example.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  ID
                </label>
                <input
                  type="text"
                  placeholder="1010110101"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Type of User
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white text-sm sm:text-base">
                  <option value="">Select Type of User</option>
                  <option value="officer">Officer</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </form>

            {/* Button at bottom */}
            <button
              type="submit"
              className="w-full max-w-sm mx-auto bg-black text-white rounded-full py-2.5 sm:py-3 text-base sm:text-lg font-semibold hover:bg-gray-900 transition-all shadow-md touch-manipulation"
            >
              Request Access
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
