import { useGetUsers } from "./core/_hooks";
import Typography from "../../_cloner/components/typography/Typography";
import { Card, TableColumnsType, Tag } from "antd";
import SimpleTable from "../../_cloner/components/tables/SimpleTable";
import SimpleInput from "../../_cloner/components/inputs/SimpleInput";
import GridEditButton from "../../_cloner/components/buttons/GridEditButton";
import GridPermissionButton from "../../_cloner/components/buttons/GridPermissionButton";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import EditUser from "./EditUser";
import { useEffect, useState } from "react";
import { IUser } from "./core/_models";
import CreateUser from "./CreateUser";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import Backdrop from "../../_cloner/components/shared/Backdrop";
import SearchInput from "../../_cloner/components/inputs/SearchInput";

const Users = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [userItem, setUserItem] = useState<IUser>()
    const [results, setResults] = useState<IUser[]>([]);

    const userTools = useGetUsers();

    useEffect(() => {
      setResults(userTools?.data?.data);
      // eslint-disable-next-line
    }, [userTools?.data?.data]);


    const handleSetUserItem = (item: IUser) => {
        setUserItem(item)
        setOpenEditModal(true)
    }

    const columns: TableColumnsType = [
        {
            title: "نام",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "نام خانوادگی",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "نام کاربری",
            dataIndex: "userName",
            key: "userName",
            render: (item) => {
                return <Tag color="green">
                    {item}
                </Tag>
            },          
        },
        {
            title: "ایمیل",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "عملیات",
            key: "operation",
            fixed: "left",
            width: 200,
            render: (item) => (
                <div className="flex items-center gap-x-4">
                    <GridEditButton onClick={() => handleSetUserItem(item)} />
                    <GridPermissionButton />
                </div>
            ),
        },
    ];


    return (
        <>
            {userTools.isPending && <Backdrop loading={userTools.isPending} />}
            <Card>
                <section className="py-8">
                    <Typography
                        text="لیست کاربران"
                        type="h3"
                        typographyTextClassName="text-primary"
                    />
                </section>
                <div className="flex items-center gap-x-4 my-4">
                    <SearchInput 
                        keys={[
                            "firstName",
                            "lastName",
                            "userName",
                            "email",
                        ]}
                        data={userTools?.data?.data}
                        setResults={setResults}
                    />
                    <SimpleButton text="ایجاد کاربر جدید" onSubmit={()=> setOpenCreateModal(true)} />
                </div>
                <SimpleTable columns={columns} data={results || []} />
                {/* Create User */}
                <WidthModal
                    isOpen={openCreateModal}
                    onCancel={() => setOpenCreateModal(false)}
                    cancelText="انصراف"
                    title="ایجاد کاربر"
                >
                    <CreateUser  onClose={() => setOpenCreateModal(false)} refetch={userTools.refetch} />
                </WidthModal>
                {/* Edit User */}
                <WidthModal
                    isOpen={openEditModal}
                    onCancel={() => setOpenEditModal(false)}
                    cancelText="انصراف"
                    title="ویرایش کاربر"
                >
                    <EditUser item={userItem} onClose={() => setOpenEditModal(false)} refetch={userTools.refetch}  />
                </WidthModal>
            </Card>
        </>
    );
};

export default Users;
