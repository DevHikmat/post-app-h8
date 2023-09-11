import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { PostService } from "../../services/PostService";
import { Button, Col, Row, message } from "antd";
import PostImageChecker from "../../components/postCard/PostImageChecker";
import {
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  EyeOutlined,
  LikeOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { CommentService } from "../../services/CommentService";
import { useDispatch, useSelector } from "react-redux";
import "./PostId.scss";
import Loader from "../../components/loader/Loader";
import {
  changeComFailure,
  changeComStart,
  changeComSuccess,
} from "../../store/slice/comSlice";

const PostId = () => {
  const { authSlice, comSlice } = useSelector((state) => state);
  const [value, setValue] = useState("");
  const { user } = authSlice;
  const { isChange, isLoading } = comSlice;
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [tempId, setTempId] = useState(null);
  const [comments, setComments] = useState(null);
  const content = useRef();
  const editInput = useRef();
  const dispatch = useDispatch();

  const handleOnePost = async () => {
    try {
      const data = await PostService.getPostById(id);
      setPost(data[0]);
      setComments(data[0].comments.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async () => {
    dispatch(changeComStart());
    try {
      const comment = { postId: id, content: content.current.value };
      const data = await CommentService.addComment(comment);
      message.success(data.message);
      dispatch(changeComSuccess());
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(changeComFailure());
    }
    content.current.value = "";
  };

  const deleteComment = async (id) => {
    dispatch(changeComStart());
    try {
      const data = await CommentService.delComment(id);
      message.success(data.message);
      dispatch(changeComSuccess());
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(changeComFailure());
    }
  };

  const openInput = (id) => {
    setTempId(id);
    let editingComment = post.comments.find((item) => item._id === id);
    setValue(editingComment.content);
  };

  const updateComment = async () => {
    dispatch(changeComStart());
    try {
      const data = await CommentService.updComment(tempId, {
        content: value,
      });
      setTempId(null);
      message.success(data.message);
      dispatch(changeComSuccess());
    } catch (error) {
      message.error(error.response.data.message);
      dispatch(changeComFailure());
    }
  };

  useEffect(() => {
    handleOnePost();
  }, [id, isChange]);

  return (
    <div className="post-id">
      <div className="wrapper">
        {post ? (
          <Row>
            <Col span={16}>
              <div className="post-id-img">
                <PostImageChecker url={post.image.url} />
              </div>
              <div className="post-id-info">
                <div className="actions">
                  <span>
                    <LikeOutlined /> {post.like.length}
                  </span>
                  <span>
                    <DislikeOutlined /> {post.dislike.length}
                  </span>
                  <span>
                    <EyeOutlined /> {post.views}
                  </span>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="post-id-content">
                <div className="author">
                  <h3>
                    <UserOutlined />
                    {post.author[0].name} {post.author[0].surname}
                  </h3>
                </div>
                <div className="content">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </div>
                <div className="comment">
                  <div className="comment-add">
                    <input ref={content} placeholder="comment..." />
                    <Button
                      loading={isLoading}
                      onClick={submitComment}
                      icon={<SendOutlined />}
                    ></Button>
                  </div>
                  <ul className="comment-list">
                    {comments.map((com, index) => {
                      return (
                        <li key={index}>
                          <div className="comment-author">
                            <UserOutlined /> {com.author[0].name}{" "}
                            {com.author[0].surname}
                          </div>
                          <div className="comment-body">
                            {com._id === tempId ? (
                              <input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="comment..."
                              />
                            ) : (
                              <p>{com.content}</p>
                            )}
                          </div>
                          <div className="comment-footer">
                            <div className="comment-time">
                              <span>
                                {moment(com.createdAt).format(
                                  "DD/MM/YYYY, h:mm"
                                )}
                              </span>
                            </div>
                            <div className="comment-action">
                              {com.authorId === user?._id && (
                                <>
                                  <Button
                                    size="sm"
                                    danger
                                    onClick={() => deleteComment(com._id)}
                                    icon={<DeleteOutlined />}
                                  ></Button>
                                  {tempId === com._id ? (
                                    <Button onClick={updateComment} size="sm">
                                      save
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      onClick={() => openInput(com._id)}
                                      icon={<EditOutlined />}
                                    ></Button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default PostId;
