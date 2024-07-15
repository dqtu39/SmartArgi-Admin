import React, { useState } from 'react';

import { FileOutlined, LinkOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Space,Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

interface KnowledgeItem {
    title: string;
    language: string;
    source: string;
}

interface KnowledgeListProps {
    data: {
        total: number;
        documents: KnowledgeItem[];
    };
}

const KnowledgeList: React.FC<KnowledgeListProps> = ({ data }) => {
    const [searchText, setSearchText] = useState('');

    const columns: ColumnsType<KnowledgeItem> = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.title.toLowerCase().includes(value.toString().toLowerCase()),
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
            render: (language: string) => (
                <Tag color={language === 'english' ? 'blue' : 'green'}>
                    {language}
                </Tag>
            ),
        },
        {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
            render: (source: string) => (
                <>
                    <Text strong>Source: </Text>
                    {source.startsWith('http') ? (
                        <a href={source} target="_blank" rel="noopener noreferrer">
                            <LinkOutlined /> {source}
                        </a>
                    ) : source ? (
                        <Text>
                            <FileOutlined /> {source}
                        </Text>
                    ) : (
                        <Text italic>No source provided</Text>
                    )}
                </>
            ),
        },
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Input
                placeholder="Search by title"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16, width: "300px", padding: "10px" }}
            />
            <Table
                columns={columns}
                dataSource={data.documents}
                rowKey="title"
                // pagination={{ total: data.total }}
            />
        </Space>
    );
};

export default KnowledgeList;