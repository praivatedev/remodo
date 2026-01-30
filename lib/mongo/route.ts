import { error } from "console"
import {MongoClient, ServerApiVersion} from "mongodb"
import { version } from "os"

const uri = process.env.MONGO_URI

if(!uri) throw new Error("Mongo url is not provided!!")

let options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
    var _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV === "development") {
    if(!global._mongoClientPromise){
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
}
}
clientPromise = global._mongoClientPromise;

export default clientPromise