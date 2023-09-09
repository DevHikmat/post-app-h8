import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Row, Skeleton, Col, Popconfirm } from "antd";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFailure,
  getAllStart,
  getAllSuccess,
} from "../../store/slice/postSlice";
import { PostService } from "../../services/PostService";
import PostCard from "../../components/postCard/PostCard";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddPost from "../../components/addPost/AddPost";
import Profile from "../../components/profile/Profile";
import { items } from "./items";
const { Header, Sider, Content } = Layout;

const Home = () => {
  const { authSlice, postSlice } = useSelector((state) => state);
  const { user } = authSlice;
  const { isChange } = postSlice;
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const [postList, setPostList] = useState(null);
  const [userInfo, setUserInfo] = useState({ posts: 0, like: 0, dislike: 0 });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAllPost = async () => {
    dispatch(getAllStart());
    try {
      const data = await PostService.getAll();
      setPostList(data);
      dispatch(getAllSuccess());
      let posts = 0;
      let like = 0;
      let dislike = 0;
      data.forEach((item) => {
        if (item.authorId === user?._id) {
          posts += 1;
          like += item.like.length;
          dislike += item.dislike.length;
        }
      });
      setUserInfo({ posts, like, dislike });
    } catch (error) {
      console.log(error);
      dispatch(getAllFailure());
    }
  };

  useEffect(() => {
    handleAllPost();
  }, [user, isChange]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h3 style={collapsed ? { fontSize: "12px" } : {}}>Post App</h3>
        </div>
        {user && (
          <Link to="/profile">
            <div className="author">
              <div className="author-img">
                <img
                  src={
                    user.avatar
                      ? user.avatar
                      : "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                  }
                  alt="author img"
                />
              </div>
              {!collapsed && (
                <div className="author-title">
                  <h5>
                    {user.name} {user.surname}
                  </h5>
                  <p>{user.email}</p>
                </div>
              )}
              <div
                className="author-info"
                style={
                  collapsed
                    ? { flexDirection: "column" }
                    : { flexDirection: "row" }
                }
              >
                <div>
                  <h6>{userInfo.posts}</h6>
                  <p>Posts</p>
                </div>
                <div>
                  <h6>{userInfo.like}</h6>
                  <p>likes</p>
                </div>
                <div>
                  <h6>{userInfo.dislike}</h6>
                  <p>dislikes</p>
                </div>
              </div>
            </div>
          </Link>
        )}
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            ...items,
            {
              key: "8",
              icon: <UploadOutlined />,
              label: (
                <Popconfirm
                  onConfirm={handleLogout}
                  title="Are you sure logout?"
                  okText="logout"
                  cancelText="cancel"
                >
                  <Button type="" style={{ color: "red", padding: 0 }}>
                    Log out
                  </Button>
                </Popconfirm>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px 0 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Link to="/add-post">
            <Button icon={<PlusOutlined />}>Add Post</Button>
          </Link>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Row gutter={24}>
                  {postList ? (
                    postList.map((post, index) => {
                      return <PostCard key={index} post={post} />;
                    })
                  ) : (
                    <>
                      <Col span={8}>
                        <Skeleton active />
                      </Col>
                      <Col span={8}>
                        <Skeleton active />
                      </Col>
                      <Col span={8}>
                        <Skeleton active />
                      </Col>
                    </>
                  )}
                </Row>
              }
            />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
