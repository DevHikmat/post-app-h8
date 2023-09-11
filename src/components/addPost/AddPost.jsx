import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, message } from "antd";
import React, { useRef, useState } from "react";
import "./AddPost.scss";
import { PostService } from "../../services/PostService";
const { TextArea } = Input;

const AddPost = () => {
  const img_rf = useRef();
  const [url, setUrl] = useState("");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const showImg = () => {
    if (img_rf.current.files[0])
      setUrl(URL.createObjectURL(img_rf.current.files[0]));
  };

  const handleAddPost = async ({ title, content }) => {
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", img_rf.current.files[0]);
      const data = await PostService.createPost(formData);
      message.success(data.message);
      setUrl("");
      img_rf.current.value = "";
      form.setFieldsValue({
        title: "",
        content: "",
      });
    } catch (error) {
      message.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="add-post">
      <Row>
        <Col>
          <div className="add-post-header">
            <div>
              <label htmlFor="post-img">
                {url === "" ? (
                  <PlusOutlined />
                ) : (
                  <img id="my-img" src={url} alt="" />
                )}
                <input
                  onChange={showImg}
                  ref={img_rf}
                  id="post-img"
                  type="file"
                />
              </label>
            </div>
          </div>
          <div className="add-post-body">
            <Form form={form} onFinish={handleAddPost}>
              <Form.Item
                name="title"
                rules={[{ required: true, message: "Please fill post title" }]}
              >
                <Input placeholder="Post title" />
              </Form.Item>
              <Form.Item
                name="content"
                rules={[{ required: true, message: "Fill description" }]}
              >
                <TextArea placeholder="Some description..." />
              </Form.Item>
              <Button loading={isLoading} htmlType="submit">
                Create post
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddPost;
