import Logo from "../components/ui/Logo";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--ink)] px-4 py-16">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_20%,rgba(110,231,183,0.08),transparent_35%),radial-gradient(circle_at_85%_75%,rgba(167,139,250,0.10),transparent_40%)]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;