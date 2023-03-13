import mongoose from "mongoose";

import { nanoid } from 'nanoid';

const AddCustomerSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      default: () => nanoid(10),
      index: { unique: true },
      uppercase: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "Please provide first Name"],
      trim: true,
    },
    
    product: {
      type: String,
      required: [true, "Please provide Product"],
    },
    serialNumber: {
      type: String,
      required: [true, "Please provide Serial Number"],
    },
    brand: {
      type: String,
      required: [true, "Please provide Brand"],
    },
    diagnosis: {
      type: String,
    },
    replacedParts: {
      type: String,
    },
    fixingparts: {
      type: String,
      required: [true, "Please provide Fixing Parts"],
    },
    description: {
      type: String,
    },
    estimateStart: {
      type: String,
     
    },
    estimateEnd: {
      type: String,
     
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
    
    address: {
      type: String,
      required: [true, "Please provide Address"],
    },
    pickUp: {
      type: String,
      enum: ["Pick Up", "Delivery", "Pick Up and Delivery"],
    },
    price: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    warrantyStartAt: {
      type: String,
    },
    warrantyEndAt: {
      type: String,
    },
    replacedPartsPrice:{
      type: Number,
    },
    serviceFee:{
      type: Number,
    },
    partsDelivery:{
      type: String,
    },
    WarrantyDays:{
      type: Number,
    },
    appliancesType:{
      type: String,
    },
    warranting:{
      type: String,
    },
    endOfWarranting:{
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

export default mongoose.model("Customer", AddCustomerSchema);
