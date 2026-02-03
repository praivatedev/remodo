"use client"
import { useRef, useState } from "react";

export default function UserForm() {
  const [name, setName] = useState("")
  const [description, setDescrption] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showMessage = (type: "success" | "error", text: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (type === "success") {
      setError("")
      setSuccess(text)
    } else {
      setSuccess("")
      setError(text)
    }

    timeoutRef.current = setTimeout(() => {
      setError("")
      setSuccess("")
    }, 3000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description
        }),
      })

      const data = await res.json()
      console.log(data)

      if (!res.ok) {
        showMessage("error", data.error,)
        return
      }

      showMessage("success", data.sucess)
    } catch (error) {
      showMessage("error", "Failed to add user")
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#f6f5f7]"
style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%233b3a3d' fill-opacity='0.25' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "repeat",
    backgroundSize: "80px 80px",
  }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-90 w-fit bg-gray-50 justify-center items-center px-6">
        <p className={success ? "text-md font-semibold text-green-400" : "text-md font-semibold text-red-400"}>{success || error}</p>
        <h1 className="text-2xl font-semibold ">Enter the movie details </h1>
        <input
          type="text"
          placeholder="Enter the movie name"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
          className="border border-black px-6 py-2 rounded-xl"
        />

        <input
          type="text"
          placeholder="Enter the movie descrption"
          value={description}
          onChange={(e) => { setDescrption(e.target.value) }}
          className="border border-black px-6 py-2 rounded-xl"
        />

        <button
          type="submit"
          className="bg-green-500 px-6 py-2 rounded-lg cursor-pointer"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
}
