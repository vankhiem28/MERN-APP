import React from "react";
import { Modal } from "antd";
import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

function CreateModal({ isModalOpen, handleCancel, handleSubmit }) {
  return (
    <div>
      <Modal
        okButtonProps={{ style: { backgroundColor: "red" } }}
        title="Add Post"
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
            form="createPostForm"
          >
            OK
          </button>,
        ]}
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          labelAlign="left"
          id="createPostForm"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title required !!!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description required !!!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Url"
            name="url"
            rules={[{ required: true, message: "Url required !!!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status required !!!" }]}
          >
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

export default CreateModal;
