import { Navigate, useLocation } from "react-router-dom";
import { useMe } from "@/queries/auth.queries";

interface ProtectedProps {
  children: React.ReactNode;
}

export const Protected = ({ children }: ProtectedProps) => {
    const { data: user, isLoading } = useMe();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="grid h-dvh place-items-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/home"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
};