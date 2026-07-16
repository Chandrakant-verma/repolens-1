import fs from "fs";
import path from "path";

import ai from "../../config/gemini.js";

import Repository from "../repository/repository.model.js";

class AIService {
  readRepository(folderPath) {
    let context = "";

    console.log("Reading:", folderPath);
    console.log("Exists:", fs.existsSync(folderPath));

    if (!fs.existsSync(folderPath)) {
      throw new Error("Repository folder not found.");
    }

    const allowedExtensions = [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
      ".md",
    ];

    const ignoredFolders = [
      ".git",
      "node_modules",
      "dist",
      "build",
      ".next",
      "coverage",
    ];

    const traverse = (currentPath) => {
      const files = fs.readdirSync(currentPath);

      for (const file of files) {
        const filePath = path.join(currentPath, file);

        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          if (ignoredFolders.includes(file)) continue;

          traverse(filePath);
        } else {
          const ext = path.extname(file);

          if (!allowedExtensions.includes(ext)) continue;

          try {
            const content = fs.readFileSync(filePath, "utf8");

            context += `\n\nFILE: ${filePath}\n`;
            context += content;

            if (context.length > 300000) return;
          } catch (err) {
            console.log("Could not read:", filePath);
          }
        }
      }
    };

    traverse(folderPath);

    return context;
  }

  async askQuestion(repositoryId, question) {
    const repository = await Repository.findById(repositoryId);

    if (!repository) {
      throw new Error("Repository not found");
    }

    // Build repository path dynamically
    const repositoryPath = path.join(
      process.cwd(),
      "repositories",
      repository.folderName
    );

    console.log("Repository ID:", repository._id);
    console.log("Repository Folder:", repository.folderName);
    console.log("Repository Path:", repositoryPath);
    console.log("Exists:", fs.existsSync(repositoryPath));

    const context = this.readRepository(repositoryPath);

    const prompt = `
You are an expert software engineer.

Below is the source code of a GitHub repository.

Answer ONLY using the repository.

If the answer is not present,
say "I couldn't find that in the repository."

Repository:

${context}

Question:

${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  }
}

export default new AIService();