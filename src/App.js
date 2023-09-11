import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useEffect, useState } from "react";
import { loginSuccess } from "./store/slice/authSlice";
import { useDispatch } from "react-redux";
import PostId from "./pages/postId/PostId";
import { PostService } from "./services/PostService";
import { setAxiosInstanceToken } from "./services/axiosInstance";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  const checkUser = async (token) => {
    try {
      await PostService.myPosts(token);
      dispatch(loginSuccess(JSON.parse(localStorage.getItem("user"))));
      setIsLogin(true);
      setAxiosInstanceToken(token);
      let path = window.location.pathname;
      if (path.includes("login") || path.includes("register")) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    checkUser(token);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        {!isLogin && <Route path="/login" element={<Login />} />}
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<PostId />} />
      </Routes>
    </>
  );
};

export default App;
