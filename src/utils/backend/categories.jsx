import axios from "axios";
import { API_LINK } from "../../constants/API";
import store from "../../store";
export const getCategories = async () => {
  const storeState = store.getState();
  const token = storeState.auth.auth.token;
  try {
    const response = await axios.get(`${API_LINK}/category`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch {
    return [];
  }
};
