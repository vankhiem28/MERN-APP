import React from "react";
import { Modal } from "antd";
import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

function UpdateModal({ isModalOpen, handleCancel, handleSubmit, data }) {
  const { title, description, status, url } = data;
  return (
    <div>
      <Modal
        okButtonProps={{ style: { backgroundColor: "red" } }}
        title="Update Post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <button
            key="back"
            className="border p-3  hover:border-blue-500 hover:text-blue-500 rounded-md transition-all mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>,
          <button
            key="submit"
            type="primary"
            className="border p-3  bg-blue-500 text-white  hover:bg-blue-400 rounded-md transition-all"
            form="updatePostForm"
          >
            OK
          </button>,
        ]}
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          labelAlign="left"
          id="updatePostForm"
          onFinish={handleSubmit}
          fields={[
            {
              name: "title",
              value: title,
            },
            {
              name: "description",
              value: description,
            },
            {
              name: "url",
              value: url,
            },
            {
              name: "status",
              value: status,
            },
          ]}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Url" name="url">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select>
              <Select.Option value="TO LEARN">TO LEARN</Select.Option>
              <Select.Option value="LEARNING">LEARNING</Select.Option>
              <Select.Option value="LEARNED">LEARNED</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateModal;
