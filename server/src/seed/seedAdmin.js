import mongoose from "mongoose";
import { env } from "../config/dotenv.js";
import userModel from "../user/model/user.schema.js";

const seedAdmin = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    const existing = await userModel.findOne({ email: "admin@example.com" });
    if (!existing) {
      await userModel.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "Admin@123",
        role: "admin",
      });
      console.log("Admin user seeded: admin@example.com / Admin@123");
    } else {
      existing.role = "admin";
      await existing.save();
      console.log("Admin user verified: admin@example.com");
    }
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();
