import { api } from "./axios";


export const verifyGoogleCredential = async (credential: string) => {

    const response = await api.post("/auth/google", {
        credential,
    });

    return response.data;
}


export const me = async () => {
    const response = await api.get("/auth/me");

    return response.data;
}