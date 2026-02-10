"use client"
import { useRouter } from "next/navigation"
import { FaTrash } from "react-icons/fa";

type Props = {
    id: string;
    showMessage: (type: "success" | "error",text:string) => void;
}
export default function DeleteButton({ id, showMessage }: Props) {
    const router = useRouter();

    async function handleDelete() {
        const confirmDelete = confirm("Are you sure you want to delete this movie?")
        if (!confirmDelete) return

        showMessage("success","");
        showMessage("error","");

        try {
            const res = await fetch(`api/movies/${id}`, {
                method: "DELETE"
            });

            const data = await res.json()

            if (!res.ok) {
                showMessage("error",data.error)
                return;
            }

            showMessage("success", data.success)
        } catch (error) {
            showMessage("error","Something went wrong!!")
        }

        router.refresh();
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-400 px-3 py-1 rounded mt-2">
                 <FaTrash />
            </button>
    )

}