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



export default async function GetTitles(req: NextApiRequest, res: NextApiResponse) { 
    getTitles().catch(console.dir);

    //function which takes in and send data from client to db
    async function getTitles(){
        try {
          //connect to DB
          await client.connect();
      
          //select db
          const myDB = client.db("web_content_test");

          //select cluster
          const myColl = myDB.collection("events");
          
          //query and running function
          const query = { id: 1 }; 
          const result = await myColl.find(query).toArray(function(err, docs) { });

          // send titles to availableDocQuery
          return res.status(200).json({response: result})

        } catch (error) {
            res.status(500)
      
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
      }
      

}