import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { useEffect } from "react";
import { User } from "../feature/user/userSlice";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const CheckIsAuthenticated = (
  setIsAuthenticated: (isAuthenticated: boolean) => void
) => {
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user == null) {
      setIsAuthenticated(false);
    }
  }, [user]);
};
