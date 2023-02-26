import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connect_db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.log({ error: error.message });
  }
};
// const MONGO_URL = "mongodb://localhost/expense_app";
// mongoose
//   .connect(
//     "mongodb+srv://ilyasdev:ilyasdev@cluster0.qhbgepw.mongodb.net/?retryWrites=true&w=&dbname=expense_db",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`server is running at http://localhost:${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
export default connect_db;
