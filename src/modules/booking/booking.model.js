import { model, models, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    consultant: {
      type: Schema.Types.ObjectId,
      ref: "Consultant",
      required: true,
      index: true,
    },
    appointmentSlot: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      index: true,
    },
    pricePaid: {
      type: Number,
      required: [true, "Actual price paid must be recorded"],
      min: [0, "Price cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "done"],
      default: "pending",
    },
  },
  { timestamps: true },
);

bookingSchema.index(
  { appointmentSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $ne: "cancelled" } },
  },
);

const Booking = models.Booking || model("Booking", bookingSchema);

export default Booking;
