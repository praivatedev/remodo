import clientPromise from "@/lib/mongo/route"

export async function getMoviesCollection() {
    const client = await clientPromise

    const db = client.db("remodo")
    return db.collection("movies")
}
