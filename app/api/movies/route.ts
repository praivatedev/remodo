import { getMoviesCollection } from "@/models/route";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try{
        const body = await req.json()
        console.log(body)

        const {name , description} = body

        if (!name || !description){
            return NextResponse.json(
                {error: "All fields are required!!"},
                {status: 400}
            )
        }

        const movies = await getMoviesCollection()

        const result = await movies.insertOne({
            ...body,
                createdAt: new Date            
        })

        return NextResponse.json(result, {status: 201})
    } catch(error) {
        return NextResponse.json(
           {error: "Someting went wrong!!"},
           {status: 500}
        )
    }
}

export async function GET () {
    try{
        const movies = await getMoviesCollection()

        const data = await movies.find().toArray()

        return NextResponse.json(data,{status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error: "Somethig went wrong!!"},
            {status: 500}
        )
    }
}