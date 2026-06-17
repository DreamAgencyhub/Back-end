import User from "../modules/user/user.model.js";
import users from "../dev-data/user.json" with { type: "json" };
import { connectDB } from "../config/database.js";

const seedUser = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    await User.create(users);

    console.log("Users imported successfully");
  } catch (err) {
    console.err(err);
  }

  process.exit();
};

seedUser();
