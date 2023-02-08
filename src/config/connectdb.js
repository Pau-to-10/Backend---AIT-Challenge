import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGODB);
  console.log("Connect DB ok 👌");
} catch (error) {
  console.log("Error connection to mongodb:" + error);
}
