import { useState, useEffect } from "react";
// Adjust the import path as necessary

const useFetch = (fetchFn) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFn();
        // console.log(data.data[0].schedule)
        setSchedules(data.data[0].schedule);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFn]);

  return { schedules, loading, error };
};

export default useFetch;
