"use client"
import { useRef, useState } from "react";

export default function UserForm() {
  const [name, setName] = useState("")
  const [descrption, setdescrption] = useState("")
  const [sucess, setSucess] = useState("")
  const [error, setError] = useState("")
  const timeoutRef= useRef<NodeJS.Timeout | null >(null)

  const showMessage = (type: "success" | "error", text: string ) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (type === "success"){
      setError("")
      setSucess(text)
    } else {
      setSucess("")
      setError(text)
    }

    timeoutRef.current = setTimeout(()=>{
      setError("")
      setSucess("")
    }, 3000)
  }

  async function handleSubmit (e:React.FormEvent) {
    e.preventDefault()

    try{
      const res = await fetch("/api/movies",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,
          descrption
        }),
      })
      
      const data = await res.json()
      console.log(data)

      if(!res.ok){
        showMessage("error", data.error, )
        return
      }

      showMessage("success", data.result)
    } catch (error) {
      showMessage("error", "Failed to add user")
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <p className="text-md font-semibold">{sucess || error}</p>
      <h1>Enter the movie details </h1>
      <input 
      type="text"
      placeholder="Enter the movie name"
      value={name}
      onChange={(e)=>{setName(e.target.value)}}
       />

       <input 
      type="text"
      placeholder="Enter the movie descrption"
      value={descrption}
      onChange={(e)=>{setName(e.target.value)}}
       />

       <button
       type="submit"
       > Add Movie </button>
    </form>
  );
}
