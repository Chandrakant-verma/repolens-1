import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../../components/ui/Logo";
import Button from "../../components/common/Button";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--text)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={handleLogin}>
            Login
          </Button>
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_25%_10%,rgba(110,231,183,0.10),transparent_40%),radial-gradient(circle_at_75%_40%,rgba(167,139,250,0.12),transparent_45%)]" />

        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--code)]">
          // AI repository analysis
        </p>

        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Understand any repository, <span className="text-[var(--ai)]">instantly.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-[var(--text-muted)] sm:text-lg">
          RepoLens reads your GitHub repository, understands its structure, and answers your questions using AI.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button onClick={handleLogin}>Login</Button>
          <Link to="/register" className="btn-ghost">
            Create Account
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;