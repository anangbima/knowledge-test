import axios from "axios";

const axiosAuth = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// mengecek apakah axios error
axiosAuth.interceptors.response.use(
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

export default axiosAuth;