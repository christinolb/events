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

    //retrieval of data from clientside
    const {
        selection
    } = req.body;

    Query_Document(selection).catch(console.dir);

    //function which takes in and send data from client to db
    async function Query_Document(selection: string){
        try {
          //connect to DB
          await client.connect();
      
          //select db
          const myDB = client.db("web_content_test");

          //select cluster
          const myColl = myDB.collection("events_opp_test");
          
          //query and running function
          const query = { title: selection }; 
          const result = await myColl.find(query).toArray({ });
          
          //return query selection
          return res.status(200).json({response: result, msg: "Loading ..."})

        } catch (error){
          return res.status(500).json({msg: "Error loading event."})
      
          } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
          }
      }
}