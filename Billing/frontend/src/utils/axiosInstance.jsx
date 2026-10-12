import axios from "axios";

const axiosInstance = new axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
