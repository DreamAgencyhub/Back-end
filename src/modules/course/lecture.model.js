import { model, models, Schema } from "mongoose";

const lectureSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Lecture must have a title"],
      trim: true,
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: [0, "Duration cannot be negative"],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

lectureSchema.index({ chapter: 1, order: 1 }, { unique: true });

const Lecture = models.Lecture || model("Lecture", lectureSchema);

export default Lecture;
