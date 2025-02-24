export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function createUser(
  userData: UserData
): Promise<UserResponse | null> {
  try {
    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data: UserResponse = await response.json();

    if (!response.ok) {
      console.error("❌ Error registering user:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("❌ Signup API Error:", error);
    return null;
  }
}
