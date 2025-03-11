import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  task: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", taskSchema);
