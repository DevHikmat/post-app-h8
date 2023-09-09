import React from "react";
import "./Login.scss";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../store/slice/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const { isLoading } = useSelector((state) => state.authSlice);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    dispatch(loginStart());
    try {
      const data = await AuthService.login(user);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess(data.user));
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(loginFailure());
    }
  };
  return (
    <div className="login">
      <div className="login-content">
        <div className="left">
          <img
            src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/201902/instagram-dm-feature_660_021419093716.jpg"
            alt="login-img"
          />
        </div>
        <div className="right">
          <Form form={form} onFinish={handleLogin}>
            <h2>Post App</h2>
            <Form.Item name="email">
              <Input placeholder="email" />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password placeholder="password" />
            </Form.Item>
            <Button loading={isLoading} htmlType="submit">
              Log in
            </Button>
          </Form>
          <p>
            Don't have an account?
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
