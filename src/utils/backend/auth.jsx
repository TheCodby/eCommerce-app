import axios from "axios";
import { API_LINK } from "../../constants/API";
import store from "../../store";
import { login as doLogin } from "../../reducers/auth";

export const signup = async (inputs) => {
  try {
    const response = await axios.post(
      `${API_LINK}/auth/signup`,
      {
        first_name: inputs.first_name.value,
        last_name: inputs.last_name.value,
        email: inputs.email.value,
        password: inputs.password.value,
      },
      { skipAuthRefresh: true }
    );
    return response.data;
  } catch (e) {
    return e;
  }
};

export const login = async (inputs) => {
  try {
    const response = await axios(
      {
        method: "post",
        url: `${API_LINK}/auth/login`,
        timeout: 10000,
        data: { email: inputs.email.value, password: inputs.password.value },
      },
      { skipAuthRefresh: true }
    );
    return response.data;
  } catch (error) {
    return error?.response?.data || error?.message;
  }
};
export const refreshToken = async () => {
  const storeState = store.getState();
  const refresh_token = storeState.auth.auth.refresh_token;
  try {
    const response = await axios.post(
      `${API_LINK}/auth/generate-token`,
      {
        refresh_token: refresh_token,
      },
      { skipAuthRefresh: true }
    );
    store.dispatch(
      doLogin({
        auth: { refresh_token: refresh_token, token: response.data.token },
      })
    );
  } catch {
    return false;
  }
};
