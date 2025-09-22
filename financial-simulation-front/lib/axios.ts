import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 创建axios实例
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 添加认证token
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // 添加请求时间戳
      config.metadata = { startTime: new Date() };
      
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const duration = response.config.metadata?.startTime 
        ? new Date().getTime() - response.config.metadata.startTime.getTime()
        : 0;
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
      return response;
    },
    (error: AxiosError) => {
      const duration = error.config?.metadata?.startTime 
        ? new Date().getTime() - error.config.metadata.startTime.getTime()
        : 0;
      
      console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} (${duration}ms)`, error.response?.data);
      
      // 处理不同的错误状态码
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 未授权，清除token并跳转到登录页
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            break;
          case 403:
            console.error('权限不足');
            break;
          case 404:
            console.error('请求的资源不存在');
            break;
          case 500:
            console.error('服务器内部错误');
            break;
          default:
            console.error('请求失败');
        }
      } else if (error.request) {
        console.error('网络错误，请检查网络连接');
      } else {
        console.error('请求配置错误');
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

// 创建默认实例
const api = createAxiosInstance();

// 扩展AxiosRequestConfig类型
declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}

// 封装常用的HTTP方法
export const http = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    api.get(url, config).then(response => response.data),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    api.post(url, data, config).then(response => response.data),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    api.put(url, data, config).then(response => response.data),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    api.patch(url, data, config).then(response => response.data),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    api.delete(url, config).then(response => response.data),
};

// 导出axios实例，用于需要更复杂配置的场景
export { api };
export default http;
