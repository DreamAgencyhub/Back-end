import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course must have a title"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    subTitle: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    accessWay: {
      type: String,
      required: true,
      enum: ["spotplayer", "streaming", "download"],
    },
    supportVia: [
      {
        type: String,
        enum: ["telegram", "website", "whatsapp"],
      },
    ],
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot be more than 100%"],
      default: 0,
    },

    finalPrice: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      min: [1, "Duration is too short"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultant",
      required: true,
      index: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// courseSchema.virtual("finalPrice").get(function () {
//   return this.price * (1 - this.discount / 100);
// });

courseSchema.pre("save", function (next) {
  if (this.isModified("price") || this.isModified("discount")) {
    this.finalPrice = this.price * (1 - this.discount / 100);
  }
});

courseSchema.pre("save", function (next) {
  this.slug = this.title.split(" ").join("-").toLowerCase();
});

courseSchema.index({ slug: 1 });

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
