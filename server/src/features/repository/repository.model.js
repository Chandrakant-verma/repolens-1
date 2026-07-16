import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    githubUrl: {
      type: String,
      required: true,
    },

    folderName: {
      type: String,
      required: true,
    },

    totalFiles: {
      type: Number,
      default: 0,
    },

    totalFolders: {
      type: Number,
      default: 0,
    },

    languages: {
      type: [String],
      default: [],
    },
    repositoryPath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Ensure a user can only ever have ONE stored entry per unique repo URL.
// Re-analyzing the same URL updates this same document instead of
// creating a duplicate row.
repositorySchema.index({ user: 1, githubUrl: 1 }, { unique: true });

const Repository = mongoose.model("Repository", repositorySchema); 

export default Repository;