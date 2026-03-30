'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Brain, Sparkles, Users, BarChart3, Shield, Zap,
  ArrowRight, Eye, EyeOff, Mail, Lock, Globe
} from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('sarah@cgtrecruit.ai');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  const features = [
    { icon: Brain, title: 'AI-Powered Matching', desc: 'Smart candidate-job matching with 94% accuracy' },
    { icon: Users, title: 'Full ATS Pipeline', desc: 'Kanban-style tracking from apply to hire' },
    { icon: BarChart3, title: 'Deep Analytics', desc: 'Real-time insights on hiring performance' },
    { icon: Shield, title: 'Enterprise Security', desc: 'GDPR compliant with role-based access' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0B0E14] via-[#141820] to-[#0B0E14]">
        {/* Animated blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 flex flex-col justify-center px-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">CGT RecruitAI</h1>
              <p className="text-xs text-text-muted tracking-widest uppercase">AI-Powered Recruitment</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Hire smarter with<br />
            <span className="gradient-text">AI-driven intelligence</span>
          </h2>
          <p className="text-text-secondary text-lg mb-12 max-w-md">
            Transform your recruitment workflow with AI-powered candidate sourcing, scoring, and matching — all in one platform.
          </p>

          <div className="grid grid-cols-2 gap-4 stagger-children">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-xl p-4 group hover:border-primary/30 transition-all duration-300">
                <f.icon className="w-6 h-6 text-primary mb-2 group-hover:text-accent transition-colors" />
                <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-xs text-text-muted">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['#6C5CE7', '#00D2FF', '#00E676', '#FFB74D'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white" style={{ background: c }}>
                  {['S', 'M', 'L', 'J'][i]}
                </div>
              ))}
            </div>
            <p className="text-text-muted text-sm">
              <span className="text-white font-semibold">2,400+</span> recruiters trust us
            </p>
          </div>
        </div>
      </div>

      {/* Right panel - Auth form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">CGT RecruitAI</h1>
          </div>

          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-text-secondary mb-8">
              {isLogin ? 'Sign in to your recruitment dashboard' : 'Start your 14-day free trial'}
            </p>

            {/* OAuth button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border hover:border-border-light hover:bg-surface-hover transition-all duration-200 mb-6"
            >
              <Globe className="w-5 h-5 text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">Continue with Google</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-muted uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                    <input type="checkbox" className="rounded border-border bg-surface accent-primary" defaultChecked />
                    Remember me
                  </label>
                  <button type="button" className="text-primary hover:text-primary-light transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              {!isLogin && (
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-text-secondary mb-1.5">Role</label>
                  <select id="role" className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all">
                    <option value="recruiter">Recruiter</option>
                    <option value="hiring_manager">Hiring Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-text-muted mt-6">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary-light font-medium transition-colors"
              >
                {isLogin ? 'Start free trial' : 'Sign in'}
              </button>
            </p>

            {isLogin && (
              <div className="mt-6 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">Demo Credentials</span>
                </div>
                <p className="text-xs text-text-muted">
                  Email: sarah@cgtrecruit.ai · Password: demo123
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
