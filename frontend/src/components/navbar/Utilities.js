import { API_URL } from "../../constants";

export const handleLogoutClick = (accessToken) => {
  fetch(`${API_URL}/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: accessToken,
    },
  });
};
