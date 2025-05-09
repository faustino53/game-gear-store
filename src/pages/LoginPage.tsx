
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, signup, requestOtp, verifyOtp } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  
  // OTP verification after signup
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPassword);
    if (success) {
      navigate('/');
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    const success = await signup(signupName, signupEmail, signupPassword);
    if (success) {
      // After successful signup, request OTP
      const otpSuccess = await requestOtp(signupEmail);
      if (otpSuccess) {
        setOtpEmail(signupEmail);
        setShowOtpVerification(true);
      }
    }
  };
  
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpCode) {
      toast.error('Please enter the OTP');
      return;
    }
    
    const success = await verifyOtp(otpEmail, otpCode);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Welcome Back</h1>
      
      {showOtpVerification ? (
        <div className="bg-gaming-gray rounded-lg p-6">
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-6">
              <Label htmlFor="otp-code" className="text-gaming-light">Enter OTP</Label>
              <p className="text-sm text-gaming-light mb-4">
                A one-time password has been sent to {otpEmail}
              </p>
              <Input
                id="otp-code"
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                className="bg-gaming-dark border-gaming-dark text-white mt-1 text-center text-xl tracking-widest"
                maxLength={6}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gaming-blue hover:bg-blue-600 text-white">
              Verify OTP
            </Button>
          </form>
        </div>
      ) : (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="login" className="data-[state=active]:bg-gaming-blue data-[state=active]:text-white">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-gaming-blue data-[state=active]:text-white">
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          {/* Login Tab */}
          <TabsContent value="login">
            <div className="bg-gaming-gray rounded-lg p-6">
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <Label htmlFor="login-email" className="text-gaming-light">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="login-password" className="text-gaming-light">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="w-4 h-4 rounded bg-gaming-dark border-gaming-dark text-gaming-blue"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-sm text-gaming-light">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-gaming-blue hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-full bg-gaming-blue hover:bg-blue-600 text-white">
                  Login
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gaming-light">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setActiveTab('signup')}
                    className="text-gaming-blue hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <div className="bg-gaming-gray rounded-lg p-6">
              <form onSubmit={handleSignup}>
                <div className="mb-4">
                  <Label htmlFor="signup-name" className="text-gaming-light">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="signup-email" className="text-gaming-light">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="signup-password" className="text-gaming-light">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label htmlFor="signup-confirm-password" className="text-gaming-light">Confirm Password</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    value={signupConfirmPassword}
                    onChange={e => setSignupConfirmPassword(e.target.value)}
                    className="bg-gaming-dark border-gaming-dark text-white mt-1"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gaming-blue hover:bg-blue-600 text-white">
                  Sign Up
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gaming-light">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setActiveTab('login')}
                    className="text-gaming-blue hover:underline"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default LoginPage;
