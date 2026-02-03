import clientPromise from "@/lib/mongo/db"

export async function getMoviesCollection() {
    const client = await clientPromise
    console.log("Mongo URI:", process.env.MONGO_URI)

    const db = client.db("remodo")
    return db.collection("movies")
}
