import { useEffect, useState } from 'react';

interface FetchedData<T> {
  data: T | null;
  refetch: () => void;
  isLoading: boolean;
  error: string;
}

export const BASE_URL = 'http://localhost:8000';

const useFetch = <T>(url: string): FetchedData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${url}`);
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const postsData = await response.json();
      setData(postsData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetch;
