"use client"
import DeleteButton from "./DeleteButton";
import { useEffect, useState } from "react";

interface MoviesListProps {
  showMessage: (type: "success" | "error", text: string) => void
}

export default function MoviesList({ showMessage }: MoviesListProps) {

  const [movies, setMovies] = useState([])
  
  useEffect(() => {
    async function loadMovies () {       
    try{
      const res = await fetch("api/movies")
      const data = await res.json()
      setMovies(data)
     
    } catch {
      showMessage("error", "Unable to load movies!!")
    };
  };
     loadMovies();
  },[])
  return (
    <div>
      <h1 className='font-semibold text-3xl'> MoviesList </h1>
      <div className="grid grid-cols-5 gap-4">
        {movies.map((m: any) => (
          <div className="bg-gray-200 w-50 h-40 px-4 py-4 rounded-lg"
            style={{
              backgroundImage: `url(${m.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            key={m._id}
          >
            <DeleteButton
            id={m._id}
            showMessage={showMessage}
            />
            <p className="text-blue-300">{m.name}</p>
            <p className="text-red-300">{m.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}