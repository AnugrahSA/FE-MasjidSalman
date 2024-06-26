import Axios from "axios";

// Akses VUE_APP_BACKEND_URL dari .env, dengan fallback ke URL default jika tidak ditemukan
const axios = Axios.create({
  baseURL:
    process.env.VUE_APP_BACKEND_URL ?? "https://salimapi.admfirst.my.id/",
  timeout: 60000,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
  },
});

export default axios;
