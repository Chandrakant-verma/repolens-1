import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// import AuthLayout from "../../components/layout/AuthLayout";
import AuthLayout from "../../layout/AuthLayout";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import useAuth from "../../hooks/useAuth";
import { registerSchema } from "../../validations/auth.validation";

const Register = () => {
  const navigate = useNavigate();

  const { register: registerUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;

      await registerUser(data);

      toast.success("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <p className="mb-6 text-center font-mono text-xs text-[var(--text-muted)]">~/auth/register</p>

        <h2 className="font-display text-2xl font-semibold">Create Account</h2>
        <p className="mb-8 mt-1.5 text-sm text-[var(--text-muted)]">Start analyzing repositories.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            placeholder="John Doe"
            register={register("name")}
            error={errors.name}
          />

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

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--code)] hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
};

export default Register;