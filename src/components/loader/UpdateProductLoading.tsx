export default function UpdateProductLoading() {
  return (
    <div className="mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Images Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Name */}
        <div className="space-y-2">
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded  animate-pulse"></div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded  animate-pulse relative">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Current Price */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded  animate-pulse"></div>
        </div>

        {/* Old Price */}
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded  animate-pulse"></div>
        </div>
      </div>

      {/* Second Row of Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Colors */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded  animate-pulse"></div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded  animate-pulse"></div>
        </div>

        {/* Empty space for layout */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Third Row of Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Status */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded  animate-pulse relative">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Stock Status */}
        <div className="space-y-2">
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded  animate-pulse relative">
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded  animate-pulse"></div>
        </div>
      </div>

      {/* Short Introduction */}
      <div className="mb-8">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>

        {/* Rich Text Editor Toolbar */}
        <div className=" rounded-t-lg p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Text Editor Content Area */}
        <div className=" -t-0 rounded-b-lg p-4 h-32 bg-white">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Separator */}
      <div className="-t -gray-200 mb-8"></div>

      {/* Description */}
      <div>
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>

        {/* Rich Text Editor Toolbar */}
        <div className=" rounded-t-lg p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Text Editor Content Area */}
        <div className=" -t-0 rounded-b-lg p-4 h-40 bg-white">
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-right">
        <div className="h-3 w-64 bg-gray-200 rounded animate-pulse ml-auto"></div>
      </div>
    </div>
  )
}
