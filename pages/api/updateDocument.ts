//UPDATE API
//
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

  //storing sent data
  const {
    eventTitle,
    eventLocation,
    eventDate,
    eventTimeStart,
    eventTimeEnd,
    eventDescription, 
    id
} = req.body;

    //adding data to db
    update_document(eventTitle, eventDate, eventLocation, eventTimeStart, eventTimeEnd, eventDescription, id).catch(console.dir);    

    //function which takes in from client and send data from client to db
    async function update_document(title: string, date: string, location: string, startTime: string, endTime: string, description: string, id: string) {
        try {
          //connect to DB
          await client.connect();
      
          //select db
          const myDB = client.db("web_content_test");

          //select cluster
          const myColl = myDB.collection("events");
          
          const filter = { title : id }; //try ObjectId(id)
          const updateDoc = {
            $set: {
               title: {title}.title,
               location: {location}.location,
               date: {date}.date,
               startTime: {startTime}.startTime,
               endTime: {endTime}.endTime,
               description: {description}.description
            },
          };
  
          await myColl.updateOne(filter, updateDoc);

          return res.status(200).json({msg: "Event successfully updated!"})
  
          } catch (error) {
            
            return res.status(500).json({msg: "Failed to update event."})

          } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
          }
      }

}