import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--ink)] px-6 text-center text-[var(--text)]">
      <p className="font-mono text-sm text-[var(--ai)]">error 404</p>
      <h1 className="font-display mt-3 text-6xl font-semibold">404</h1>
      <h2 className="mt-2 text-xl font-medium text-[var(--text-muted)]">Page Not Found</h2>
      <p className="mt-3 max-w-sm text-sm text-[var(--text-muted)]">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;