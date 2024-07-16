import {useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Input, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";


interface EmissionData {
    key: string;
    name: string;
    type: string;
    scope: string;
    co2: number;
    co2Unit: string;
    nh4: number;
    nh4Unit: string;
    n2o: number;
    n2oUnit: string;
    source: string;
    sourceLink: string;
}

const EmissionsTable: React.FC = ({data, searchText, setSearchText}) => {

    const columns: ColumnsType<EmissionData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.name.toLowerCase().includes(value.toString().toLowerCase()),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Scope',
            dataIndex: 'scope',
            key: 'scope',
        },
        {
            title: 'CO2',
            dataIndex: 'co2',
            key: 'co2',
            render: (text, record) => `${text} ${record.co2Unit}`,
        },
        {
            title: 'NH4',
            dataIndex: 'nh4',
            key: 'nh4',
            render: (text, record) => `${text} ${record.nh4Unit}`,
        },
        {
            title: 'N2O',
            dataIndex: 'n2o',
            key: 'n2o',
            render: (text, record) => `${text} ${record.n2oUnit}`,
        },
        {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
            render: (text, record) => (
                <a href={record.sourceLink} target="_blank" rel="noopener noreferrer">
                    {text}
                </a>
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
            <Table<EmissionData> columns={columns} dataSource={data} />
        </Space>
    );
};

export const EmissionFactor = () => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState<EmissionData[]>([]);
    return (
        <div>
            <EmissionsTable searchText={searchText} setSearchText={setSearchText} data={data}/>
        </div>
    )
}