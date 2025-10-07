export default function StepsSkeleton () {
    return (
        <div className="w-full flex flex-col items-center py-20 gap-8">
            <div className="h-5 w-32 bg-gray-700 rounded"></div>
            <div className="h-10 w-64 bg-gray-700 rounded"></div>
        
            <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-20 px-4 max-w-5xl">
            {[1, 2, 3].map((step) => (
                <div key={`skeleton-step-${step}`} className="flex items-start gap-4 w-full md:w-1/3">
                  <div className="w-16 h-16 bg-gray-700 rounded-full shrink-0"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-40 bg-gray-700 rounded"></div>
                    <div className="h-4 w-56 bg-gray-700 rounded"></div>
                    <div className="h-4 w-48 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
        </div>
    )
}