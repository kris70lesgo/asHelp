export default function HeroSkeleton () {
    return (
        <div className="flex flex-col items-center justify-center text-center py-24 px-4 gap-6">
            <div className="h-8 w-56 bg-gray-700 rounded-full"></div>
            <div className="flex flex-wrap justify-center gap-2">
              <div className="h-12 w-48 bg-gray-700 rounded"></div>
              <div className="h-12 w-40 bg-gray-700 rounded"></div>
            </div>
            <div className="h-5 w-80 bg-gray-700 rounded mt-2"></div>
            <div className="h-5 w-64 bg-gray-700 rounded"></div>
            <div className="h-10 w-40 bg-gray-700 rounded-full mt-4"></div>
        </div>
    )
}