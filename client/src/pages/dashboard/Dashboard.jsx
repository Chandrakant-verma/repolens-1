import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import useRepository from "../../hooks/useRepository";
import Logo from "../../components/ui/Logo";
import Button from "../../components/common/Button";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [githubUrl, setGithubUrl] = useState("");
  const [repositories, setRepositories] = useState([]);

  const { cloneRepository, getRepositories } = useRepository();

  const loadRepositories = async () => {
    try {
      const response = await getRepositories();
      setRepositories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnalyze = async () => {
    if (!githubUrl.trim()) {
      return toast.error("Please enter GitHub URL");
    }

    try {
      toast.info("Analyzing Repository...");

      await cloneRepository(githubUrl);

      toast.success("Repository Analyzed Successfully");

      setGithubUrl("");

      loadRepositories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    loadRepositories();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--text)]">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-12">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--code)]">
            // new analysis
          </p>
          <h2 className="font-display mb-6 text-2xl font-semibold">Analyze a repository</h2>

          <div className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
            <span className="hidden font-mono text-[var(--code)] sm:block">›</span>
            <input
              type="text"
              placeholder="https://github.com/user/repository"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-[var(--text-muted)]/60"
            />
            <Button onClick={handleAnalyze} className="w-full sm:w-auto">
              Analyze
            </Button>
          </div>
        </section>

        <section>
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--ai)]">
            // repositories
          </p>
          <h3 className="font-display mb-6 text-2xl font-semibold">My repositories</h3>

          {repositories.length === 0 ? (
            <div className="card p-10 text-center text-[var(--text-muted)]">
              <p>No repositories found. Paste a GitHub URL above to get started.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {repositories.map((repo) => (
                <div key={repo._id} className="card flex flex-col gap-4 p-6">
                  <p className="break-all font-mono text-sm">{repo.githubUrl}</p>

                  <div className="flex gap-6 text-sm text-[var(--text-muted)]">
                    <span>
                      <strong className="text-[var(--text)]">{repo.totalFiles}</strong> files
                    </span>
                    <span>
                      <strong className="text-[var(--text)]">{repo.totalFolders}</strong> folders
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {repo.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 font-mono text-[11px] text-[var(--text-muted)]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>

                  <Button variant="ai" onClick={() => navigate(`/chat/${repo._id}`)} className="mt-auto">
                    Open AI Chat
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;