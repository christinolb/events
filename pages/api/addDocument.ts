//ADD DOCUMENT API
//RETRIEVES DATA FROM CLIENT AND STORES IN DATABASE
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
    isPast
} = req.body;

    //adding data to db
    Add_Document(eventTitle, eventDate, eventLocation, eventTimeStart, eventTimeEnd, eventDescription).catch(console.dir);    

    //function which takes in from client and send data from client to db
    async function Add_Document(title: string, date: string, location: string, startTime: string, endTime: string, description: string) {
        try {
          //connect to DB
          await client.connect();
      
          //select db
          const myDB = client.db("web_content_test");

          //select cluster
          const myColl = myDB.collection("events");
          
          //create obj
          const docs = [
            {
               past: isPast,
               title: {title}.title,
               location: {location}.location,
               date: {date}.date,
               startTime: {startTime}.startTime,
               endTime: {endTime}.endTime,
               description: {description}.description
            },
          ];
          //insertion of data
          await myColl.insertMany(docs);  

          return res.status(201).json({response : "Event posted successfully."})
  
          } catch (error) {
            
            return res.status(500).json({response: "Failed to post event."})

          } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
          }
      }

}