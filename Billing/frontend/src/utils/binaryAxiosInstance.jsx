import axios from "axios";

const binaryAxiosInstance = new axios.create({
  responseType: "arraybuffer",
  withCredentials: true,
});

export default binaryAxiosInstance;
