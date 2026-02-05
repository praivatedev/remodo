

export default async function MoviesList() {
  const res = await fetch("http://nextjs:3000/api/movies", {
    cache: "no-store"
  });
  const movies = await res.json()
  return (
    <div>
      <h1 className='font-semibold text-3xl'> MoviesList </h1>
      <div className="grid grid-cols-5 gap-4 ">
        {movies.map((m: any) => (
          <div className="bg-gray-200 w-50 h-40 px-4 py-4 rounded-lg"
            style={{
              backgroundImage: `url(${m.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="text-blue-300">{m.name}</p>
            <p className="text-red-300">{m.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}