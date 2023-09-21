//QUERIES TITLES AND SHOWES TO USER

//need validation for title select get length of array!

import ContactFormEdit from "../components/ContactFormEdit"
import FormTypeButtons from "../components/FormType"

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://christinobarbosa09:jerrysiceparty77@cluster0.6zcmnen.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default function Edit() {
  //read data from database 
  async function readDocument() {
    try {
      await client.connect();
    
      const database = client.db('web_content_test');
      const collection = database.collection('events');
      
      //query and running function
      const query = { id: 1 }; 
      const result = await collection.find(query).toArray(function(err, docs) { });
  
      //looping and extracting the title from queried json object
      //storing in array
      var titles = []
      console.log(result);
      var count = 1
      for (const obj of result) {
          titles.push(` ${count}. ` + obj.title + ` `)
          console.log(obj.title, "added to array")
          count = count +1
      }

      //checking datatype of titles array and indexes
      console.log(typeof(titles))
      console.log(typeof(titles[0]))
  
    } finally {
      await client.close();
      //return the array
      return titles;
    }
  }
  //store array of titles 
  const eTitle = readDocument().catch(console.error);
  
  return (    
    <div className='p-4 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold'>Edit Event Form </h1>
      <p>Select Event Title to edit</p>
      
      <h1 className="p-4 m-4">{eTitle}</h1>

      {/**select document number */}
      <form>
        <label className="px-2" htmlFor="slctTitle">Select Title</label>
        <input type="number" id="slctTitle"/>
        <input className="bg-green-700 text-white font-bold" type="submit" value="Submit"/>
      </form>
      <ContactFormEdit />
      <FormTypeButtons />
    </div>
  )
}
