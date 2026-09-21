import type { AuthUser } from "@/types/auth.types";
import { api } from "./axios";


export const verifyGoogleCredential = async (credential: string) => {

    const response = await api.post<AuthUser>("/auth/google", {
        credential,
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

