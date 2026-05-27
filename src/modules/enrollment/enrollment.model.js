import { model, models, Schema } from "mongoose";

const enrollmentSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = models.Enrollment || model("Enrollment", enrollmentSchema);

export default Enrollment;
