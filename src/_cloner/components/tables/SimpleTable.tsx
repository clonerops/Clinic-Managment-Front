import { Table, TableProps as AntTableProps, TableColumnsType } from "antd";
import { FC } from "react";

interface IProps<T> {
    columns: TableColumnsType<T>;
    data: T[];
    tableProps?: AntTableProps<T>;
}

const SimpleTable: FC<IProps<any>> = ({ columns, data, tableProps }) => {
    const columnsWithClass = columns?.map((column) => ({
        ...column,
        className: `${column.className || ""} font-peyda-reqular`,
    }));

    return (
        <div style={{ overflowX: "auto" }}>
            <Table
                columns={columnsWithClass}
                dataSource={data}
                {...tableProps}
            />
        </div>
    );
};

SimpleTable.defaultProps = {
    tableProps: {},
};

export default SimpleTable;
