"use client"

import Image from "next/image"

export default function RequestToJoinPage() {
  return (
    <div className="min-h-screen bg-[#dbdbdb] flex flex-col">
      {/* Header */}
      <header className="flex items-center h-12 px-10 text-gray-500 text-xl font-medium">
        Request To Join
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg flex w-[1100px] h-[650px] overflow-hidden">
          {/* Left: Image */}
          <div className="w-1/2 h-full relative">
            <Image
              src="/image/meeting.jpg"
              alt="Meeting"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Right: Form */}
          <div className="w-1/2 flex flex-col items-center justify-center p-12">
            <div className="flex flex-col items-center mb-8">
              <Image src="/image/logo.png" alt="OfficeSync Logo" width={64} height={64} className="mb-2" />
              <span className="text-3xl font-semibold mb-2">OfficeSync</span>
              <h2 className="text-2xl font-medium mb-2 mt-2">Request to Join</h2>
              <p className="text-gray-500 text-sm">Please enter your detail, to request to join</p>
            </div>
            <form className="w-full max-w-sm flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Latin Name</label>
                <input type="text" placeholder="John Doe" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Khmer Name</label>
                <input type="text" placeholder="John Doe" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Email</label>
                <input type="email" placeholder="JohnDoe@example.com" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">ID</label>
                <input type="text" placeholder="1010110101" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Type of User</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-gray-500">
                  <option value="">Select Type of User</option>
                  <option value="officer">Officer</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <button type="submit" className="w-full mt-4 bg-black text-white rounded-full py-2 text-lg font-medium hover:bg-gray-900 transition">Log In</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
