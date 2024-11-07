import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorFallback = () => {
  const error = useRouteError();

  const errorMessage = isRouteErrorResponse(error)
    ? error.statusText
    : (error as Error).message || "An unknown error occurred";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700 mb-2">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-gray-500 italic mb-6">
          <i>{errorMessage}</i>
        </p>
        <Link
          to="/"
          className="inline-block bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorFallback;
