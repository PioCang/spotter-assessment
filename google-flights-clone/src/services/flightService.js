import axios from 'axios';

// Add your RapidAPI Key here
const RAPIDAPI_KEY = `${process.env.REACT_APP_RAPIDAPI_APIKEY}`;
const RAPIDAPI_HOST = 'sky-scrapper.p.rapidapi.com';

// Create an Axios instance to manage API requests
const axiosInstance = axios.create({
  baseURL: `https://${RAPIDAPI_HOST}`,
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': RAPIDAPI_HOST
  }
});

// Function to fetch flights based on parameters
export const searchFlights = async (query_params) => {
  const url = `/api/v2/flights/searchFlightsWebComplete`;
  const params = new URLSearchParams(query_params);
  console.log(query_params);

  try {
    const response = await axiosInstance.get(`${url}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flight data", error);
    throw error;
  }
};

export const searchAirports = async (input) => {
    const url = `/api/v1/flights/searchAirport`;
    const params = new URLSearchParams({
      query: input,
      locale: "en-US",
    });

    try {
      const response = await axiosInstance.get(`${url}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching airport data", error);
      throw error;
    }
};