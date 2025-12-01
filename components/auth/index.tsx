"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ArrowRight,
  Mail,
  Lock,
  User,
  Loader2,
  CheckCircle2,
  BarChart3,
  Bot,
  Shield,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { setUser } from "@/lib/auth"; // Menggunakan lib yang Anda sediakan

// --- MOCK UI COMPONENTS (Agar tidak error jika belum ada) ---
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
    {...props}
  />
);

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={`text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 mb-2 block ${className}`}>
    {children}
  </label>
);

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi Network Delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Logic Login / Register Sederhana
    let userData;

    if (isRegister) {
      // Logic Register
      userData = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        role: "user", // Default user role
      };
    } else {
      // Logic Login
      // Cek Admin Hardcoded
      if (formData.email === "admin@gmail.com" && formData.password === "123") {
        userData = {
          id: "admin-id",
          name: "Administrator",
          email: "admin@gmail.com",
          role: "admin",
        };
      } else {
        // Mock User Login
        userData = {
          id: "user-id",
          name: "Demo User",
          email: formData.email,
          role: "user",
        };
      }
    }

    // Simpan ke LocalStorage via lib/auth helper
    setUser(userData);
    setIsLoading(false);

    // Redirect
    router.push(userData.role === "admin" ? "/admin" : "/dashboard");
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "" }); // Reset form
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-900 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[100px]" />
      </div>

      <Button
        variant="ghost"
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-50 text-slate-500 hover:text-[#1a56db]"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      {/* --- MAIN CARD CONTAINER --- */}
      <div className="relative w-full max-w-[1100px] min-h-[650px] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex">
        
        {/* --- LEFT FORM (REGISTER) --- */}
        {/* Muncul di kiri saat isRegister = true */}
        <motion.div 
          className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center p-12 bg-white z-10"
          initial={false}
          animate={{ x: isRegister ? "0%" : "-100%", opacity: isRegister ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-slate-900">Create Account</h2>
              <p className="text-slate-500">Join us to scale your business</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    name="name"
                    placeholder="John Doe" 
                    className="pl-10" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    name="email"
                    type="email" 
                    placeholder="name@company.com" 
                    className="pl-10" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="xl" 
                className="w-full bg-[#1a56db] hover:bg-[#1a56db]/90 text-white mt-4 rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Sign Up Now
              </Button>
            </form>
          </div>
        </motion.div>

        {/* --- RIGHT FORM (LOGIN) --- */}
        {/* Muncul di kanan saat isRegister = false */}
        <motion.div 
          className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center p-12 bg-white z-10"
          initial={false}
          animate={{ x: isRegister ? "100%" : "0%", opacity: isRegister ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-[#1a56db] mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-slate-900">Welcome Back</h2>
              <p className="text-slate-500">Sign in to manage your business</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    name="email"
                    type="email" 
                    placeholder="user@gmail.com" 
                    className="pl-10" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="mb-0">Password</Label>
                  <a href="#" className="text-xs font-semibold text-[#1a56db] hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="••••••••••••••••" 
                    className="pl-10" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="xl" 
                className="w-full bg-[#1a56db] hover:bg-[#1a56db]/90 text-white rounded-xl shadow-lg shadow-blue-900/10"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </motion.div>

        {/* --- OVERLAY PANEL (SLIDING BLUE CARD) --- */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full z-50 overflow-hidden"
          initial={false}
          animate={{ x: isRegister ? "100%" : "0%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full bg-[#1a56db] text-white flex flex-col items-center justify-center p-12 text-center">
            {/* Pattern Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
            
            {/* Decorative Gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* CONTENT INSIDE BLUE PANEL */}
            <div className="relative z-10 w-full max-w-sm">
              <AnimatePresence mode="wait">
                {!isRegister ? (
                  // KONTEN SAAT MODE LOGIN (Overlay di Kiri)
                  <motion.div
                    key="login-overlay"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="mb-8 p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                       <Building2 className="w-10 h-10 text-white" />
                    </div>
                    
                    <h1 className="text-3xl font-bold mb-4 leading-tight">
                      Empower Your MSME with AI-Driven Insights
                    </h1>
                    <p className="text-blue-100 mb-8 text-lg">
                      Manage inventory, calculate costs, and grow your business with intelligent automation.
                    </p>

                    <div className="flex flex-col gap-3 w-full text-left mb-8">
                       {[
                         { icon: BarChart3, text: "Real-time Analytics Dashboard" },
                         { icon: Bot, text: "AI-Powered Cost Optimization" },
                         { icon: Shield, text: "Secure Data Management" }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-3 text-blue-50 bg-white/5 p-3 rounded-lg border border-white/5">
                           <item.icon className="w-5 h-5 text-blue-200" />
                           <span className="text-sm font-medium">{item.text}</span>
                         </div>
                       ))}
                    </div>

                    <div className="w-full border-t border-white/20 pt-6 mt-4">
                        <p className="text-sm text-blue-200 mb-4">Don't have an account yet?</p>
                        <Button 
                            variant="glass" 
                            size="xl" 
                            onClick={toggleMode}
                            className="w-full bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-xl"
                        >
                            Register Now
                        </Button>
                    </div>
                  </motion.div>
                ) : (
                  // KONTEN SAAT MODE REGISTER (Overlay di Kanan)
                  <motion.div
                    key="register-overlay"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="mb-6 p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                       <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>

                    <h1 className="text-3xl font-bold mb-4">
                      Join the Revolution
                    </h1>
                    <p className="text-blue-100 mb-8 text-lg">
                      Start your journey with Bizness today and take control of your growth.
                    </p>

                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mb-8 w-full">
                       <p className="italic text-blue-50 text-sm mb-4">
                         "Bizness has completely transformed how I manage my coffee shop. The AI insights are a game changer!"
                       </p>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-300" />
                          <div className="text-left">
                             <p className="text-sm font-bold">Sarah T.</p>
                             <p className="text-xs text-blue-200">Business Owner</p>
                          </div>
                       </div>
                    </div>

                    <div className="w-full border-t border-white/20 pt-6">
                        <p className="text-sm text-blue-200 mb-4">Already have an account?</p>
                        <Button 
                            variant="glass" 
                            size="xl" 
                            onClick={toggleMode}
                            className="w-full bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-xl"
                        >
                            Login Here
                        </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* MOBILE VIEW FALLBACK (jika layar kecil, stack vertical) - Optional handling via CSS hidden/block */}
        <div className="lg:hidden absolute inset-0 bg-white z-[60] flex flex-col items-center justify-center p-6 text-center">
            <p className="text-slate-500 mb-4">Please use a larger screen for the best experience or rotate your device.</p>
            <Button onClick={() => router.push("/")} variant="outline">Back Home</Button>
        </div>

      </div>
    </div>
  );
}