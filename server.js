import dotenv from "dotenv";
dotenv.config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION ERROR! 💥💥💥 shuting down...");
  console.log(err.name, err.message);

  process.exit(1);
});

import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥💥 Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
