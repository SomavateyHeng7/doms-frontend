"use client"

export default function UserManagementGuide({ onClose }: { onClose?: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl border-2 border-blue-300 shadow-lg p-8 w-[350px] relative">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-black"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6">User Management Guide</h2>
        <ul className="mb-6 space-y-3">
          <li className="flex items-center gap-2 text-lg">
            <span className="inline-block w-3 h-3 bg-black rounded-full mr-2" />
            View Roles and Users
          </li>
          <li className="flex items-center gap-2 text-lg">
            <span className="inline-block w-3 h-3 bg-black rounded-full mr-2" />
            Create New Roles
          </li>
          <li className="flex items-center gap-2 text-lg">
            <span className="inline-block w-3 h-3 bg-black rounded-full mr-2" />
            Assign role to users
          </li>
          <li className="flex items-center gap-2 text-lg">
            <span className="inline-block w-3 h-3 bg-black rounded-full mr-2" />
            Edit Role Permission
          </li>
          <li className="flex items-center gap-2 text-lg">
            <span className="inline-block w-3 h-3 bg-black rounded-full mr-2" />
            Delete unused Roles
          </li>
        </ul>
        <hr className="mb-4" />
        <div className="flex items-center gap-2 text-base">
          <span className="inline-block text-2xl">💡</span>
          <span>Tip: Use the search bar to quickly find specific user</span>
        </div>
      </div>
    </div>
  )
}
