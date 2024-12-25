import { Card, Tooltip } from "antd";
import Typography from "../../_cloner/components/typography/Typography";
import RoundedButton from "../../_cloner/components/buttons/RoundedButton";
import { useGetApplicationRoles } from "./core/_hooks";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import { useState } from "react";
import CreateGroup from "./CreateGroup";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import DeleteGroup from "./DeleteGroup";
import { IGroup } from "./core/_models";
import AccessGroup from "./AccessGroup";
import SimpleModal from "../../_cloner/components/shared/SimpleModal";

const Groups = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openAccessModal, setOpenAccessModal] = useState<boolean>(false);

    const [itemDelete, setItemDelete] = useState<IGroup>()
    const [itemAccess, setItemAccess] = useState<IGroup>()

    const groupTools = useGetApplicationRoles();

    const handleSetItemDelete = (item: IGroup) => {
        setItemDelete(item)
        setOpenDeleteModal(true)
    }
    const handleSetItemAccess = (item: IGroup) => {
        setItemAccess(item)
        setOpenAccessModal(true)
    }


    if (groupTools.isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <div className="my-4">
                <SimpleButton
                    text="ایجاد گروه جدید"
                    onSubmit={() => setOpenCreateModal(true)}
                />
            </div>
            {groupTools?.data?.data.map(
                (item: IGroup) => {
                    return (
                        <div className="flex flex-col my-2">
                            <Card>
                                <section className="flex justify-between items-center">
                                    <Typography text={item.name} type="h5" />
                                    <div className="flex gap-x-8">
                                        <Tooltip title="حذف گروه">
                                            <RoundedButton onSubmit={() => handleSetItemDelete(item)} svgName="delete-svgrepo-com" />
                                        </Tooltip>
                                        <Tooltip title="دسترسی">
                                            <RoundedButton
                                                onSubmit={() => handleSetItemAccess(item)}
                                                btnClassName="!bg-blueLight hover:!bg-green"
                                                svgName="arrow-down-svgrepo-com"
                                            />
                                        </Tooltip>
                                    </div>
                                </section>
                            </Card>
                        </div>
                    );
                }
            )}
            
            {/* Create Group */}
            <WidthModal
                isOpen={openCreateModal}
                onCancel={() => setOpenCreateModal(false)}
                cancelText="انصراف"
                title="ایجاد گروه"
            >
                <CreateGroup onClose={() => setOpenCreateModal(false)} refetch={groupTools.refetch} />
            </WidthModal>
            {/* Delete Group */}
            <SimpleModal
                isOpen={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                cancelText="انصراف"
                title="حذف گروه"
            >
                <DeleteGroup item={itemDelete} onClose={() => setOpenDeleteModal(false)}  refetch={groupTools.refetch} />
            </SimpleModal>
            {/* Access Group */}
            <WidthModal
                isOpen={openAccessModal}
                onCancel={() => setOpenAccessModal(false)}
                cancelText="انصراف"
                title="دسترسی"
            >
                <AccessGroup item={itemAccess} onClose={() => setOpenAccessModal(false)} refetch={groupTools.refetch} />
            </WidthModal>
        </>
    );
};

export default Groups;
