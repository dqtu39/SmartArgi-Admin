import React from 'react';
import { List, Card, Tag, Typography } from 'antd';
import { FileOutlined, LinkOutlined } from '@ant-design/icons';

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
    return (
        <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={data.documents}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        title={item.title}
                        extra={
                            <Tag color={item.language === 'english' ? 'blue' : 'green'}>
                                {item.language}
                            </Tag>
                        }
                    >
                        <Text strong>Source: </Text>
                        {item.source.startsWith('http') ? (
                            <a href={item.source} target="_blank" rel="noopener noreferrer">
                                <LinkOutlined /> {item.source}
                            </a>
                        ) : item.source ? (
                            <Text>
                                <FileOutlined /> {item.source}
                            </Text>
                        ) : (
                            <Text italic>No source provided</Text>
                        )}
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default KnowledgeList;