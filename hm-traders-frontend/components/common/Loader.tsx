export default function Loader() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-20 gap-4">
      <div className="w-14 h-14 border-4 border-[#FF9C00] border-t-transparent rounded-full animate-spin"></div>

      <p className="text-gray-600 text-lg font-medium animate-pulse">
        Please wait...
      </p>
    </div>
  );
}