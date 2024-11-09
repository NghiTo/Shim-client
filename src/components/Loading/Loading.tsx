const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 mb-4 animate-spin"></div>
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
