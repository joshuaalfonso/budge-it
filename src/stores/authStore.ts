// import type { AuthUser } from "@/types/auth.types";
// import { create } from "zustand";

// interface AuthState {
//     user: AuthUser | null;
//     isLoading: boolean;
//     setUser: (user: AuthUser | null) => void;
//     setIsLoading: (isLoading: boolean) => void;
//     clearUser: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//     user: null,
//     isLoading: false,
//     setUser: (user) => set({ user }),
//     setIsLoading: (isLoading: boolean) => set({ isLoading }),

//     clearUser: () => set({ user: null }),

//     checkAuth: async () => {
//         try {
//             const response = await api.get<User>("/auth/me");

//             set({
//                 user: response.data,
//             });
//         } catch {
//             set({
//                 user: null,
//             });
//         } finally {
//             set({
//                 isLoading: false,
//             });
//         }
// },


// }));