import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from "../services/auth.service";
import { sessionState } from "../store/appState";

export const useInterceptor = () => {
    const navigate = useNavigate();
    const sessionStore = useStore(sessionState);

    axios.interceptors.response.use(
        response => response,
        error => {
          const status = error.response ? error.response.status : null;
          if (status === 401 || status === 403) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(USER_ID_KEY);
            sessionStore.updateUser(undefined);
            navigate("/");
          }
          return Promise.reject(error);
        }
      );
}
