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
  refreshUser: () => Promise<void>;
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
    const accessToken = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      // 可选：尝试获取当前用户信息，但无论成功与否，都认为已登录
      authApi.getCurrentUser()
        .then(response => {
          setUser(response.data);
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
      if (response.code === 200) {
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        console.log('login success', response.data);
        // 获取用户信息
        await refreshUser();
      }
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authApi.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      // 静默失败，仍然保持基于 token 的已登录状态
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
    localStorage.removeItem('refreshToken');
    setUser(null);
    authApi.logout().catch(() => {
      // 忽略登出API错误
    });
  };

  const value = {
    user,
    // 只要本地存在 access 与 refresh token 即认为已登录
    isAuthenticated: Boolean(
      typeof window !== 'undefined' &&
      localStorage.getItem('authToken') &&
      localStorage.getItem('refreshToken')
    ),
    isLoading,
    login,
    refreshUser,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
