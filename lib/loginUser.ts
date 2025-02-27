import setTokenInCookies from "@/utils/setTokenInCookies";

const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 60 * 24 * 30,
      }),
    });

    const data = await response.json();

    if (!response.ok)
      return { success: false, error: data.message || "Login failed!" };
    await setTokenInCookies(
      data.id,
      data.username,
      data.accessToken,
      data.refreshToken
    );
    return { success: true, data: data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Something went wrong!" };
    }
  }
};

export default loginUser;
