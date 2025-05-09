
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

type OtpInfo = {
  email: string;
  expiresAt: number;
  code: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  requestOtp: (email: string) => Promise<boolean>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
}

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gamegear.com',
    password: 'admin123',
    isAdmin: true,
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123',
    isAdmin: false,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [otpStore, setOtpStore] = useState<OtpInfo[]>([]);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    try {
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    try {
      // Check if user already exists
      const userExists = mockUsers.some((u) => u.email === email);
      if (userExists) {
        toast.error('User with this email already exists');
        return false;
      }

      // In a real app, you would create the user in your database
      toast.success('Account created successfully! Please log in.');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred during signup');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('You have been logged out');
  };

  const requestOtp = async (email: string): Promise<boolean> => {
    try {
      // Check if the email exists in the system
      const userExists = mockUsers.some((u) => u.email === email);
      if (!userExists) {
        toast.error('No account found with this email');
        return false;
      }

      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Set expiry time to 10 minutes from now
      const expiresAt = Date.now() + 10 * 60 * 1000;
      
      // Store the OTP (in a real app, this would be in a database)
      const otpInfo = { email, code: otp, expiresAt };
      setOtpStore(prev => [...prev.filter(o => o.email !== email), otpInfo]);
      
      // In a real app, you would send this via email or SMS
      console.log(`OTP for ${email}: ${otp}`);
      
      toast.success('OTP sent to your email');
      return true;
    } catch (error) {
      console.error('OTP request error:', error);
      toast.error('Failed to send OTP');
      return false;
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    try {
      const storedOtp = otpStore.find(o => o.email === email);
      
      if (!storedOtp) {
        toast.error('No OTP requested for this email');
        return false;
      }
      
      if (Date.now() > storedOtp.expiresAt) {
        toast.error('OTP has expired. Please request a new one');
        return false;
      }
      
      if (storedOtp.code !== otp) {
        toast.error('Invalid OTP');
        return false;
      }
      
      // OTP is valid, find the user
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        // Remove the used OTP
        setOtpStore(prev => prev.filter(o => o.email !== email));
        
        toast.success('Login successful!');
        return true;
      } else {
        toast.error('User not found');
        return false;
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Failed to verify OTP');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, requestOtp, verifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
