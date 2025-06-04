import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor to include the access token in headers
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("cbaac_admin_2025_conference_access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      // Redirect to login if no access token is available
      window.location.href = "/admin";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get(
          "cbaac_admin_2025_conference_refresh_token"
        );

        if (!refreshToken) {
          console.error("No refresh token available");
          window.location.href = "/admin/login";
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/token/refresh/`,
          { refresh: refreshToken }
        );

        const { access } = response.data;
        Cookies.set("cbaac_admin_2025_conference_access_token", access, {
          expires: 1,
        });

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        window.location.href = "/admin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;



export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[date.getDay()];
    const options = { year: "numeric", month: "long", day: "numeric" };
    return `${day}, ${date.toLocaleDateString(undefined, options)}`;
  };