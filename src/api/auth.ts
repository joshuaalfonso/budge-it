import type { AuthUser } from "@/types/auth.types";
import { api } from "./axios";


export const verifyGoogleCredential = async (code: string) => {

    const response = await api.post<{user: AuthUser}>("/auth/google", {
        code,
    });

    return response.data;
}

export const logout = async () => {

    const response = await api.post<{success: true}>("/auth/logout");

    return response.data

}


export const me = async () => {
    const response = await api.get<AuthUser>("/auth/me");

    return response.data;
}

