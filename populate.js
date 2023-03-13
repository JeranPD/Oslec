import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import AddCustomer from "./models/AddCustomer.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await AddCustomer.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./MOCK_DATA.json", import.meta.url))
    );
    await AddCustomer.create(jsonProducts);
    console.log("Added Products");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
