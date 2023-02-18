import mongoose, { Schema } from "mongoose";
const AccountTransactionSchema = mongoose.Schema({
  account_id: { type: Schema.Types.ObjectId, ref: "Account" },
  transaction_type: { type: String },
  amount: { type: Number },
  transaction_date: { type: String },
});
const AccountTransaction = mongoose.model(
  "Account_transaction",
  AccountTransactionSchema
);
export default AccountTransaction;
