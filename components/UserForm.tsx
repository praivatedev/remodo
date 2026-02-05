"use client"
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserForm() {
  const [name, setName] = useState("")
  const [description, setDescrption] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

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

    if(!file){
      setError("Please upload an image!!");
       return
    };

     const formData = new FormData()
      formData.append("file", file)

    try {
      
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const uploadData = await uploadRes.json();

      const res = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          imageUrl: uploadData.imageUrl
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
    router.refresh();
  }
  return (
    <div className="flex justify-center items-center"
>
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

        <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
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
