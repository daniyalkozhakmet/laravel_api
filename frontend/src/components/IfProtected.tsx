import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../feature/user/userFunctions";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
export function IfProtected({ children }: Props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("active") ? params.get("active") : "books";
  const token: string | false = getToken("token");
  if (token) {
    return <Navigate to={`/home?active=${activeTab}`} replace />;
  }
  return children;
}
