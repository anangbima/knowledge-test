import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// mengecek apakah axios error
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
    } catch (e) {
        console.error(e); //terdapat masalah pada akses axiosnya
    }

    throw error;
  }
);

export default axiosClient;