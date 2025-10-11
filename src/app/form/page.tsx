"use client";
import React, { useState } from "react";
import { User, FileText, UploadCloud, CreditCard, ChevronLeft, Check, Sparkles, AlertCircle } from 'lucide-react';

const FormPage = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [instructions, setInstructions] = useState('');
  const [mainFileName, setMainFileName] = useState('');
  const [notesFileName, setNotesFileName] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [counterNumber, setCounterNumber] = useState(0);
  
  const noOfPage = 10;
  const totalAmount = 100;
  const baseAmount = totalAmount;
  const extraPages = termsChecked ? counterNumber : 0;
  const finalAmount = (baseAmount + extraPages * 5).toFixed(2);

  const allFilled = firstName && lastName && email && phone;
  const step2AllFilled = subject && course && branch && semester;
  const step3AllFilled = mainFileName;

  const steps = [
    { number: 1, icon: User, label: "Personal Info" },
    { number: 2, icon: FileText, label: "Assignment" },
    { number: 3, icon: UploadCloud, label: "Upload" },
    { number: 4, icon: CreditCard, label: "Payment" }
  ];

  const handleFileChange = (setter: (name: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0].name);
    }
  };

  const handlePayment = () => {
    alert(`Processing payment of $${finalAmount}\n\nIn your actual app, this will redirect to payment gateway.`);
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start pt-8 md:pt-16 px-4 pb-20">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-fadeIn">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Order Your Assignment
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Complete the form below to get started with your order
          </p>
        </div>

        {/* Enhanced Progress Stepper */}
        <div className="w-full max-w-3xl mb-12">
          <div className="flex items-center justify-between relative">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      step > s.number 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50 scale-100' 
                        : step === s.number 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50 scale-110' 
                        : 'bg-slate-800 border-2 border-slate-700 scale-90'
                    }`}
                  >
                    {step > s.number ? (
                      <Check className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    ) : (
                      <s.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    )}
                    {step === s.number && (
                      <div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-75"
                      />
                    )}
                  </div>
                  <span className="text-xs mt-2 text-gray-400 hidden md:block">{s.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 relative">
                    <div className="absolute inset-0 bg-slate-800 rounded-full"></div>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
                      style={{ width: step > s.number ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Form Container */}
        <div className="w-full max-w-2xl">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="animate-slideIn">
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/50 shadow-2xl p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Personal Information</h2>
                  <p className="text-sm text-gray-400">Step 1 of 4 • Let's get to know you</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    disabled={!allFilled}
                    onClick={() => setStep(2)}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      allFilled
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70'
                        : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Assignment Details */}
          {step === 2 && (
            <div className="animate-slideIn">
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/50 shadow-2xl p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Assignment Details</h2>
                  <p className="text-sm text-gray-400">Step 2 of 4 • Tell us about your assignment</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Computer Science"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Course <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      placeholder="Data Structures and Algorithms"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Branch <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="Information Technology"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Semester <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        placeholder="3rd"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/30 rounded-xl p-5 flex items-center gap-4 transition-transform hover:scale-105">
                      <div className="bg-blue-600/20 rounded-lg p-3">
                        <FileText className="w-7 h-7 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Project Type</p>
                        <p className="text-lg font-semibold text-white">Assignment</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/30 rounded-xl p-5 flex items-center gap-4 transition-transform hover:scale-105">
                      <div className="bg-green-600/20 rounded-lg p-3">
                        <span className="text-2xl font-bold text-green-400">#</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Number of Pages</p>
                        <p className="text-lg font-semibold text-white">{noOfPage}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id="extra-pages"
                        checked={termsChecked}
                        onChange={(e) => setTermsChecked(e.target.checked)}
                        className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="extra-pages" className="text-sm font-medium text-white cursor-pointer">
                        Need more pages?
                      </label>
                    </div>
                    {termsChecked && (
                      <div className="flex items-center gap-4 mt-4 animate-slideDown">
                        <span className="text-sm text-gray-400">₹5 per page</span>
                        <div className="flex items-center bg-slate-900 rounded-lg">
                          <button
                            onClick={() => setCounterNumber(Math.max(0, counterNumber - 1))}
                            className="px-4 py-2 text-white hover:bg-slate-800 rounded-l-lg transition-colors"
                          >
                            -
                          </button>
                          <span className="px-6 py-2 text-white font-semibold">{counterNumber}</span>
                          <button
                            onClick={() => setCounterNumber(Math.min(10, counterNumber + 1))}
                            className="px-4 py-2 text-white hover:bg-slate-800 rounded-r-lg transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    disabled={!step2AllFilled}
                    onClick={() => setStep(3)}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      step2AllFilled
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Upload */}
          {step === 3 && (
            <div className="animate-slideIn">
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/50 shadow-2xl p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Upload Documents</h2>
                  <p className="text-sm text-gray-400">Step 3 of 4 • Share your assignment files</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Instructions
                    </label>
                    <textarea
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Provide any specific instructions for your assignment..."
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-32 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Upload Assignment <span className="text-red-400">*</span>
                    </label>
                    <label className="block cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange(setMainFileName)}
                      />
                      <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:scale-105 ${
                          mainFileName
                            ? 'border-green-500 bg-green-900/20'
                            : 'border-slate-700 bg-slate-800/30 hover:border-blue-500 hover:bg-slate-800/50'
                        }`}
                      >
                        <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${mainFileName ? 'text-green-400' : 'text-gray-400'}`} />
                        {mainFileName ? (
                          <>
                            <p className="text-green-400 font-semibold mb-1">{mainFileName}</p>
                            <p className="text-xs text-gray-400">Click to change file</p>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-300 mb-1">
                              <span className="text-blue-400 font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, DOCX, PNG, JPG, ZIP, etc.</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Upload Notes (Optional)
                    </label>
                    <label className="block cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange(setNotesFileName)}
                      />
                      <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:scale-105 ${
                          notesFileName
                            ? 'border-green-500 bg-green-900/20'
                            : 'border-slate-700 bg-slate-800/30 hover:border-blue-500 hover:bg-slate-800/50'
                        }`}
                      >
                        <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${notesFileName ? 'text-green-400' : 'text-gray-400'}`} />
                        {notesFileName ? (
                          <>
                            <p className="text-green-400 font-semibold mb-1">{notesFileName}</p>
                            <p className="text-xs text-gray-400">Click to change file</p>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-300 mb-1">
                              <span className="text-blue-400 font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">Any additional notes or materials</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    disabled={!step3AllFilled}
                    onClick={() => setStep(4)}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      step3AllFilled
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="animate-slideIn w-full max-w-xl mx-auto">
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/50 shadow-2xl p-6 md:p-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Billing Summary</h2>
                  <p className="text-sm text-gray-400">Review your order before payment</p>
                </div>

                <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50 mb-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Base Amount</span>
                      <span className="text-white font-semibold">${baseAmount}</span>
                    </div>
                    {termsChecked && counterNumber > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Extra Pages ({counterNumber})</span>
                        <span className="text-white font-semibold">${(counterNumber * 5).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-700 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-white">Total</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          ${finalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Proceed to Payment • ${finalAmount}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secured by 256-bit SSL encryption
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 200px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FormPage;