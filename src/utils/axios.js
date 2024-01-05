import axios from 'axios';

const apiUrl= import.meta.env.VITE_APIURL;

export const axiosOpen= axios.create({
    baseURL:apiUrl,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
})

export const axiosSecure=axios.create({
    baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
}) 