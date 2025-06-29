import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, EyeOff, Zap, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { AlertModal } from '../components/Modal';
import { useAlertModal } from '../hooks/useModal';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@crisislink.gov');
  const [password, setPassword] = useState('crisis123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, demoLogin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { isOpen: alertOpen, title: alertTitle, message: alertMessage, type: alertType, showAlert, closeAlert } = useAlertModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      showAlert('Authentication Error', 'Invalid credentials. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      demoLogin();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 transition-all duration-300">
      {/* Theme Toggle Button - Fixed Position */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary backdrop-blur-xl bg-light-bg-primary/80 dark:bg-dark-bg-primary/80 hover:bg-light-bg-primary/90 dark:hover:bg-dark-bg-secondary/90 rounded-xl border border-light-border-primary/40 dark:border-dark-border-primary/40 transition-all duration-300 hover:shadow-lg group"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <Sun className="h-6 w-6 transform group-hover:rotate-180 transition-transform duration-300" />
        ) : (
          <Moon className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Left Section - Branding */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-crisis-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-lg">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-crisis-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <img 
                  src="../public/CrisisLink.png" 
                  alt="CrisisLink Logo" 
                  className="h-48 w-48 object-contain filter brightness-0 invert"
                />
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div className="mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-300">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-crisis-600 bg-clip-text text-transparent mb-2">
              CrisisLink
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-crisis-500 mx-auto rounded-full"></div>
          </div>

          {/* Tagline */}
          <div className="animate-in slide-in-from-bottom-4 duration-700 delay-500">
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary font-medium mb-4">
              Connecting Signals.
            </p>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary font-medium">
              Coordinating Response.
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-700">
            <div className="flex items-center space-x-3 text-light-text-tertiary dark:text-dark-text-tertiary">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time Emergency Coordination</span>
            </div>
            <div className="flex items-center space-x-3 text-light-text-tertiary dark:text-dark-text-tertiary">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              <span>Integrated Communication Systems</span>
            </div>
            <div className="flex items-center space-x-3 text-light-text-tertiary dark:text-dark-text-tertiary">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-600"></div>
              <span>Advanced Analytics & Reporting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div className="w-full max-w-md relative z-10">
          {/* Login card */}
          <div className="backdrop-blur-xl bg-light-bg-primary/90 dark:bg-dark-bg-primary/90 border border-light-border-primary/30 dark:border-dark-border-primary/30 rounded-3xl shadow-2xl p-8 relative overflow-hidden animate-in zoom-in-95 fade-in duration-500">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                  Welcome Back
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Sign in to access the emergency management system
                </p>
              </div>

              {/* Demo notice */}
              <div className="backdrop-blur-sm bg-amber-500/10 border border-amber-400/30 rounded-2xl p-4 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-orange-400/5"></div>
                <div className="relative flex items-start space-x-3">
                  <div className="bg-amber-400/20 p-2 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">Demo Access Available</h3>
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      Click "Demo Login" to explore the platform with sample emergency data.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-light-bg-secondary/50 dark:bg-dark-bg-secondary/50 backdrop-blur-sm border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-xl text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-crisis-400/50 focus:border-crisis-400/50 transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-xl pointer-events-none"></div>
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 bg-light-bg-secondary/50 dark:bg-dark-bg-secondary/50 backdrop-blur-sm border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-xl text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-crisis-400/50 focus:border-crisis-400/50 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-xl pointer-events-none"></div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  {/* Demo Login Button */}
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={loading}
                    className="w-full relative group overflow-hidden rounded-xl p-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-2 text-white font-semibold">
                      <Zap className="h-5 w-5" />
                      <span>{loading ? 'Accessing Demo...' : 'Demo Login'}</span>
                    </div>
                  </button>
                  
                  {/* Regular Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative group overflow-hidden rounded-xl p-3 bg-gradient-to-r from-crisis-500 to-crisis-600 hover:from-crisis-400 hover:to-crisis-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-2 text-white font-semibold">
                      <Shield className="h-5 w-5" />
                      <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                    </div>
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
                  Authorized personnel only. All access is monitored and logged.
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>System Status: Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertOpen}
        onClose={closeAlert}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
};