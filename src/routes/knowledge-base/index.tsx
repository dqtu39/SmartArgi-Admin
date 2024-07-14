import React, {useState} from "react";

import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, Form, message} from "antd";

import {KnowledgeCreatePage} from "@/routes/knowledge-base/create";
import {uploadFile, uploadLink, uploadText} from "@/service/knowledgeService";

export const KnowledgeBase = () => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [segmentType, setSegmentType] = useState<string>("file");




    const handleCancel = () => {
        setIsModelOpen(false);
        form.resetFields(); // Reset form fields on cancel
    };

    const handleFinish = async (values: any) => {
        console.log(values)
        try {
            let response;
            switch (segmentType) {
                case "file":
                    if (values.document_file && values.document_file.file.originFileObj) {
                        response = await uploadFile(values.document_file.file.originFileObj);
                    } else {
                        throw new Error("No file selected");
                    }
                    break;
                case "link":
                    response = await uploadLink(values.document_link);
                    break;
                case "text":
                    response = await uploadText(values.document_text);
                    break;
                default:
                    handleCancel()
                    throw new Error("Invalid segment type");
            }

            if (response.success) {
                message.success("Knowledge uploaded successfully");
            } else {
                throw new Error(response.message || "Upload failed");
            }
        } catch (error) {
            console.error("Error posting knowledge:", error);
            message.error("Failed to upload knowledge: " + (error as Error).message);
        }
    };

    const toggleModel = () => {
        setIsModelOpen(isModelOpen => !isModelOpen)
    }

    const AddButton = () => (
        <Button
            style={{ paddingLeft: 0 }}
            type="link"
            icon={<PlusCircleOutlined />}
            onClick={toggleModel}
        >
            Add new knowledge
        </Button>
    )

    return (
        <div>
            <AddButton/>
            <KnowledgeCreatePage segmentType={segmentType} setSegmentType={setSegmentType}  onCancel={handleCancel} form={form} onFinish={handleFinish} isModelOpen={isModelOpen} />
        </div>
    );
};
