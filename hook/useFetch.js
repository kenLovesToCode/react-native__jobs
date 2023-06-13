import { useState, useEffect } from "react";
import axios from "axios";

import searchReactDeveloper from "../mock/search-react-developer.json";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // const options = {
  //   method: "GET",
  //   url: `${process.env.API}/api/jobs/${endpoint}`,
  //   headers: {
  //     "X-RapidAPI-Key": "",
  //     "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  //   },
  //   params: {
  //     ...query,
  //   },
  // };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let response = searchReactDeveloper.data;

      if (endpoint === "search-by-id") {
        response = new Array(response.find((r) => r.job_id === query.job_id));
      }

      setData(response);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
