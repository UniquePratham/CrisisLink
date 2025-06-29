import { useState, useEffect, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncDataOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useAsyncData<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
  options: UseAsyncDataOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await asyncFunction();
      setState({ data: result, loading: false, error: null });
      onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      onError?.(errorMessage);
      throw err;
    }
  }, dependencies);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
    refetch: execute,
  };
}

// Hook for paginated data
interface PaginatedData<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface UsePaginatedDataOptions {
  pageSize?: number;
  initialPage?: number;
}

export function usePaginatedData<T>(
  fetchFunction: (page: number, pageSize: number) => Promise<PaginatedData<T>>,
  options: UsePaginatedDataOptions = {}
) {
  const { pageSize = 10, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const {
    data,
    loading,
    error,
    execute,
    reset
  } = useAsyncData(
    () => fetchFunction(currentPage, pageSize),
    [currentPage, pageSize]
  );

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    if (data?.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [data?.hasNextPage]);

  const previousPage = useCallback(() => {
    if (data?.hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [data?.hasPreviousPage]);

  const refresh = useCallback(() => {
    execute();
  }, [execute]);

  return {
    data: data?.items || [],
    totalCount: data?.totalCount || 0,
    currentPage: data?.currentPage || currentPage,
    totalPages: data?.totalPages || 0,
    hasNextPage: data?.hasNextPage || false,
    hasPreviousPage: data?.hasPreviousPage || false,
    loading,
    error,
    goToPage,
    nextPage,
    previousPage,
    refresh,
    reset,
  };
}

// Hook for real-time data with polling
interface UsePollingDataOptions<T> extends UseAsyncDataOptions {
  interval?: number;
  enabled?: boolean;
}

export function usePollingData<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
  options: UsePollingDataOptions<T> = {}
) {
  const { interval = 5000, enabled = true, ...asyncOptions } = options;
  
  const asyncData = useAsyncData(asyncFunction, dependencies, {
    ...asyncOptions,
    immediate: enabled,
  });

  useEffect(() => {
    if (!enabled || !interval) return;

    const intervalId = setInterval(() => {
      if (!asyncData.loading) {
        asyncData.execute();
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [enabled, interval, asyncData.loading, asyncData.execute]);

  return asyncData;
}

// Hook for debounced async operations
export function useDebouncedAsyncData<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
  delay: number = 300,
  options: UseAsyncDataOptions = {}
) {
  const [debouncedDeps, setDebouncedDeps] = useState(dependencies);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedDeps(dependencies);
    }, delay);

    return () => clearTimeout(timer);
  }, [dependencies, delay]);

  return useAsyncData(asyncFunction, debouncedDeps, options);
}

// Hook for caching async data
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function useCachedAsyncData<T>(
  key: string,
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
  cacheTime: number = 5 * 60 * 1000, // 5 minutes default
  options: UseAsyncDataOptions = {}
) {
  const getCachedData = useCallback((): T | null => {
    const entry = cache.get(key);
    if (entry && Date.now() < entry.expiry) {
      return entry.data;
    }
    return null;
  }, [key]);

  const setCachedData = useCallback((data: T) => {
    cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + cacheTime,
    });
  }, [key, cacheTime]);

  const wrappedAsyncFunction = useCallback(async () => {
    const cached = getCachedData();
    if (cached !== null) {
      return cached;
    }
    
    const result = await asyncFunction();
    setCachedData(result);
    return result;
  }, [asyncFunction, getCachedData, setCachedData]);

  return useAsyncData(wrappedAsyncFunction, dependencies, options);
}

// Hook for optimistic updates
export function useOptimisticUpdate<T>(
  data: T | null,
  updateFunction: (optimisticData: T) => Promise<T>
) {
  const [optimisticData, setOptimisticData] = useState<T | null>(data);
  const [isOptimistic, setIsOptimistic] = useState(false);

  useEffect(() => {
    if (!isOptimistic) {
      setOptimisticData(data);
    }
  }, [data, isOptimistic]);

  const performOptimisticUpdate = useCallback(async (newData: T) => {
    setOptimisticData(newData);
    setIsOptimistic(true);

    try {
      const result = await updateFunction(newData);
      setOptimisticData(result);
      setIsOptimistic(false);
      return result;
    } catch (error) {
      setOptimisticData(data);
      setIsOptimistic(false);
      throw error;
    }
  }, [data, updateFunction]);

  return {
    data: optimisticData,
    isOptimistic,
    performOptimisticUpdate,
  };
}