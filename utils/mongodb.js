const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://njama:grfKjfszXh7na36O@cluster0.bfolkxt.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
async function run() {
  try {
    await client.connect();
    db = client.db("PetAdoptionBackend", { ping: 1 });

    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error", error);
  }
}
module.exports = {
  run,
  users: () => {
    return db.collection("users");
  },
  // books: () => {
  //   return db.collection("books");
  // },
};
