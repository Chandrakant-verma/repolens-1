import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../layout/AuthLayout";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import useAuth from "../../hooks/useAuth";
import { loginSchema } from "../../validations/auth.validation";

const Login = () => {
  const navigate = useNavigate();

  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <p className="mb-6 text-center font-mono text-xs text-[var(--text-muted)]">~/auth/login</p>

        <h2 className="font-display text-2xl font-semibold">Welcome Back</h2>
        <p className="mb-8 mt-1.5 text-sm text-[var(--text-muted)]">Sign in to continue.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            register={register("email")}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••"
            register={register("password")}
            error={errors.password}
          />

          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[var(--code)] hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
};

export default Login;