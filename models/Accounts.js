import mongoose, { Schema } from "mongoose";
const AccountSchema = mongoose.Schema({
  account_no: { type: String },
  account_name: { type: Number },
  created_date: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});
const Account = mongoose.model("Account", AccountSchema);
export default Account;
