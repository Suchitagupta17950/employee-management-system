export const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    return {
      username: payload.sub,
      role: payload.role,
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const getUserRole = () => {
  const user = getUserFromToken();

  return user?.role || null;
};