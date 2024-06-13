import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { AxiosRequestHeaders } from "axios";
import { useSession } from "next-auth/react";

const { Dragger } = Upload;

export default function ImageUpload({ onUpload }: { onUpload: any }) {
  const session = useSession();

  const handleSubmit = () => {};

  const handleOnChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleOnDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  return (
    <Dragger
      name="image"
      multiple={true}
      action={`${process.env.NEXT_PUBLIC_BE_URL}/api/v1/files/uploadImage`}
      headers={
        {
          Authorization: `Bearer ${session.data?.accessToken}`,
        } as AxiosRequestHeaders
      }
      onChange={handleOnChange}
      onDrop={handleOnDrop}
      //   beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
      </p>
    </Dragger>
  );
}
