import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import AddSupplier from "./models/Supplier.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await AddSupplier.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./SupplierMockData.json", import.meta.url))
    );
    await AddSupplier.create(jsonProducts);
    console.log("Added Products");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
