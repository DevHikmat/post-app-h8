import {
  CommentOutlined,
  DeleteOutlined,
  DislikeFilled,
  DislikeOutlined,
  EditOutlined,
  EyeOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Popconfirm, message } from "antd";
import React from "react";
import PostImageChecker from "./PostImageChecker";
import "./PostCard.scss";
import { Link } from "react-router-dom";
import { PostService } from "../../services/PostService";
import { useDispatch, useSelector } from "react-redux";
import {
  changePostFailure,
  changePostStart,
  changePostSuccess,
} from "../../store/slice/postSlice";
import { ReactionService } from "../../services/ReactionService";

const PostCard = ({ post, page = "home", getPostId }) => {
  const { user } = useSelector((state) => state.authSlice);
  const { _id, image, author, title, content, like, views, dislike, comments } =
    post;
  const { url } = image;
  const { name, surname } = author[0];
  const dispatch = useDispatch();

  const handleDeletePost = async (id) => {
    dispatch(changePostStart());
    try {
      const token = localStorage.getItem("token");
      const data = await PostService.deletePost(id, token);
      message.success(data.message);
      dispatch(changePostSuccess());
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(changePostFailure());
    }
  };

  const handleLike = async (id) => {
    dispatch(changePostStart());
    try {
      const token = localStorage.getItem("token");
      const data = await ReactionService.getLike(id, token);
      message.success(data.message);
      dispatch(changePostSuccess());
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(changePostFailure());
    }
  };

  const handleDislike = async (id) => {
    dispatch(changePostStart());
    try {
      const token = localStorage.getItem("token");
      const data = await ReactionService.getDislike(id, token);
      message.success(data.message);
      dispatch(changePostSuccess());
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(changePostFailure());
    }
  };

  return (
    <Col xs={24} sm={24} md={12} lg={8}>
      <div className="post-card">
        <Card
          hoverable
          cover={
            <Link to={`/post/${_id}`}>
              <PostImageChecker url={url} />
            </Link>
          }
        >
          <div className="author">
            <UserOutlined /> {name} {surname}
          </div>
          <div className="body">
            <h3>{title}</h3>
            <p>{content}</p>
          </div>
          <div className="footer">
            <span
              style={
                post.like.find((id) => id === user?._id) && { color: "red" }
              }
              onClick={() => handleLike(_id)}
            >
              <LikeOutlined /> {like.length}
            </span>
            <span onClick={() => handleDislike(_id)}>
              {post.dislike.find((id) => id === user?._id) ? (
                <DislikeFilled />
              ) : (
                <DislikeOutlined />
              )}
              {dislike.length}
            </span>
            <span>
              <CommentOutlined /> {comments.length}
            </span>
            <span>
              <EyeOutlined /> {views}
            </span>
            {page === "profile" && (
              <>
                <span>
                  <Popconfirm
                    title="O'chirishni tasdiqlang."
                    okText="ha"
                    cancelText="yo'q"
                    okType="danger"
                    onConfirm={() => handleDeletePost(_id)}
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </span>
                <span>
                  <Button
                    onClick={() => getPostId(_id)}
                    icon={<EditOutlined />}
                  />
                </span>
              </>
            )}
          </div>
        </Card>
      </div>
    </Col>
  );
};

export default PostCard;
