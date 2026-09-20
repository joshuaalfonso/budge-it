

import { me } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: me,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};