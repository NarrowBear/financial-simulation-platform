import { useState, useEffect, useCallback } from 'react';
import { ApiService } from '@/lib/api';

// 通用API状态接口
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 通用API Hook
export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.message || 'An error occurred',
      });
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  return { ...state, refetch };
}

// 认证相关Hooks
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      ApiService.getCurrentUser()
        .then(user => {
          setUser(user);
        })
        .catch(() => {
          localStorage.removeItem('authToken');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await ApiService.login({ email, password });
      localStorage.setItem('authToken', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const response = await ApiService.register({ email, password, firstName, lastName });
      localStorage.setItem('authToken', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await ApiService.logout();
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}

// 市场数据Hook
export function useMarketData() {
  return useApi(() => ApiService.getMarketData());
}

export function useStockQuote(symbol: string) {
  return useApi(() => ApiService.getStockQuote(symbol), [symbol]);
}

export function useStockSearch(query: string) {
  return useApi(
    () => query ? ApiService.searchStocks(query) : Promise.resolve([]),
    [query]
  );
}

// 投资组合Hook
export function usePortfolios() {
  return useApi(() => ApiService.getPortfolios());
}

export function usePortfolio(id: string) {
  return useApi(() => ApiService.getPortfolio(id), [id]);
}

// 订单Hook
export function useOrders() {
  return useApi(() => ApiService.getOrders());
}

// 新闻Hook
export function useNews(symbol?: string) {
  return useApi(() => ApiService.getNews(symbol), [symbol]);
}

// 图表数据Hook
export function useChartData(symbol: string, period: string = '1d') {
  return useApi(() => ApiService.getChartData(symbol, period), [symbol, period]);
}

// 通用Mutation Hook
export function useMutation<T, P = any>(
  mutationFn: (params: P) => Promise<T>
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(async (params: P) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await mutationFn(params);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error: any) {
      setState({
        data: null,
        loading: false,
        error: error.message || 'An error occurred',
      });
      throw error;
    }
  }, [mutationFn]);

  return { ...state, mutate };
}
