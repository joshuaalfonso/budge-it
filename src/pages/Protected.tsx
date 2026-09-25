import { Navigate, useLocation } from "react-router-dom";
import { useMe } from "@/queries/auth.queries";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

interface ProtectedProps {
  children: React.ReactNode;
}

export const Protected = ({ children }: ProtectedProps) => {
    const { data: user, isLoading } = useMe();
    const location = useLocation();

    if (isLoading) {
        return (
            <LoadingSpinner />
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