import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
  children,
  guestOnly = false,
  needLogin = false,
}) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();

  console.log(userSelector);
  console.log(needLogin);

  useEffect(() => {
    if (guestOnly && userSelector?.email) {
      return nav("/home");
    } else if (needLogin && !userSelector?.email) {
      return nav("/login");
    }
  }, [userSelector]);

  return <>{children}</>;
}
