"use client";
import React, { useState, useEffect } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import BlurText from "@/components/BlurText";
import GradientGlowButton from "@/components/button";
import Navbar from "@/components/navbar1";
import Button2 from "@/components/button2";
import Particles from "@/components/Backgrounds/Particles";
import {
  User,
  FileText,
  UploadCloud,
  CreditCard,
  ChevronLeft,
} from "lucide-react";
import Upload from "@/components/upload";
import { supabase } from "@/lib/supabaseclient";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/animate-ui/radix/checkbox";
import { Counter } from "@/components/animate-ui/components/counter";
import { PayButton } from "@/components/paybutton";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

const FormPa = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2 state
  const [subject, setSubject] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");

  // Step 3 state
  const [instructions, setInstructions] = useState("");
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [notesFile, setNotesFile] = useState<File | null>(null);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Page loading state
  const [pageLoading, setPageLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Step 2: Terms checkbox and counter
  const [termsChecked, setTermsChecked] = useState(false);
  const [counterNumber, setCounterNumber] = useState(0);

  const allFilled = firstName && lastName && email && phone;
  const step2AllFilled = subject && course && branch && semester;
  const step3AllFilled = mainFile; // Assuming at least the main file is required

  const router = useRouter();

  const noOfPage = Number(searchParams.get("noOfPage")) || 10;
  const totalAmount = Number(searchParams.get("totalAmount")) || 100;

  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setter(e.target.files[0]);
      }
    };

  // Helper to upload file to Supabase Storage
  async function uploadFile(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, file);
    if (error) throw error;
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  }

  // Insert assignment into DB
  async function submitAssignment() {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      // Upload file
      let fileUrl = "";
      if (mainFile) {
        fileUrl = await uploadFile(mainFile);
      }
      // Insert row
      const { error: insertError } = await supabase.from("assignments").insert([
        {
          first_name: firstName,
          last_name: lastName,
          phone,
          email,
          course,
          subject,
          instructions,
          file_url: fileUrl,
          branch,
          semester,
          "no.of.page": noOfPage,
          total_amount: totalAmount,
          user_id: user.id,
        },
      ]);
      if (insertError) throw insertError;
      setSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      let errorMsg = "Submission failed";
      if (err instanceof Error) {
        errorMsg = err.message;
      } else if (typeof err === "object") {
        errorMsg = JSON.stringify(err);
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  // Trigger submitAssignment when step changes to 4
  useEffect(() => {
    if (step === 4) {
      submitAssignment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Page loading logic
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [mounted]);

  if (!mounted) return null;

  // Replace this function:
  // const proceedToPayment = (amount: string) => {
  //   alert(`Proceeding to payment of $${amount}`);
  // };

  // With this:
  const proceedToPayment = (amount: string) => {
    router.push(`/payment?amount=${amount}`);
  };

  // Calculate final amount for PayButton
  const baseAmount = totalAmount;
  const extraPages = termsChecked ? counterNumber : 0;
  const finalAmount = (baseAmount + extraPages * 5).toFixed(2);

  return (
    <div className="min-h-screen w-full relative bg-black text-white">
      {/* Custom Loading Screen */}
      <LoadingScreen
        isVisible={pageLoading}
        loadingMessages={[
          "Preparing assignment form...",
          "Setting up your workspace...",
          "Loading form components...",
          "Almost ready to start...",
        ]}
        variant="minimal"
        customDuration={2500}
      />

      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div
        className={`relative z-10 ${
          pageLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }`}
      >
        <div className="flex flex-col items-center justify-start pt-12 px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-indigo-300">
            <span className="md:hidden">Order Assignment</span>
            <span className="hidden md:inline">Order Your Assignment</span>
          </h1>
          <p className="text-xs md:text-base text-gray-300 mt-2 mb-8 md:mb-10">
            <span className="md:hidden">Fill the form to start</span>
            <span className="hidden md:inline">
              Fill out the form below to get started with your assignment
            </span>
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center w-full max-w-2xl">
            <div className="flex flex-col items-center z-10">
              <div
                className={`${
                  step >= 1 ? "bg-blue-600" : "bg-gray-700"
                } p-3 rounded-full`}
              >
                <User size={20} className="text-white" />
              </div>
            </div>
            <div
              className={`flex-1 h-1 ${
                step >= 2 ? "bg-blue-600" : "bg-gray-700"
              }`}
            ></div>

            <div className="flex flex-col items-center z-10">
              <div
                className={`${
                  step >= 2 ? "bg-blue-600" : "bg-gray-700"
                } p-3 rounded-full`}
              >
                <FileText size={20} className="text-white" />
              </div>
            </div>
            <div
              className={`flex-1 h-1 ${
                step >= 3 ? "bg-blue-600" : "bg-gray-700"
              }`}
            ></div>

            <div className="flex flex-col items-center z-10">
              <div
                className={`${
                  step >= 3 ? "bg-blue-600" : "bg-gray-700"
                } p-3 rounded-full`}
              >
                <UploadCloud size={20} className="text-white" />
              </div>
            </div>
            <div
              className={`flex-1 h-1 ${
                step >= 4 ? "bg-blue-600" : "bg-gray-700"
              }`}
            ></div>

            <div className="flex flex-col items-center z-10">
              <div
                className={`${
                  step >= 4 ? "bg-blue-600" : "bg-gray-700"
                } p-3 rounded-full`}
              >
                <CreditCard size={20} className="text-white" />
              </div>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="bg-transparent rounded-xl mt-10 p-8 w-full max-w-5xl shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-1 text-white">
                Personal Info<span className="hidden md:inline">rmation</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-300 mb-4 md:mb-6">
                Step 1 of 4
              </p>

              <div className="space-y-8">
                {/* First Name */}
                <div>
                  <label
                    className="block text-gray-400 mb-1"
                    htmlFor="firstName"
                  >
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g., John"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-indigo-400 p-2 rounded-none text-white placeholder-gray-500 outline-none transition-colors"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    className="block text-gray-400 mb-1"
                    htmlFor="lastName"
                  >
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g., Doe"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-indigo-400 p-2 rounded-none text-white placeholder-gray-500 outline-none transition-colors"
                  />
                </div>

                {/* Email (full width) */}
                <div>
                  <label className="block text-gray-400 mb-1" htmlFor="email">
                    Email Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., john@example.com"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-indigo-400 p-2 rounded-none text-white placeholder-gray-500 outline-none transition-colors"
                  />
                </div>

                {/* Phone (full width, below email) */}
                <div>
                  <label className="block text-gray-400 mb-1" htmlFor="phone">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 9876543210"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-indigo-400 p-2 rounded-none text-white placeholder-gray-500 outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button2 disabled={!allFilled} onClick={() => setStep(2)} />
              </div>
            </div>
          )}

          {/* Step 2: Assignment Details */}
          {step === 2 && (
            <div className="bg-black/80 backdrop-blur-lg rounded-xl mt-10 p-8 w-full max-w-5xl shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-1 text-white">
                Assignment Details
              </h2>
              <p className="text-xs md:text-sm text-gray-300 mb-4 md:mb-6">
                Step 2 of 4
              </p>

              <div className="space-y-8">
                {/* Subject */}
                <div>
                  <label className="block text-gray-400 mb-1" htmlFor="subject">
                    Subject<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Computer Science"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-indigo-400 p-2 rounded-none text-white placeholder-gray-500 outline-none transition-colors"
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="block text-gray-400 mb-1" htmlFor="course">
                    Course<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="course"
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g., Data Structures and Algorithms"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-indigo-400 p-2 rounded-none text-white placeholder-gray-500 outline-none transition-colors"
                  />
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-gray-400 mb-1" htmlFor="branch">
                    Branch<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="branch"
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g., Information Technology"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-indigo-400 p-2 rounded-none text-white placeholder-gray-500 outline-none transition-colors"
                  />
                </div>

                {/* Semester */}
                <div>
                  <label
                    className="block text-gray-400 mb-1"
                    htmlFor="semester"
                  >
                    Semester<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="semester"
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="e.g., 3rd"
                    className="w-full bg-transparent border-b border-gray-500 focus:border-indigo-400 p-2 rounded-none text-white placeholder-gray-500 outline-none transition-colors"
                  />
                </div>

                <div className="pt-4 flex gap-6">
                  {/* Project Type Card */}
                  <div className="flex-1 bg-[#18181b] rounded-xl flex items-center gap-4 p-5 min-w-[220px]">
                    <div className="bg-[#23232a] rounded-lg p-3 flex items-center justify-center">
                      <FileText size={32} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-gray-300 text-sm">Project Type</div>
                      <div className="text-white text-lg font-semibold">
                        Assignment
                      </div>
                    </div>
                  </div>
                  {/* Number of Pages Card */}
                  <div className="flex-1 bg-[#18181b] rounded-xl flex items-center gap-4 p-5 min-w-[220px]">
                    <div className="bg-[#23232a] rounded-lg p-3 flex items-center justify-center">
                      <span className="text-green-400 text-2xl font-bold">
                        #
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-300 text-sm">
                        Number of Pages
                      </div>
                      <div className="text-white text-lg font-semibold">
                        {noOfPage}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="terms"
                      checked={termsChecked}
                      onCheckedChange={(checked: boolean) =>
                        setTermsChecked(!!checked)
                      }
                    />
                    <Label htmlFor="terms" className="text-white">
                      Need more pages ?
                    </Label>
                  </div>
                  {termsChecked && (
                    <div className="mt-4 flex flex-col items-start">
                      <span className="text-xs text-white mb-1">
                        Per page ₹5/-
                      </span>
                      <Counter
                        number={counterNumber}
                        setNumber={(n) =>
                          setCounterNumber(Math.max(0, Math.min(10, n)))
                        }
                        className="text-white"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={28} />
                </button>
                <Button2
                  disabled={!step2AllFilled}
                  onClick={() => setStep(3)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Upload Documents */}
          {step === 3 && (
            <div className="bg-black/80 backdrop-blur-lg rounded-xl mt-10 p-8 w-full max-w-5xl shadow-xl">
              <h2 className="text-lg md:text-xl font-semibold mb-1 text-white">
                Upload Docs<span className="hidden md:inline">uments</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-300 mb-4 md:mb-6">
                Step 3 of 4
              </p>

              <div className="space-y-8">
                {/* Instructions */}
                <div>
                  <label
                    className="block text-gray-400 mb-1"
                    htmlFor="instructions"
                  >
                    Instructions
                  </label>
                  <textarea
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Provide any specific instructions for your assignment..."
                    className="w-full bg-transparent border-b border-gray-500 focus:border-indigo-400 p-2 rounded-none text-white placeholder-gray-500 outline-none transition-colors h-24 resize-none"
                  />
                </div>

                {/* Main File Upload */}
                <div>
                  <label className="block text-gray-400 mb-2">
                    Upload Assignment<span className="text-red-500">*</span>
                  </label>
                  <label
                    htmlFor="mainFile"
                    className="w-full flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <div className="text-center w-full flex flex-col items-center">
                      <Upload />
                      <p className="mt-2 text-sm text-gray-400">
                        <span className="font-semibold text-indigo-400">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOCX, PNG, JPG, ZIP, etc.
                      </p>
                      {mainFile && (
                        <p className="text-sm text-green-400 mt-2">
                          {mainFile.name}
                        </p>
                      )}
                    </div>
                    <input
                      id="mainFile"
                      name="mainFile"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange(setMainFile)}
                    />
                  </label>
                </div>

                {/* Notes File Upload */}
                <div>
                  <label className="block text-gray-400 mb-2">
                    Upload Notes (Optional)
                  </label>
                  <label
                    htmlFor="notesFile"
                    className="w-full flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <div className="text-center w-full flex flex-col items-center">
                      <Upload />
                      <p className="mt-2 text-sm text-gray-400">
                        <span className="font-semibold text-indigo-400">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Any additional notes or materials
                      </p>
                      {notesFile && (
                        <p className="text-sm text-green-400 mt-2">
                          {notesFile.name}
                        </p>
                      )}
                    </div>
                    <input
                      id="notesFile"
                      name="notesFile"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange(setNotesFile)}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={28} />
                </button>
                <Button2
                  disabled={!step3AllFilled}
                  onClick={() => setStep(4)}
                />
              </div>
            </div>
          )}

          {/* Step 4: Payment Section */}
          {step === 4 && (
            <div className="bg-black/80 backdrop-blur-lg rounded-xl mt-10 p-8 w-full max-w-2xl shadow-xl flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
                Billing Summary
              </h2>
              <p className="text-sm text-gray-300 mb-6 text-center">
                Review your charges before proceeding to payment
              </p>
              <div className="w-full bg-[#18181b] rounded-xl shadow-lg p-6 md:p-8 mb-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🧾</span>
                  <span className="text-lg font-semibold text-white">
                    Order Details
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-4">
                  Invoice #INV-2024-001234 &bull; Due: January 15, 2024
                </div>
                <div className="flex justify-between items-center text-white font-medium">
                  <span>
                    Premium Subscription{" "}
                    <span className="bg-gray-700 text-xs rounded px-2 py-0.5 ml-1">
                      Monthly
                    </span>
                  </span>
                  <span>$29.99</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span>
                    Additional Storage{" "}
                    <span className="bg-gray-700 text-xs rounded px-2 py-0.5 ml-1">
                      50GB
                    </span>
                  </span>
                  <span>$9.98</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span>
                    Priority Support{" "}
                    <span className="bg-gray-700 text-xs rounded px-2 py-0.5 ml-1">
                      Monthly
                    </span>
                  </span>
                  <span>$9.99</span>
                </div>
                <hr className="my-2 border-gray-700" />
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Subtotal</span>
                  <span>$49.96</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>Tax (8%)</span>
                  <span>$4.00</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm mb-2">
                  <span>Processing Fee</span>
                  <span>$2.50</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-white mt-2">
                  <span>Total</span>
                  <span>$56.46</span>
                </div>
              </div>
              {/* Show PayButton on desktop/tablet, default button on mobile */}
              <div className="w-full">
                <div className="hidden md:block">
                  <PayButton
                    amount={finalAmount}
                    onClick={() => proceedToPayment(finalAmount)}
                  />
                </div>
                <div className="block md:hidden">
                  <button
                    className="w-full bg-white text-black font-semibold py-2 rounded-lg text-base transition hover:bg-gray-200 mb-3 flex items-center justify-center gap-2"
                    onClick={() => proceedToPayment(finalAmount)}
                  >
                    <span>Proceed to Pay&nbsp;${finalAmount}</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                <span className="material-icons text-base">lock</span>
                Secured by 256-bit SSL encryption
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPa;
