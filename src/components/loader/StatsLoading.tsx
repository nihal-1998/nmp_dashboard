export default function StatsLoading () {
  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1 Skeleton */}
        <div className="bg-white rounded-lg shadow-sm   p-6 animate-pulse">
          <div className="flex items-center space-x-4">
            {/* Icon skeleton */}
            <div className="w-12 h-12 bg-blue-100 rounded-lg shrink-0">
              <div className="w-6 h-6 bg-blue-300 rounded mx-auto mt-3 animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              {/* Number skeleton */}
              <div className="h-8 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              {/* Label skeleton */}
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Card 2 Skeleton */}
        <div className="bg-white rounded-lg shadow-sm  p-6 animate-pulse">
          <div className="flex items-center space-x-4">
            {/* Icon skeleton */}
            <div className="w-12 h-12 bg-cyan-100 rounded-lg shrink-0">
              <div className="w-6 h-6 bg-cyan-300 rounded mx-auto mt-3 animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              {/* Number skeleton */}
              <div className="h-8 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
              {/* Label skeleton */}
              <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Card 3 Skeleton */}
        <div className="bg-white rounded-lg shadow-sm  p-6 animate-pulse">
          <div className="flex items-center space-x-4">
            {/* Icon skeleton */}
            <div className="w-12 h-12 bg-red-100 rounded-lg shrink-0">
              <div className="w-6 h-6 bg-red-300 rounded mx-auto mt-3 animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              {/* Number skeleton */}
              <div className="h-8 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              {/* Label skeleton */}
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Card 4 Skeleton */}
        <div className="bg-white rounded-lg shadow-sm  p-6 animate-pulse">
          <div className="flex items-center space-x-4">
            {/* Icon skeleton */}
            <div className="w-12 h-12 bg-purple-100 rounded-lg shrink-0">
              <div className="w-6 h-6 bg-purple-300 rounded mx-auto mt-3 animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              {/* Number skeleton */}
              <div className="h-8 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
              {/* Label skeleton */}
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
