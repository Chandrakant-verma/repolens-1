import simpleGit from "simple-git";
import fs from "fs";
import path from "path";
import Repository from "./repository.model.js";

class RepositoryService {
  /**
   * Normalize a GitHub URL so the same repo can't be stored twice
   * under slightly different strings (trailing slash, .git, casing of host, etc).
   */
  normalizeUrl(githubUrl) {
    return githubUrl.trim().replace(/\/+$/, "").replace(/\.git$/i, "");
  }

  /**
   * Clones the given repo into a fresh folder and walks it to compute
   * live stats. This is the "analysis" step - it always talks to GitHub
   * fresh, it never reads cached/previous results.
   */
  async analyze(githubUrl) {
    const folderName = `repo_${Date.now()}`;
    const destination = path.join(process.cwd(), "repositories", folderName);

    await simpleGit().clone(githubUrl, destination);

    let totalFiles = 0;
    let totalFolders = 0;
    const languageSet = new Set();

    const ignoredFolders = [
      ".git",
      "node_modules",
      "dist",
      "build",
      "coverage",
      ".next",
    ];

    const traverse = (currentPath) => {
      const items = fs.readdirSync(currentPath);

      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          if (ignoredFolders.includes(item)) continue;

          totalFolders++;
          traverse(itemPath);
        } else {
          totalFiles++;

          const ext = path.extname(item);
          if (ext) languageSet.add(ext);
        }
      }
    };

    traverse(destination);

    return {
      folderName,
      totalFiles,
      totalFolders,
      languages: [...languageSet],
      repositoryPath: folderName,
    };
  }

  /**
   * Removes a previously cloned folder from disk so old clones don't
   * pile up every time a repo gets re-analyzed.
   */
  removeFolder(folderName) {
    if (!folderName) return;

    const folderPath = path.join(process.cwd(), "repositories", folderName);

    try {
      if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
      }
    } catch (err) {
      console.log("Could not remove old repository folder:", folderName, err);
    }
  }

  /**
   * Stores/refreshes a single unique URL for a user and returns the
   * up-to-date document. If the user has already analyzed this URL
   * before, the EXISTING record is updated in place (no duplicate row) -
   * whatever was cloned previously on disk is discarded and replaced
   * with a brand new clone/scan.
   */
  async cloneRepository(githubUrl, userId) {
    const normalizedUrl = this.normalizeUrl(githubUrl);

    const existing = await Repository.findOne({
      user: userId,
      githubUrl: normalizedUrl,
    });

    const analysis = await this.analyze(normalizedUrl);

    if (existing) {
      this.removeFolder(existing.folderName);

      existing.folderName = analysis.folderName;
      existing.totalFiles = analysis.totalFiles;
      existing.totalFolders = analysis.totalFolders;
      existing.languages = analysis.languages;
      existing.repositoryPath = analysis.repositoryPath;

      await existing.save();

      return existing;
    }

    const repository = await Repository.create({
      user: userId,
      githubUrl: normalizedUrl,
      ...analysis,
    });

    return repository;
  }

  /**
   * Returns the user's unique repository URLs, each refreshed with a
   * fresh analysis (fresh clone + fresh scan) rather than whatever stats
   * were computed the last time. Used on dashboard load / after login,
   * so the user always sees the current state of their repos, not stale
   * data from a previous analysis.
   */
  async getRepositories(userId) {
    const repositories = await Repository.find({ user: userId });

    const refreshed = await Promise.all(
      repositories.map(async (repository) => {
        try {
          const analysis = await this.analyze(repository.githubUrl);

          this.removeFolder(repository.folderName);

          repository.folderName = analysis.folderName;
          repository.totalFiles = analysis.totalFiles;
          repository.totalFolders = analysis.totalFolders;
          repository.languages = analysis.languages;
          repository.repositoryPath = analysis.repositoryPath;

          await repository.save();

          return repository;
        } catch (err) {
          // If a fresh clone fails (repo deleted, offline, etc.) fall back
          // to whatever was last stored instead of breaking the dashboard.
          console.log("Fresh analysis failed for", repository.githubUrl, err.message);
          return repository;
        }
      })
    );

    return refreshed;
  }

  async getRepositoryById(id) {
    return await Repository.findById(id);
  }
}

export default new RepositoryService();