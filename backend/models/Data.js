const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataSchema = new Schema(
  {
    category: { type: String, required: true }, // String is shorthand for {type: String}
    keyPoints: String,
    image: String,
    content: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
