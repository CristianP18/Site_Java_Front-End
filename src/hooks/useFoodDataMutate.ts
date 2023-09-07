import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query"; // Import useQueryClient
import { FoodData } from '../interface/FoodData';

const API_URL = 'http://localhost:8080';

const postData = async (data: FoodData): Promise<AxiosResponse<any, any>> => {
  try {
    const response = await axios.post(`${API_URL}/food`, data); // Pass the data object to the post request
    return response;
  } catch (error) {
    throw new Error('Failed to fetch data'); // Handle errors appropriately
  }
}

export function useFoodDataMutate() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation((data: FoodData) => postData(data), {
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries('food-data'); // Removed square brackets from the query key
    }
  });

  return mutation; // Return the mutation object, not `mutate`
}