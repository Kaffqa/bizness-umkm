"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building2,
  ArrowRight,
  BarChart3,
  Package,
  Bot,
  Shield,
  MoreHorizontal,

} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLocalAuth } from "@/hooks/useLocalAuth";

// Data features 
const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track revenue, expenses, and profit margins with beautiful dashboards.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Manage products, track stock levels, and get low-stock alerts.",
  },
  {
    icon: Bot,
    title: "AI-Powered Tools",
    description:
      "OCR scanning, smart pricing suggestions, and business insights.",
  },
  {
    icon: Shield,
    title: "Multi-Business Support",
    description:
      "Manage multiple businesses from a single unified dashboard.",
  },
];

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user, isLoaded } = useLocalAuth();
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

 
  useEffect(() => {
    if (!isLoaded) return;
    if (isAuthenticated && user) {
      router.push(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [isAuthenticated, user, isLoaded, router]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      
      {/* Navigation  */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1a56db] flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Bizness
            </span>
          </div>

          <Button 
            className="bg-[#1a56db] hover:bg-[#1a56db]/90 text-white shadow-md hover:shadow-lg transition-all rounded-lg font-semibold"
            onClick={() => router.push("/Auth")}
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="container mx-auto text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-[#1a56db] text-sm font-semibold mb-8 border border-blue-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1a56db]"></span>
              </span>
              AI-Powered Business Management
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-slate-900">
              Grow Your Business with
              <br />
              <span className="text-[#1a56db]">Intelligent Automation</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              The all-in-one platform for MSMEs to manage inventory, calculate
              costs, and scale with AI-driven insights.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="xl" 
                className="bg-[#1a56db] hover:bg-[#1e40af] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-xl min-w-[200px]"
                onClick={() => router.push("/Auth")}
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm hover:shadow-md transition-all rounded-xl min-w-[180px]"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Dashboard Preview  */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative mx-auto"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-500/10 blur-[100px] rounded-full" />

            <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden ring-1 ring-slate-900/5">
              <div className="h-10 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="hidden sm:block text-xs text-slate-400 font-medium">bizness-dashboard.app</div>
                <div className="w-10"></div>
              </div>

              <div className="p-6 sm:p-10 bg-white">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Revenue", value: "Rp 45.2M", color: "text-[#1a56db]", bg: "bg-blue-50" },
                    { label: "Profit", value: "Rp 12.8M", color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Products", value: "248", color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Orders", value: "1,429", color: "text-[#1a56db]", bg: "bg-blue-50" },
                  ].map((stat) => (
                    <div key={stat.label} className={`${stat.bg} p-5 rounded-xl border border-transparent hover:border-slate-100 transition-colors`}>
                      <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider opacity-80">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color} tracking-tight`}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="h-64 sm:h-80 bg-white rounded-2xl border border-slate-100 p-6 relative overflow-hidden flex flex-col shadow-sm">
                   <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Revenue Growth</h3>
                        <p className="text-sm text-slate-500">Last 7 days performance</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs font-medium bg-slate-50 text-slate-600 border-slate-200">Weekly</Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreHorizontal className="w-4 h-4"/></Button>
                      </div>
                   </div>

                   <div className="flex-1 relative w-full flex items-end justify-between gap-2 px-2 pb-2">
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-full h-px bg-slate-50 border-t border-dashed border-slate-100" />
                        ))}
                      </div>

                      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                         <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="0%" stopColor="#1a56db" stopOpacity="0.2"/>
                               <stop offset="100%" stopColor="#1a56db" stopOpacity="0"/>
                            </linearGradient>
                         </defs>
                         <path d="M0,200 Q150,150 300,120 T600,80 T900,40 V300 H0 Z" fill="url(#chartGradient)" className="text-[#1a56db]" style={{transform: "scaleY(0.8) translateY(20%)"}} />
                         <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            d="M0,200 C150,150 300,180 450,120 S750,100 1200,50" 
                            fill="none" 
                            stroke="#1a56db" 
                            strokeWidth="4" 
                            strokeLinecap="round"
                         />
                      </svg>

                      {[
                        { day: "Mon", val: 30, h: "30%" },
                        { day: "Tue", val: 45, h: "45%" },
                        { day: "Wed", val: 35, h: "35%" },
                        { day: "Thu", val: 60, h: "60%" },
                        { day: "Fri", val: 55, h: "55%" },
                        { day: "Sat", val: 75, h: "75%" },
                        { day: "Sun", val: 90, h: "90%" },
                      ].map((item, i) => (
                        <div 
                          key={i} 
                          className="relative z-10 group flex flex-col items-center justify-end h-full w-full"
                          onMouseEnter={() => setHoveredPoint(i)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        >
                           <div className="absolute inset-0 bg-transparent" />
                           
                           <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: hoveredPoint === i ? 1 : 0, y: hoveredPoint === i ? 0 : 10 }}
                              className="absolute bottom-[calc(100%+12px)] bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg font-medium shadow-xl whitespace-nowrap z-20 pointer-events-none"
                           >
                              Rp {item.val}.5M
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                           </motion.div>

                           <div 
                              className={`w-3 h-3 rounded-full border-[3px] border-white transition-all duration-300 shadow-md ${hoveredPoint === i ? "bg-[#1a56db] scale-125 ring-4 ring-[#1a56db]/20" : "bg-[#1a56db] scale-0 sm:scale-100"}`}
                              style={{ marginBottom: `calc(${item.h} - 6px)` }}
                           />
                           
                           <span className={`text-xs mt-4 font-medium transition-colors ${hoveredPoint === i ? "text-[#1a56db]" : "text-slate-400"}`}>
                              {item.day}
                           </span>
                        </div>
                      ))}
                   </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/*  Features Section  */}
      <section className="py-24 px-4 md:px-6 bg-slate-50/50 border-t border-slate-100">
       
        <div className="container mx-auto max-w-7xl">
          
          {/* Header Features  */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 tracking-tight">
              Everything You Need to Succeed
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Powerful features designed specifically for small and medium
              businesses to streamline operations.
            </p>
          </motion.div>

          {/* Grid Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#1a56db] transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-[#1a56db] group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section  */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}

            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a56db] to-[#1e3a8a] shadow-2xl shadow-blue-900/20 p-8 sm:p-12 lg:p-20 text-center"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 mix-blend-overlay" />
            
            {/* Content Centered */}
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100/90 mb-10 leading-relaxed font-medium max-w-2xl">
                Join thousands of businesses already using our platform to streamline operations and boost revenue.
              </p>

              <Button
                variant="glass"
                size="xl"
                onClick={() => router.push("Auth")}
                className="rounded-xl px-8 min-w-[200px] bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-lg transition-all shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-slate-100 bg-slate-50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                <Building2 className="w-5 h-5 text-[#1a56db]" />
            </div>
            <span className="font-bold text-slate-900 text-lg">Bizness</span>
          </div>

          <p className="text-sm text-slate-500 font-medium">
            © 2024 Bizness. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}