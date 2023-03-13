import mongoose from "mongoose";

const AddSupplierSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Please provide Company Name"],
    },
    name: {
      type: String,
      required: [true, "Please provide Name"],
      trim: true,
    },
    Address: {
      type: String,
      required: [true, "Please provide Address"],
    },
    contact: {
      type: String,
      required: [true, "Please provide Contact Number"],
    },
    email: {
      type: String,
      required: [true, "Please provide Email"],
    },
    productOrder: {
      type: String,
      required: [true, "Please provide Product Order"],
    },
    productStatus: {
      type: String,
      enum: ["not yet recieve", "recieved"],
      default: "pending",
    },
    quantity: {
      type: String,
      required: [true, "Please provide Quantity"],
    },
    pricedPerUnit: {
      type: Number,
      required: [true, "Please provide Price Per Unit"],
    },
    priced: {
      type: Number,
    },
    receivedAt: {
        type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please provide Admin"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", AddSupplierSchema);
