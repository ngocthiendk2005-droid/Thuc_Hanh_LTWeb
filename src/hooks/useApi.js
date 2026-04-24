import { useState, useCallback } from "react";

// Hook tiện ích: tự động quản lý loading / error / data khi gọi API
export function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunc(...args);
        setData(result);
        return result;
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || "Đã xảy ra lỗi.";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc],
  );

  return { data, loading, error, execute };
}
