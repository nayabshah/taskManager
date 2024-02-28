import mongoose from "mongoose";

const tasksSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    DueDate: {
      type: Date,
    },
    AssignedTo: {
      type: String,
    },
    Priority: {
      type: String,
      enum: ["high", "medium", "low"],
    },
    Status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    CompletionDate: {
      type: Date,
    },
    AssignedTo: {
      type: String,
    },
    Tags: [
      {
        _id: false,
        id: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", tasksSchema);

export default Task;
