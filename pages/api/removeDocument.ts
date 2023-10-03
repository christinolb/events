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

export default async function handleRemove(req: NextApiRequest, res: NextApiResponse) {

    const { selection } = req.body;

    // run function here
    // what does .catch(console.dir) mean?
    removeDocument(selection).catch(console.dir)

    async function removeDocument(selection: string){
        try {
          //connect to DB
          await client.connect();
      
          //select db
          const myDB = client.db("web_content_test");

          //select cluster
          const myColl = myDB.collection("events_opp_test");
          
          //remove document
          const condition = {title: selection}

          await myColl.deleteOne(condition)
          
          
          //return status request
          return res.status(200).json({msg: "Event successfully removed!"})

        } catch(error){
          
          return res.status(500).json({msg: "Failed to remove event."})
      
          } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
          }
      }

    
}