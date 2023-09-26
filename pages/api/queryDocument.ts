//INCOMPLETE: Takes in title, makes query and returns the rest of the data

import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;


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
          const myColl = myDB.collection("events");
          
          //query and running function
          const query = { title: selection }; 
          const result = await myColl.find(query).toArray(function(err, docs) { });

          //return query selection
          return res.status(200).json({response: result})
      
          } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
          }
      }
      

}