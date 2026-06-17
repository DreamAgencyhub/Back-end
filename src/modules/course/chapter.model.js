import { model, models, Schema } from "mongoose";

const chapterSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Chapter must have a title"],
      trim: true,
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

chapterSchema.index({ course: 1, order: 1 }, { unique: true });

chapterSchema.virtual("lectures", {
  ref: "Lecture",
  localField: "_id",
  foreignField: "chapter",
});

const Chapter = models.Chapter || model("Chapter", chapterSchema);

export default Chapter;
