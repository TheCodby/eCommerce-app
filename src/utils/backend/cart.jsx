import axios from "axios";
import { API_LINK } from "../../constants/API";
import store from "../../store";

export const addToCart = async (productId, quantity) => {
  const storeState = store.getState();
  const token = storeState.auth.auth.token;
  try {
    const response = await axios.post(
      `${API_LINK}/cart`,
      {
        product_id: productId,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch {
    return [];
  }
};
export const removeProduct = async (productId) => {
  const storeState = store.getState();
  const token = storeState.auth.auth.token;
  try {
    const response = await axios.delete(`${API_LINK}/cart/${productId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch {
    return [];
  }
};
export const getCartItems = async () => {
  const storeState = store.getState();
  const token = storeState.auth.auth.token;
  try {
    const response = await axios.get(`${API_LINK}/cart`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch {
    return [];
  }
};
export const checkout = async () => {
  const storeState = store.getState();
  const token = storeState.auth.auth.token;
  try {
    const response = await axios.get(`${API_LINK}/cart/checkout`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch {
    return [];
  }
};
