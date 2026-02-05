import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File

    if(!file)
        return NextResponse.json({error: "No file uploaded!!"});

    if(!file.type.startsWith("image/"))
        return NextResponse.json({error: "Only images allowed!!"});

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes)

    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`

    try{
        const result = await cloudinary.uploader.upload(base64File, {
            folder: "movies"
        });

        return NextResponse.json({imageUrl: result.secure_url})
    } catch(error){
        return NextResponse.json({error: "Unable to upload image!!"}, { status: 500 })
    }
}