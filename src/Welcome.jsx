function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-700 mb-4 drop-shadow-md">
        👋 Welcome to KiwiCare, Champ!
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
        You’ve just entered a platform built to connect users with amazing volunteers. Let’s make help more human.
      </p>
    </div>
  );
}

export default Welcome;
