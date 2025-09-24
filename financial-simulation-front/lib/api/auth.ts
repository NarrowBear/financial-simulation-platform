import axios from '../axios';

// 认证相关API
export const authApi = {
  // 用户登录
  login: (account: string, password: string) => 
    axios.post('/auth/login', { account, password }),
  
  // 用户注册
  register: (payload: any) => 
    axios.post('/auth/register', payload),
  
  // 获取当前用户信息
  getCurrentUser: () => axios.get('/auth/me'),
  
  // 刷新token
  refreshToken: () => axios.post('/auth/refresh'),
  
  // 登出
  logout: () => axios.post('/auth/logout'),
  
  // 忘记密码
  forgotPassword: (email: string) => 
    axios.post('/auth/forgot-password', { email }),
  
  // 重置密码
  resetPassword: (token: string, newPassword: string) => 
    axios.post('/auth/reset-password', { token, newPassword }),
};
