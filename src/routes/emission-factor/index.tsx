import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface EmissionData {
    key: string;
    Name: string;
    Type: string;
    scope: number;
    CO2: string | null;
    CO2_unit: string | null;
    CH4: string | null;
    CH4_unit: string;
    N2O: string | null;
    N2O_unit: string;
    Source: string;
    Link: string | null;
}

interface EmissionsTableProps {
    data: EmissionData[];
}

const mockData = [
    {
        "Name": "Continuous Flooding",
        "CO2": "0 kg",
        "CH4": "1.3 kg",
        "N2O": null,
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Rice cultivation"
    },
    {
        "Name": "Intermittent Flooding (Single aeration)",
        "CO2": "0 kg",
        "CH4": "0.8 kg",
        "N2O": null,
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Rice cultivation"
    },
    {
        "Name": "Intermittently Flooded Fields (Multiple aeration)",
        "CO2": "0 kg",
        "CH4": "0.5 kg",
        "N2O": null,
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Rice cultivation"
    },
    {
        "Name": "Rainfed Deep water",
        "CO2": "0 kg",
        "CH4": "0.2 kg",
        "N2O": null,
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Rice cultivation"
    },
    {
        "Name": "Upland (Not flooded at all)",
        "CO2": null,
        "CH4": null,
        "N2O": null,
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Rice cultivation"
    },
    {
        "Name": "Straw incorporated shortly (30 days) before cultivation",
        "CO2": "0 kg",
        "CH4": null,
        "N2O": null,
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Rice cultivation"
    },
    {
        "Name": "Straw incorporated long (>30 days) before cultivation",
        "CO2": "0 kg",
        "CH4": null,
        "N2O": "0.20 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Rice cultivation"
    },
    {
        "Name": "Compost",
        "CO2": "0 kg",
        "CH4": null,
        "N2O": "0.05 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Fertiliser/waste application"
    },
    {
        "Name": "Farm yard manure",
        "CO2": "0 kg",
        "CH4": "0.14 kg",
        "N2O": "0.15 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Manure"
    },
    {
        "Name": "Green manure",
        "CO2": "0 kg",
        "CH4": null,
        "N2O": "0.35 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Manure"
    },
    {
        "Name": "Pesticide",
        "CO2": "18.3 kg",
        "CH4": null,
        "N2O": "0 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "Ecoinvent - Life cycle databases",
        "Link": "ecoinvent - Data with purpose",
        "Type": "Soil/waste pollution"
    },
    {
        "Name": "Herbicide",
        "CO2": "15 kg",
        "CH4": null,
        "N2O": "0 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "Ecoinvent - Life cycle databases",
        "Link": "ecoinvent - Data with purpose",
        "Type": "Soil/waste pollution"
    },
    {
        "Name": "Fungicide",
        "CO2": "10 kg",
        "CH4": null,
        "N2O": "0 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "Ecoinvent - Life cycle databases",
        "Link": "ecoinvent - Data with purpose",
        "Type": "Soil/waste pollution"
    },
    {
        "Name": "Insecticide",
        "CO2": "20 kg",
        "CH4": null,
        "N2O": "0 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": "0 kg",
        "Source": "Ecoinvent",
        "Link": null,
        "Type": "Fertiliser/waste application"
    },
    {
        "Name": "Synthetic fertilizer",
        "CO2": null,
        "CH4": null,
        "N2O": "0.01 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Soil/waste pollution"
    },
    {
        "Name": "Animal manure",
        "CO2": null,
        "CH4": null,
        "N2O": "0.01 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Manure"
    },
    {
        "Name": "Landfilling",
        "CO2": null,
        "CH4": null,
        "N2O": "0.015 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Fertiliser/waste application"
    },
    {
        "Name": "Incineration",
        "CO2": "0.9 kg",
        "CH4": "0.0027 kg",
        "N2O": "0.0007 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": "IPCC 2006 Guidelines",
        "Link": "https://www.ipcc-nggip.iges.or.jp/public/2006gl/",
        "Type": "Biomass burning"
    },
    {
        "Name": "Burning crop residues",
        "CO2": null,
        "CH4": null,
        "N2O": "0.00007 kg",
        "CH4_unit": "",
        "N2O_unit": "",
        "scope": 1,
        "CO2_unit": null,
        "Source": null,
        "Link": null,
        "Type": "Biomass burning"
    }
]
 const EmissionsTable: React.FC<EmissionsTableProps | []> = ({data}) => {
    const [searchText, setSearchText] = useState('');

    const columns: ColumnsType<EmissionData> = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.Name.toLowerCase().includes(value.toString().toLowerCase()),
        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
        },
        {
            title: 'Scope',
            dataIndex: 'scope',
            key: 'scope',
        },
        {
            title: 'CO2',
            dataIndex: 'CO2',
            key: 'CO2',
            render: (text, record) => text ? `${text} ${record.CO2_unit || ''}` : '-',
        },
        {
            title: 'CH4',
            dataIndex: 'CH4',
            key: 'CH4',
            render: (text, record) => text ? `${text} ${record.CH4_unit}` : '-',
        },
        {
            title: 'N2O',
            dataIndex: 'N2O',
            key: 'N2O',
            render: (text, record) => text ? `${text} ${record.N2O_unit}` : '-',
        },
        {
            title: 'Source',
            dataIndex: 'Source',
            key: 'Source',
            render: (text, record) => (
                record.Link ?
                    <a href={record.Link} target="_blank" rel="noopener noreferrer">
                        {text}
                    </a> : text
            ),
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
            <Table
                <EmissionData>
                columns={columns}
                dataSource={data.map((item, index) => ({ ...item, key: index.toString() }))}
            />
        </Space>
    );
};

export const EmissionFactor: React.FC = () => {
    return (
        <div>
            <EmissionsTable data={mockData} />
        </div>
    );
};

