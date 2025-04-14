import { useSelector } from "react-redux";
import { RootState } from "@/api/store/store";

export const useAuth = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  return {
    isAuthenticated: !!user,
    user,
    isLoading,
  };
};

