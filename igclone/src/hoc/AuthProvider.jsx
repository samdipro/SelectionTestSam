import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    fetch();
    console.log(userSelector);
  }, []);

  async function fetch() {
    const token = localStorage.getItem("token");
    try {
      const user = await api.get("/user/gbt", {
        params: {
          token: token,
        },
      });

      console.log(user);

      if (user?.data.email) {
        dispatch({
          type: "login",
          payload: user.data,
        });
      }
    } catch (err) {
      // alert("session has expired");
      console.log(err);
    }
  }

  return children;
}
