import { Navigate } from "react-router-dom";
import type { User } from "../feature/user/userSlice";
import { getToken } from "../feature/user/userFunctions";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
export function Protected({ children }: Props) {
  const token: string | false = getToken("token");
  if (!token) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
