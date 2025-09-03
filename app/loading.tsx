export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Loading TreeBio...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we set up your experience
        </p>
      </div>
    </div>
  );
}
