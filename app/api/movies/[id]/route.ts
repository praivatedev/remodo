import clientPromise from "@/lib/mongo/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export default async function DELETE (req: Request,
    {params} : {params: {id : string}}
) {

    try {
        const client = await clientPromise;
        const db = client.db("remodo");

        await db.collection("movies").deleteOne({
            _id: new ObjectId(params.id)
        });

        return NextResponse.json({ sucess: "Movie deleted sucessfully"})
    } catch (error) {
        console.error("Something went wrong!!")
        return NextResponse.json(
            { error: "Something went wrong!!"},
            {status: 500})
    }

}