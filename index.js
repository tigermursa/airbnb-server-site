const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// Middleware
app.use(cors());
app.use(express.json());

// MONGODB CODE
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1nqrclq.mongodb.net/?retryWrites=true&w=majority`;

async function run() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const placesCollection = client.db("placesDB").collection("placesCollection");

  app.get("/data", async (req, res) => {
    const cursor = placesCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  });

  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Connected to MongoDB!");
}

run();

app.get("/", (req, res) => {
  res.send("server running Alhamdulillah!");
});

// Starting the server
app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
