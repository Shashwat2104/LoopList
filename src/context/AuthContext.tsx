
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication for demo purposes
// In a real app, this would use a backend service
const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    createdAt: new Date(),
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem("loopListUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call/delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error("Invalid credentials");
    }
    
    // In a real app, we would verify the password here
    
    setUser(foundUser);
    localStorage.setItem("loopListUser", JSON.stringify(foundUser));
    setIsLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call/delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      throw new Error("User with this email already exists");
    }
    
    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email,
      name,
      createdAt: new Date(),
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem("loopListUser", JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loopListUser");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
