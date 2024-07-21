import React, {useEffect, useState} from "react";

import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, Form, message, Space} from "antd";

import {KnowledgeCreatePage} from "@/routes/knowledge-base/create";
import KnowledgeList from "@/routes/knowledge-base/KnowledgeList";
import {getAllDocuments, KnowledgeItem, uploadFile, uploadLink, uploadText} from "@/service/knowledgeService";

const mockData = {
    "total": 10,
    "documents": [
        {
            "title": "carbon-accounting-ke-toan-carbon-la-gi",
            "language": "vietnamese",
            "source": "https://fpt-is.com/goc-nhin-so/carbon-accounting-ke-toan-carbon-la-gi"
        },
        {
            "title": "Contact Information",
            "language": "english",
            "source": "Hãy bảo vệ không khí, và nguồn nước.pdf"
        },
        {
            "title": "Phụ lục BẢN CÔNG BỐ THÔNG TIN VỀ GIỐNG CÂY TRỒNG",
            "language": "vietnamese",
            "source": "Phu-luc-giong-LÚA.docx"
        },
        {
            "title": "VietGAP là gì? 7 bước chứng nhận VietGAP",
            "language": "vietnamese",
            "source": "https://vnce.vn/vietgap-la-gi"
        },
        {
            "title": "Bệnh gỉ sắt trên cây trồng",
            "language": "vietnamese",
            "source": ""
        },
        {
            "title": "Farm Dashboard: The no.1 Tool for effective data-driven decisions",
            "language": "english",
            "source": "https://www.farm21.com/farm-dashboard-make-data-driven-decisions/#main"
        },
        {
            "title": "carbon-neutral-la-gi",
            "language": "vietnamese",
            "source": "https://fpt-is.com/goc-nhin-so/carbon-neutral-la-gi"
        },
        {
            "title": "carbon-footprint-la-gi",
            "language": "vietnamese",
            "source": "https://fpt-is.com/goc-nhin-so/carbon-footprint-la-gi"
        },
        {
            "title": "Farm21: Farming Platform for Growers, Crop Advisors and Researchers",
            "language": "english",
            "source": "https://www.farm21.com/farming-platform-to-farm-smarter/"
        },
        {
            "title": "FS21 Features Developed over the last 4 years",
            "language": "english",
            "source": ""
        }
    ]
}
export const KnowledgeBase = () => {
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [segmentType, setSegmentType] = useState<string>("file");
    const [documents, setDocuments] = useState<KnowledgeItem[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await getAllDocuments();
            setDocuments(response.documents);
            setTotal(response.total);
        } catch (error) {
            console.error("Error fetching documents:", error);
            message.error("Failed to fetch documents");
        }
    };
    const handleCancel = () => {
        setIsModelOpen(false);
        form.resetFields();
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
                    response = await uploadText(values.document_text, values.document_title);
                    break;
                default:
                    handleCancel()
                    throw new Error("Invalid segment type");
            }

            if (response.success) {
                message.success("Knowledge uploaded successfully");
                if (response.document) {
                    setDocuments(prevDocuments => [...prevDocuments, response.document]);
                    setTotal(prevTotal => prevTotal + 1);
                } else {
                    await fetchDocuments();
                }
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

    const AddButton = ({children}) => (
        <Button
            style={{paddingLeft: 0}}
            type="link"
            icon={<PlusCircleOutlined/>}
            onClick={toggleModel}

        >
            {children}
        </Button>
    )

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ marginBottom: '24px' }}>
                <AddButton>
                    <span>Add new knowledge</span>
                </AddButton>
            </div>
            <KnowledgeCreatePage
                segmentType={segmentType}
                setSegmentType={setSegmentType}
                onCancel={handleCancel}
                form={form}
                onFinish={handleFinish}
                isModelOpen={isModelOpen}
            />
            <KnowledgeList data={{ total, documents }} />
        </Space>
    );
};
