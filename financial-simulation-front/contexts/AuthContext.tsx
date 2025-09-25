import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/lib/api/auth';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (account: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查本地存储的token
    const token = localStorage.getItem('authToken');
    if (token) {
      // 验证token有效性
      authApi.getCurrentUser()
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('authToken');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (account: string, password: string) => {
    try {
      const response = await authApi.login(account, password);
      const { token, user: userData } = response.data;
      localStorage.setItem('authToken', token);
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await authApi.register(userData);
      const { token, user: newUser } = response.data;
      localStorage.setItem('authToken', token);
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    authApi.logout().catch(() => {
      // 忽略登出API错误
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
