import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { FoodData } from '../interface/FoodData';

const API_URL = 'http://localhost:8080';

const fetchData = async (): Promise<AxiosResponse<FoodData[]>> => {
  try {
    const response = await axios.get(`${API_URL}/food`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch data'); // Trate erros de forma adequada
  }
}

export function useFoodData() {
  const query = useQuery('food-data', fetchData, {
    retry: 2
  });

  return {
    ...query,
    data: query.data?.data
  }
}