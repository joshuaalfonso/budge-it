import { GoogleLogin } from "@react-oauth/google";
import { verifyGoogleCredential } from "../api/auth";
import { useNavigate } from "react-router-dom";

// interface GoogleJwtPayload {
//     googleId?: string;
//     name?: string;
//     email?: string;
//     picture?: string;
// }

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="h-dvh grid place-items-center">
            <GoogleLogin
                onSuccess={async (response) => {
                    if (!response.credential) {
                        return;
                    }

                    try {
                        const result = await verifyGoogleCredential(response.credential);
                        console.log(result);
                        navigate("/dashboard");
                    } catch (error) {
                        console.error(error);
                    }
                }}
                onError={() => console.log("error")}
            />
        </div>
    );
};

export default Home;
