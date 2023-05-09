// mongodb.js

import { MongoClient } from "mongodb";

const uri = "mongodb+srv://carpasguajardo:carpasguajardo2023@clustercarpasguajardo.ox4p5wc.mongodb.net/carpas-guajardo-db?retryWrites=true&w=majority";
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true
};

let client;
let clientPromise;

if (!uri) {
	throw new Error("Add Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}

	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;
