import React, { FC } from 'react'
import { Dropdown, Space } from 'antd';
import { ItemType } from 'antd/es/menu/interface';

interface IProps {
    items: ItemType[] | undefined
    children: React.ReactNode
}

const DropdownComponent: FC<IProps> = ({ items, children }) => {
    return (
        <>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                        <div>
                            {children}
                        </div>
                    </Dropdown>
                </Space>
            </Space>
        </>
    )
}

export default DropdownComponent