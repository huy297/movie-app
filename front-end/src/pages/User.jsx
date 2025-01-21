

const UserPage = () => {
  const avatar = 'https://via.placeholder.com/150'; // URL ảnh đại diện
  const favoristMovies = [
    { id: 1, title: 'Inception', img: 'https://via.placeholder.com/300x150' },
    { id: 2, title: 'Interstellar', img: 'https://via.placeholder.com/300x150' },
    { id: 3, title: 'The Dark Knight', img: 'https://via.placeholder.com/300x150' },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Thanh avatar */}
      <div className="flex items-center space-x-4 p-4 bg-gray-800">
        <img
          src={avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-600"
        />
        <h1 className="text-lg font-semibold">Hello, User!</h1>
      </div>

      {/* Danh sách phim yêu thích */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Favorist List</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favoristMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={movie.img}
                alt={movie.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
