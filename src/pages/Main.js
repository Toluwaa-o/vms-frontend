import { useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import { Outlet, useNavigate } from "react-router-dom";
import instance from "../components/Axios/Config";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../stores/UserSlice";
import Navbar from "../components/Header/Navbar";

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      instance({
        url: "/users/show-current-user",
        method: "get",
      })
        .then((res) => {
          dispatch(UserActions.getUser(res.data.user));
        })
        .catch(() => {
          console.log("not logged in");
          return navigate("/login");
        });
    }
  }, []);

  return (
    <div className="main">
      <header>
        <Dashboard />
      </header>

    {user.userType === 'civilian' && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
