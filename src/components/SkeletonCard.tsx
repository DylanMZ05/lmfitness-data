export const SkeletonCard = () => (
  <div className="w-[250px] h-[400px] bg-white border border-gray-200 shadow rounded-lg p-4 animate-pulse flex flex-col justify-between">
    <div className="bg-gray-300 h-40 rounded mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-6 bg-gray-300 rounded w-full mt-2"></div>
    </div>
  </div>
);
