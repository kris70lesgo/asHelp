"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseclient"; // Import your Supabase client
import { AvatarCircles } from "./ui/avatar-circles";
import { div } from "framer-motion/client";
import { Sign } from "crypto";

export default function SignupFormDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setErrorMsg("Passwords do not match");
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
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </LabelInputContainer>
        {isSignUp && (
       
          <LabelInputContainer className="mb-8">
            
            <Label htmlFor="confirmpassword">Confirm password</Label>
            <Input
              id="confirmpassword"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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