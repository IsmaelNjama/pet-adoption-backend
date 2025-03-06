const { MongoClient, ServerApiVersion } = require("mongodb");

// Initialize connection variables
let client;
let db;

async function run() {
  try {
    // Get the MongoDB URI from environment variable
    const secretString = process.env.MONGO_URI;

    // Debug logging (without exposing sensitive data)
    console.log("MongoDB connection attempt starting...");
    console.log("URI exists:", !!secretString);

    // Parse the URI if it's in JSON format
    let uri;
    try {
      const parsed = JSON.parse(secretString);
      uri = parsed.MONGO_URI;
    } catch (e) {
      // If parsing fails, use the string directly
      uri = secretString;
    }

    // Validate URI
    if (!uri) {
      throw new Error("MongoDB URI is undefined or empty");
    }

    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
      throw new Error("Invalid MongoDB URI format");
    }

    // Create MongoClient
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      // Options for better reliability
      connectTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 50,
      retryWrites: true,
    });

    // Connect to MongoDB
    await client.connect();

    // Initialize database
    db = client.db("PetAdoptionBackend");

    // Verify connection with a ping
    await db.command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    // Set up connection error handler
    client.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    });

    // Handle application shutdown gracefully
    process.on("SIGINT", async () => {
      await closeConnection();
      process.exit(0);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    throw error;
  }
}

async function closeConnection() {
  if (client) {
    try {
      await client.close();
      console.log("MongoDB connection closed.");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
    }
  }
}

// Ensure collections exist before returning them
const getCollection = (collectionName) => {
  if (!db) {
    throw new Error("Database connection not established. Call run() first.");
  }
  return db.collection(collectionName);
};

module.exports = {
  run,
  users: () => getCollection("users"),
  pets: () => getCollection("pets"),
  closeConnection,
};

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = process.env.MONGO_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// let db;
// async function run() {
//   try {
//     await client.connect();
//     db = client.db("PetAdoptionBackend", { ping: 1 });

//     console.log("Successfully connected to MongoDB!");
//   } catch (error) {
//     console.error("Error", error);
//   }
// }
// module.exports = {
//   run,
//   users: () => {
//     return db.collection("users");
//   },
//   pets: () => {
//     return db.collection("pets");
//   },
// };
