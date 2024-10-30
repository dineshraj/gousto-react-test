import { useState, useEffect } from "react";

const useFetchData = (url: string) => {
  const [data, setData] = useState([]);

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {         
        throw new Error('Error fetching data')
      }
      const json = await response.json();
      setData(json.data);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [])

  return data;
}

export default useFetchData;