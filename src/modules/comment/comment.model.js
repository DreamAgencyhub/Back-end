import { model, models, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    targetModel: {
      type: String,
      required: true,
      enum: ["Consultant", "Appointment", "Course"],
    },

    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "targetModel",
    },

    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true },
);

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
