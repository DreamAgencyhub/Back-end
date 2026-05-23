import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  startAt: {
    type: Date,
    required: true,
  },

  endAt: {
    type: Date,
    required: true,
  },

  type: {
    type: String,
    enum: ["online", "in-person"],
    required: true,
  },

  status: {
    type: String,
    enum: ["available", "booked", "cancelled"],
    default: "available",
    index: true,
  },

  consultant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consultant",
    required: true,
    index: true,
  },

  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

appointmentSchema.index({ consultant: 1, startAt: 1 }, { unique: true });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
