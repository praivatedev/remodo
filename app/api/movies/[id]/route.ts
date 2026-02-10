import clientPromise from "@/lib/mongo/db";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE (req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const {id} = await params
    
    try {
        const client = await clientPromise;
        const db = client.db("remodo");

        const result = await db.collection("movies").deleteOne({
            _id: new ObjectId(id)
        });

        if(result.deletedCount === 0){
            return NextResponse.json(
                { error: "Movie not found" },
                { status: 404 }
            )
        };

        return NextResponse.json({ success: "Movie deleted sucessfully"})
    } catch (error) {
        console.error("Something went wrong!!")
        return NextResponse.json(
            { error: "Something went wrong!!"},
            {status: 500})
    }

}