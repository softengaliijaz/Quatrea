import axios from "axios";

let store;
export const injectStore = (s) => {
  store = s;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store?.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing = null;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isAuthCall = original?.url?.includes("/auth/");
    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !isAuthCall &&
      store?.getState().auth.accessToken
    ) {
      original._retry = true;
      try {
        refreshing =
          refreshing ||
          api.post("/auth/refresh").finally(() => {
            refreshing = null;
          });
        const { data } = await refreshing;
        store.dispatch({
          type: "auth/tokenRefreshed",
          payload: data.accessToken,
        });
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (e) {
        store.dispatch({ type: "auth/sessionExpired" });
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

export const errorMessage = (e) =>
  e.response?.data?.message || e.message || "Something went wrong";
export default api;
