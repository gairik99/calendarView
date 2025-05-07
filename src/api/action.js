import axios from "axios";
const API_URL = "https://calendarviewbackend.onrender.com/api/v1"; // Replace with your actual API URL

export const getSchedule = async () => {
  const response = await axios.get(`${API_URL}/schedule`);
  return response.data;
};
