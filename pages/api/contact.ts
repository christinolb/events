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

    const {
        eventTitle,
        eventDate,
        eventLocation,
        eventTimeStart,
        eventTimeEnd,
        eventDescription
    } = req.body;

    async function Add_Document(title, location, date, startTime, endTime, description) {
        try {
          //connect to DB
          await client.connect();
      
      
          const myDB = client.db("web_content_test");
          const myColl = myDB.collection("events");
      
          const docs = [
            {
               title: {title},
               location: {location},
               date: {date},
               startTime: {startTime},
               endTime: {endTime},
               description: {description}
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