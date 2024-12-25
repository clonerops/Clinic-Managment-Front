import Typography from "../../_cloner/components/typography/Typography";
import { Card, TableColumnsType, Tag } from "antd";
import SimpleTable from "../../_cloner/components/tables/SimpleTable";
import GridEditButton from "../../_cloner/components/buttons/GridEditButton";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import { useEffect, useState } from "react";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import { IPermission } from "./core/_models";
import { useGetPermissions } from "./core/_hooks";
import CreatePermission from "./CreatePermission";
import EditPermission from "./EditPermission";
import GridDeleteButton from "../../_cloner/components/buttons/GridDeleteButton";
import SimpleModal from "../../_cloner/components/shared/SimpleModal";
import DeletePermission from "./DeletePermission";
import SearchInput from "../../_cloner/components/inputs/SearchInput";
import Backdrop from "../../_cloner/components/shared/Backdrop";

const Permissions = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [permissionItem, setPermissionItem] = useState<IPermission>()
    const [results, setResults] = useState<IPermission[]>([]);

    const PermissionTools = useGetPermissions();

    useEffect(() => {
      setResults(PermissionTools?.data?.data);
      // eslint-disable-next-line
    }, [PermissionTools?.data?.data]);

    const handleSetPermissionItem = (item: IPermission, type: "edit" | "delete") => {
        setPermissionItem(item)
        if(type === "edit") {
            setOpenEditModal(true)
        } else {
            setOpenDeleteModal(true)
        }
    }

    const columns: TableColumnsType = [
        {
            title: "عنوان لاتین مجوز",
            dataIndex: "permissionName",
            key: "permissionName",
        },
        {
            title: "عنوان فارسی مجوز",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "عنوان منو",
            dataIndex: "applicationMenuName",
            key: "applicationMenuName",
            render: (item) => {
                return <Tag color="green">
                    {item}
                </Tag>
            },          
        },
        {
            title: "عملیات",
            key: "operation",
            fixed: "left",
            width: 200,
            render: (item) => (
                <div className="flex items-center gap-x-4">
                    <GridEditButton onClick={() => handleSetPermissionItem(item, "edit")} />
                    <GridDeleteButton onClick={() => handleSetPermissionItem(item, "delete")}  />
                </div>
            ),
        },
    ];


    return (
        <>
            {PermissionTools.isPending && <Backdrop loading={PermissionTools.isPending} />}
            <Card>
                <section className="py-8">
                    <Typography
                        text="لیست مجوزها"
                        type="h3"
                        typographyTextClassName="text-primary"
                    />
                </section>
                <div className="flex items-center gap-x-4 my-4">
                    <SearchInput 
                        keys={[
                            "permissionName",
                            "description",
                            "applicationMenuName",
                        ]}
                        data={PermissionTools?.data?.data}
                        setResults={setResults}
                    />
                    
                    <SimpleButton text="ایجاد مجوز جدید" onSubmit={()=> setOpenCreateModal(true)} />
                </div>
                <SimpleTable columns={columns} data={results || []} />
                {/* Create Permission */}
                <WidthModal
                    isOpen={openCreateModal}
                    onCancel={() => setOpenCreateModal(false)}
                    cancelText="انصراف"
                    title="ایجاد مجوز"
                >
                    <CreatePermission onClose={() => setOpenCreateModal(false)} refetch={PermissionTools.refetch} />
                </WidthModal>
                {/* Edit Permission */}
                <WidthModal
                    isOpen={openEditModal}
                    onCancel={() => setOpenEditModal(false)}
                    cancelText="انصراف"
                    title="ویرایش مجوز"
                >
                    <EditPermission item={permissionItem} onClose={() => setOpenEditModal(false)} refetch={PermissionTools.refetch} />
                </WidthModal>
                {/* Delete Permission */}
                <SimpleModal
                    isOpen={openDeleteModal}
                    onCancel={() => setOpenDeleteModal(false)}
                    cancelText="انصراف"
                    title="حذف مجوز"
                >
                    <DeletePermission item={permissionItem} onClose={() => setOpenDeleteModal(false)} refetch={PermissionTools.refetch} />
                </SimpleModal>
            </Card>
        </>
    );
};

export default Permissions;
