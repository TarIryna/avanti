import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDB = async () => {
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new connection...");

    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Avanti",
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected");
  } catch (e) {
    cached.promise = null;
    console.log("MongoDB error:", e);
    throw e;
  }

  return cached.conn;
};
