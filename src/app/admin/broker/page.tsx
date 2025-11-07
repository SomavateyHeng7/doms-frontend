
"use client"

import DynamicPDFPreview from "@/components/DynamicPDFPreview"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default function BrokerPDFPage() {
	return (
		<div className="min-h-screen bg-[#f5f6fa] flex flex-col">
			{/* Header with Language Switcher */}
			<header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
				<div className="flex items-center justify-between">
					<h1 className="text-gray-500 text-base sm:text-lg font-medium">
						PDF Viewer
					</h1>
					<LanguageSwitcher />
				</div>
			</header>

			{/* PDF Content */}
			<div className="flex-1 flex items-center justify-center">
				<DynamicPDFPreview />
			</div>
		</div>
	)
}
