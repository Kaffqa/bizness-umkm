export interface LocalUser {
  id: string;
  name: string;
  role: "admin" | "user";
}

export function useLocalAuth() {
  const raw = typeof window !== "undefined" ? localStorage.getItem("authUser") : null;
  const user: LocalUser | null = raw ? JSON.parse(raw) : null;

  return {
    user,
    isAuthenticated: !!user,
    isLoaded: true,
  };
}
