"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { login, getMe } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisiblity = () =>
    setPasswordShown((cur) => !cur);

  useEffect(() => {
    getMe().then((user) => {
      if (user) {
        router.replace("/");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const success = await login(email, password);

      if (success) {
        router.push("/");
      } else {
        setError("Email or password incorrect");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>

        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Your Email
            </Typography>

            <Input
              type="email"
              size="lg"
              placeholder="yourname@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              labelProps={{ className: "hidden" }}
              containerProps={{ className: "min-w-full" }}
              className="!border !border-gray-300 focus:!border-gray-900"
            />
          </div>

          <div className="mb-6">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Password
            </Typography>

            <Input
              type={passwordShown ? "text" : "password"}
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              labelProps={{ className: "hidden" }}
              containerProps={{ className: "min-w-full" }}
              className="!border !border-gray-300 focus:!border-gray-900"
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5 text-red-900" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />

          </div>

          {error && (
            <Typography color="red" className="mb-4 text-sm">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>

          <Button
            type="button"
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src="https://www.material-tailwind.com/logos/logo-google.png"
              alt="google"
              className="h-6 w-6"
            />
            sign in with google
          </Button>
        </form>
      </div>
    </section>
  );
}
