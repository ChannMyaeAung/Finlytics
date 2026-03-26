import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Mail,
  Lock,
  User,
  ChevronRight,
  Loader2,
} from "lucide-react";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const navigate = useNavigate();

  const handleOAuth = async (provider: "oauth_google" | "oauth_github") => {
    if (!signIn) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      setError(clerkError.errors?.[0]?.message ?? "OAuth sign-in failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        if (!signIn) return;
        const result = await signIn.create({
          identifier: email,
          password,
        });
        if (result.status === "complete") {
          await setSignInActive({ session: result.createdSessionId });
          navigate("/dashboard");
        }
      } else {
        if (!signUp) return;
        const [firstName, ...rest] = fullName.trim().split(" ");
        const lastName = rest.join(" ");
        const result = await signUp.create({
          emailAddress: email,
          password,
          firstName,
          lastName,
        });
        if (result.status === "complete") {
          await setSignUpActive({ session: result.createdSessionId });
          navigate("/dashboard");
        } else {
          // Email verification required — Clerk will handle via email
          setError(
            "Please check your email to verify your account before signing in.",
          );
        }
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      setError(
        clerkError.errors?.[0]?.message ??
          "Authentication failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="md:min-h-screen bg-white font-sans text-slate-900 flex overflow-hidden">
      {/* Left Side: Brand & Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f0faf5] relative overflow-hidden flex-col justify-between p-12 text-gray-900">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <TrendingUp className="absolute -right-12 -bottom-12 w-80 h-80 text-emerald-200/50" />
          <div className="absolute top-[-20%] right-[-10%] w-[55%] h-[55%] bg-emerald-400/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[40%] h-[40%] bg-emerald-300/10 blur-[80px] rounded-full" />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-800/20">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Fin<span className="text-emerald-800 text-3xl">lytics</span>
          </span>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-md">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black leading-[1.1] mb-4 text-gray-900"
          >
            Master your{" "}
            <span className="text-emerald-700">financial</span>{" "}
            future.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-base mb-8"
          >
            Join 10,000+ users who use Finlytics to track, analyze, and
            optimize their personal and business finances in real-time.
          </motion.p>

          {/* Mock dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl p-5 shadow-md border border-emerald-100 mb-8"
          >
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
              Monthly Overview
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div>
                <p className="text-xl font-bold text-gray-900">฿42,700</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Spent</p>
              </div>
              <div>
                <p className="text-xl font-bold text-emerald-700">+18%</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Savings</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">12</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Active subs</p>
              </div>
            </div>
            <div className="mt-4 flex gap-1.5 items-center">
              <div className="h-1.5 rounded-full bg-emerald-600 flex-3" />
              <div className="h-1.5 rounded-full bg-emerald-300 flex-1" />
              <div className="h-1.5 rounded-full bg-gray-100 flex-1" />
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5">60% of savings goal reached</p>
          </motion.div>

          <div className="space-y-5">
            {[
              {
                icon: ShieldCheck,
                title: "Bank-grade Security",
                desc: "Your data is encrypted with AES-256 and never shared.",
              },
              {
                icon: Zap,
                title: "Real-time Insights",
                desc: "Connect your accounts and see your net worth update instantly.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="mt-0.5 p-2 bg-emerald-50 rounded-lg border border-emerald-100 shrink-0">
                  <item.icon className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-10 flex items-center gap-6 text-xs text-gray-400 font-mono uppercase tracking-widest"
        >
          <span>© 2026 Finlytics</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>Privacy Policy</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>Terms of Service</span>
        </motion.div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Finlytics</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-slate-500 mt-2">
              {isLogin
                ? "Enter your credentials to access your dashboard"
                : "Start your 14-day free trial today. No credit card required."}
            </p>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleOAuth("oauth_google")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 shadow-sm"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              onClick={() => handleOAuth("oauth_github")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 shadow-sm"
            >
              <GitHubIcon />
              GitHub
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-4 text-slate-400 font-medium tracking-wider">
                Or continue with email
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <label className="text-sm font-medium text-slate-700 ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/10"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={switchMode}
              className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors inline-flex items-center gap-0.5"
            >
              {isLogin ? "Sign up for free" : "Sign in to account"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
