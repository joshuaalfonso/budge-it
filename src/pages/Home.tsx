import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useState } from "react";

interface GoogleJwtPayload extends JwtPayload {
    name?: string;
    email?: string;
    picture?: string;
}

const Home = () => {
    const [user, setUser] = useState<GoogleJwtPayload>();

    return (
        <div className="h-dvh grid place-items-center">
            <GoogleLogin
                onSuccess={(response) => {
                    const decoded = jwtDecode<GoogleJwtPayload>(
                        response.credential ?? ""
                    );

                    setUser(decoded);
                }}
                onError={() => console.log("error")}
            />

            {user && (
                <>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    {user.picture && (
                        <img src={user.picture} alt={user.name ?? "User"} referrerPolicy="no-referrer" />
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
