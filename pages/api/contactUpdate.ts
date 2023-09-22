//NEEDS CHANGES:  updates the document to accomodate changes 

import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://christinobarbosa09:jerrysiceparty77@cluster0.6zcmnen.mongodb.net/?retryWrites=true&w=majority';


const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(req.body)    

    //retrieval of data from clientside
    //variables must be in same order as stored in JSON
    const {
        eventTitle,
        eventLocation,
        eventDate,
        eventTimeStart,
        eventTimeEnd,
        eventDescription
    } = req.body;

    //function which takes in and send data from client to db
    async function Add_Document(title: string, date: string, location: string, startTime: string, endTime: string, description: string) {
        try {
          //connect to DB
          await client.connect();
      
          //select db
          const myDB = client.db("web_content_test");

          //select cluster
          const myColl = myDB.collection("events");
          
          //title chosen by user
          //const filter = {title: ""}
          const docs = [
            {
               id: 1,
               title: {title}.title,
               location: {location}.location,
               date: {date}.date,
               startTime: {startTime}.startTime,
               endTime: {endTime}.endTime,
               description: {description}.description
            },
          ];
      
          const insertManyresult = await myColl.insertMany(docs);
          let ids = insertManyresult.insertedIds;
      
          console.log(`${insertManyresult.insertedCount} documents were inserted.`);
      
          for (let id of Object.values(ids)) {
            console.log(`Inserted a document with id ${id}`);
          }
      
      
          } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
          }
      }
      Add_Document(eventTitle, eventDate, eventLocation, eventTimeStart, eventTimeEnd, eventDescription).catch(console.dir);

}