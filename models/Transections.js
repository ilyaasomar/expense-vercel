import mongoose, { Schema } from "mongoose";
const TransectionSchema = mongoose.Schema({
  transection_type: { type: String },
  amount: { type: Number },
  registred_date: { type: String },
  description: { type: String },
  createdby: { type: Schema.Types.ObjectId, ref: "User" },
});
const Transection = mongoose.model("Transection", TransectionSchema);
export default Transection;
