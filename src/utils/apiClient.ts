import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_STRAPI_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
    },
})

// apiClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// })