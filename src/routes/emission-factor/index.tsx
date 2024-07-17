import React, { useState, useEffect } from "react";
import { ColumnsType } from "antd/es/table";
import { Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

interface EmissionData {
    key: string;
    name: string;
    type: string;
    scope: number;
    co2: string | null;
    co2_unit: string | null;
    ch4: string | null;
    ch4_unit: string;
    n2o: string | null;
    n2o_unit: string;
    source: string;
    link: string | null;
}

const EmissionsTable: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState<EmissionData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const emissionsCollection = collection(db, 'emission_factors');
                const emissionSnapshot = await getDocs(emissionsCollection);
                const emissionList = emissionSnapshot.docs.map(doc => ({
                    key: doc.id,
                    ...doc.data()
                } as EmissionData));
                setData(emissionList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns: ColumnsType<EmissionData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.name.toLowerCase().includes(value.toString().toLowerCase()),
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'Scope',
            dataIndex: 'scope',
            key: 'scope',
            width: 80,
        },
        {
            title: 'CO2',
            dataIndex: 'co2',
            key: 'co2',
            width: 100,
        },
        {
            title: 'CO2 Unit',
            dataIndex: 'co2_unit',
            key: 'co2_unit',
            width: 100,
        },
        {
            title: 'CH4',
            dataIndex: 'ch4',
            key: 'ch4',
            width: 100,
        },
        {
            title: 'CH4 Unit',
            dataIndex: 'ch4_unit',
            key: 'ch4_unit',
            width: 100,
        },
        {
            title: 'N2O',
            dataIndex: 'n2o',
            key: 'n2o',
            width: 100,
        },
        {
            title: 'N2O Unit',
            dataIndex: 'n2o_unit',
            key: 'n2o_unit',
            width: 100,
        },
        {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
            render: (text, record) => (
                record.link ?
                    <a href={record.link} target="_blank" rel="noopener noreferrer">
                        {text}
                    </a> : text
            ),
            width: 200,
            ellipsis: true,
        },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Input
                placeholder="Search by name"
                onChange={handleSearch}
                style={{ width: 300, padding: 10, marginBottom: 10 }}
                prefix={<SearchOutlined />}
            />
            <Table<EmissionData>
                columns={columns}
                dataSource={data}
                loading={loading}
                scroll={{ x: 1300, y: 500 }}
                pagination={{ pageSize: 10 }}
            />
        </Space>
    );
};

export const EmissionFactor: React.FC = () => {
    return (
        <div>
            <EmissionsTable />
        </div>
    );
};