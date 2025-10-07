export default function NavbarSkeleton () {
    return (
        <div className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <div className="h-6 w-32 bg-gray-700 rounded"></div>
                <div className="flex gap-4">
                    <div className="h-5 w-16 bg-gray-700 rounded"></div>
                    <div className="h-5 w-16 bg-gray-700 rounded"></div>
                    <div className="h-5 w-16 bg-gray-700 rounded"></div>
                </div>
            <div className="h-8 w-20 bg-gray-700 rounded-full"></div>
        </div>
    )
}