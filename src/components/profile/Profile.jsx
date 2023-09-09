import {
  AppstoreOutlined,
  DislikeOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostService } from "../../services/PostService";
import PostCard from "../postCard/PostCard";
import {
  changePostFailure,
  changePostStart,
  changePostSuccess,
} from "../../store/slice/postSlice";

const Profile = () => {
  const { authSlice, postSlice } = useSelector((state) => state);
  const { user } = authSlice;
  const [myPosts, setMyPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [tempId, setTempId] = useState(null);
  const image_rf = useRef();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const getPostId = (id) => {
    setTempId(id);
    setOpen(true);
    let updatedPost = myPosts.find((item) => item._id === id);
    form.setFieldsValue({
      title: updatedPost.title,
      content: updatedPost.content,
    });
    setUrl(updatedPost.image.url);
  };

  const handleUpdate = async ({ title, content }) => {
    dispatch(changePostStart());
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image_rf.current.files[0])
      formData.append("image", image_rf.current.files[0]);
    try {
      const token = localStorage.getItem("token");
      const data = await PostService.updPost(tempId, token, formData);
      message.success(data.message);
      setOpen(false);
      dispatch(changePostSuccess());
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(changePostFailure());
    }
  };

  const getUserPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await PostService.myPosts(token);
      setMyPosts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const countLikes = () => {
    let likes = 0;
    myPosts.forEach((post) => {
      likes += post.like.length;
    });
    return likes;
  };
  const countDislike = () => {
    let dislike = 0;
    myPosts.forEach((post) => {
      dislike += post.dislike.length;
    });
    return dislike;
  };

  useEffect(() => {
    getUserPosts();
  }, [postSlice.isChange]);
  return (
    user && (
      <div className="profile">
        {user.avatar ? (
          <Avatar src={user.avatar} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
        <h4>
          {user.name} {user.surname}
        </h4>
        <p>{user.email}</p>
        <div className="count">
          <Row>
            <Col>
              <AppstoreOutlined />
              {myPosts.length}
            </Col>
            <Col>
              <LikeOutlined />
              {countLikes()}
            </Col>
            <Col>
              <DislikeOutlined />
              {countDislike()}
            </Col>
          </Row>
        </div>
        <Divider>Own posts</Divider>

        <Row gutter={24}>
          {myPosts.map((item, index) => {
            return (
              <PostCard
                getPostId={getPostId}
                key={index}
                post={item}
                page="profile"
              />
            );
          })}
        </Row>

        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          title="Postni o'zgartirish"
          footer={false}
        >
          <Form form={form} onFinish={handleUpdate}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Sarlavhani kiriting" }]}
            >
              <Input placeholder="Postning sarlavhasi" />
            </Form.Item>
            <Form.Item
              name="content"
              rules={[{ required: true, message: "malumot kiriting" }]}
            >
              <Input placeholder="Post haqida batafsil malumot" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "malumot kiriting" }]}
            >
              <label htmlFor="my-img">
                <img src={url} alt="img" />
              </label>
              <input
                id="my-img"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                ref={image_rf}
              />
            </Form.Item>
            <Button loading={postSlice.isLoading} htmlType="submit">
              Saqlash
            </Button>
          </Form>
        </Modal>
      </div>
    )
  );
};

export default Profile;
