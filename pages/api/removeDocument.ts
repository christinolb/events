import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

//solves response bug
export const config = {
    api: {
      externalResolver: true,
    },
}
  
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //title selected
    const { selection } = req.body;

    Remove_Document(selection).catch(console.dir);

    async function Remove_Document(selection: string){
        try {
            //connect to DB
            await client.connect();
        
            //select db
            const myDB = client.db("web_content_test");

            //select cluster
            const myColl = myDB.collection("events");
            
            //delete doc 
            const doc = [
                {
                    title: selection
                },
            ];
            
            await myColl.deleteOne(doc)

            return res.status(201).json({response : "Event removed successfully."})

            } catch (error) {
                
                return res.status(500).json({response: "Failed to remove event."})

            } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
            }
    }

}