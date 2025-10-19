"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle, IconEye, IconEyeOff } from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseclient"; // Import your Supabase client
import { AvatarCircles } from "./ui/avatar-circles";

export default function SignupFormDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setPasswordMatchError("");
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setPasswordMatchError("Passwords do not match");
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setErrorMsg(errorMessage);
      console.error("Auth error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      // The user will be redirected by Supabase after sign-in
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-neutral-50 p-4 md:rounded-2xl md:p-8 dark:bg-black">
      {isSignUp && (
        <div>
          <AvatarCircles className="flex justify-center mb-6 mt-4"
            numPeople={99} 
            avatarUrls={[
              {
                imageUrl: "https://i.pravatar.cc/150?img=32",
                profileUrl: "#",
              },
              {
                imageUrl: "https://i.pravatar.cc/150?img=12",
                profileUrl: "#",
              },
              {
                imageUrl: "https://i.pravatar.cc/150?img=47",
                profileUrl: "#",
              },
              {
                imageUrl: "https://i.pravatar.cc/150?img=3",
                profileUrl: "#",
              },
              { 
                imageUrl: "https://i.pravatar.cc/150?img=5",
                profileUrl: "#",
              },
              {
                imageUrl: "https://i.pravatar.cc/150?img=8",
                profileUrl: "#",
              }
            ]}
          />
        </div> 
      )} 

      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Asshelp
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        catch deadlines, not feelings. Sign up to get started
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-all duration-300 focus:outline-none group"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <div className="relative w-5 h-5">
                <IconEye 
                  className={`absolute inset-0 h-5 w-5 transform transition-all duration-500 ease-out group-hover:scale-110 ${
                    showPassword 
                      ? 'opacity-0 rotate-180 scale-50' 
                      : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <IconEyeOff 
                  className={`absolute inset-0 h-5 w-5 transform transition-all duration-500 ease-out group-hover:scale-110 ${
                    showPassword 
                      ? 'opacity-100 rotate-0 scale-100' 
                      : 'opacity-0 -rotate-180 scale-50'
                  }`}
                />
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 dark:from-cyan-500/20 dark:to-blue-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg scale-150"></span>
              </div>
            </button>
          </div>
        </LabelInputContainer>
        {isSignUp && (
       
          <LabelInputContainer className="mb-4">
            
            <Label htmlFor="confirmpassword">Confirm password</Label>
            <Input
              id="confirmpassword"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                // Check password match in real-time
                if (e.target.value && password && e.target.value !== password) {
                  setPasswordMatchError("Passwords do not match");
                } else {
                  setPasswordMatchError("");
                }
              }}
              onBlur={() => {
                // Check on blur as well
                if (confirmPassword && password && confirmPassword !== password) {
                  setPasswordMatchError("Passwords do not match");
                }
              }}
              required
              className={passwordMatchError ? "border-red-500 focus:border-red-500" : ""}
            />
            {passwordMatchError && (
              <p className="text-xs text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
                {passwordMatchError}
              </p>
            )}
          </LabelInputContainer>
        )}
        {errorMsg && (
          <div className="mb-4 text-sm text-red-500">{errorMsg}</div>
        )}
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] mb-4"
          type="submit"
        >
          {isSignUp ? "Sign up →" : "Sign in →"}
          <BottomGradient />
        </button>
        <button
          className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
          type="button"
          onClick={handleGoogleSignIn}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            Google
          </span>
          <BottomGradient />
        </button>
        <div className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-300">
          {isSignUp ? (
            <>Already a user?{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={() => setIsSignUp(false)}
              >
                Sign in
              </button>
            </>
          ) : (
            <>New user?{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};