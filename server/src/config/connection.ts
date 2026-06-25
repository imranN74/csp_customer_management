import mongoose from "mongoose";

export function DbConnection(uri: string) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB sucessfully connected");
    })
    .catch((error) => {
      console.log("DB connection failed");
    });
}
