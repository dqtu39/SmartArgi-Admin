import React, { useCallback,useEffect, useState } from 'react';

import {Card, Col, List, Row} from 'antd';
import { collection, getDocs } from 'firebase/firestore';

import { FullScreenLoading } from "@/components";
import { db } from '@/firebase';

interface Blog {
    id: string;
    title: string;
    image: string;
    content: string;
}

export const BlogsPage: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = useCallback(async () => {
        try {
            const blogsCollection = collection(db, 'blogs');
            const blogSnapshot = await getDocs(blogsCollection);
            const blogList = blogSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Blog));
            setBlogs(blogList);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    if (loading) {
        return <FullScreenLoading />;
    }

    return (
        <Row gutter={[16, 16]}>
            {blogs.map((blog) => (
                <Col xs={24} sm={12} md={8} lg={6} key={blog.id}>
                    <Card
                        cover={<img alt={blog.title} src={blog.image} style={{ height: 200, objectFit: 'cover' }} />}
                        title={blog.title}
                    >
                        <Card.Meta description={`${blog.content.substring(0, 100)}...`} />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};