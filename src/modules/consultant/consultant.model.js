import mongoose from "mongoose";

const consultantSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },

    avatar: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    importantMessageForClient: {
      type: String,
      required: true,
    },

    introductionVideoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

consultantSchema.index({ fullName: 1 }, { unique: true });

const Consultant =
  mongoose.models.Consultant || mongoose.model("Consultant", consultantSchema);
export default Consultant;
