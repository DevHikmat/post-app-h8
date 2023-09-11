import { Button, Divider, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useDispatch } from "react-redux";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../../store/slice/authSlice";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";
import { setAxiosInstanceToken } from "../../services/axiosInstance";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (user) => {
    dispatch(registerStart());
    try {
      const data = await AuthService.register(user);
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      dispatch(registerSuccess(data.user));
      localStorage.setItem("user", JSON.stringify(data.user));
      setAxiosInstanceToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.warn(error.response.data.message);
      dispatch(registerFailure());
    }
  };
  return (
    <div className="register">
      <div className="register-content">
        <Form form={form} onFinish={handleRegister}>
          <h2>Post App</h2>
          <p>Sign up to see photos and videos from your friends.</p>
          <Divider>OR</Divider>
          <Form.Item name="name">
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item name="surname">
            <Input placeholder="surname" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="password" />
          </Form.Item>
          <Button htmlType="submit">Register</Button>
        </Form>
        <p>
          Have an account?
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
