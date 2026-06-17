import { model, models, Schema } from "mongoose";

const commonQASchema = new Schema(
  {
    question: {
      type: String,
      trim: true,
      required: [true, "Question is required"],
      maxlength: 300,
    },

    answer: {
      type: String,
      trim: true,
      required: [true, "Answer is required"],
      maxlength: 2000,
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

const CommonQA = models.CommonQA || model("CommonQA", commonQASchema);

export default CommonQA;
