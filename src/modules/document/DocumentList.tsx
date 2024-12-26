import { TableColumnsType, Tag } from "antd";
import GridEditButton from "../../_cloner/components/buttons/GridEditButton";
import CardWidget from "../../_cloner/components/shared/CardWidget"
import Typography from "../../_cloner/components/typography/Typography"
import SimpleTable from "../../_cloner/components/tables/SimpleTable";
import { useFetchDocuments } from "./core/_hooks";
import { useEffect, useState } from "react";
import Backdrop from "../../_cloner/components/shared/Backdrop";
import GridDeleteButton from "../../_cloner/components/buttons/GridDeleteButton";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import { IDocument } from "./core/_models";
import DocumentEditForm from "./DocumentEditForm";
import DocumentDeleteForm from "./DocumentDeleteForm";
import DocumentForm from "./DocumentForm";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";

const DocumentList = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [DocumentItem, setDocumentItem] = useState<IDocument>()
    const [DocumentItemDelete, setDocumentItemDelete] = useState<IDocument>()

    const fetchTools = useFetchDocuments()

    const handleSetDocumentItem = (item: IDocument) => {
        setDocumentItem(item)
        setOpenEditModal(true)
    }
    const handleSetDocumentItemForDelete = (item: IDocument) => {
        setDocumentItemDelete(item)
        setOpenDeleteModal(true)
    }

    useEffect(() => {
        fetchTools.mutate()
    }, [])


    const columns: TableColumnsType = [
        {
            title: "نام پرونده",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "توضیحات",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "عملیات",
            key: "operation",
            fixed: "left",
            width: 200,
            render: (item) => (
                <div className="flex items-center gap-x-4">
                    <GridEditButton onClick={() => handleSetDocumentItem(item)} />
                    <GridDeleteButton onClick={() => handleSetDocumentItemForDelete(item)} />
                </div>
            ),
        },
    ];

    return (
        <>
            {fetchTools.isPending && <Backdrop loading={fetchTools.isPending} />}
            <CardWidget>
                <div className="flex flex-end justify-end">
                    <SimpleButton text="ایجاد نوع پرونده جدید"  onSubmit={() => setOpenCreateModal(true)} />
                </div>
                <Typography
                    type="h3"
                    text="لیست نوع پرونده"
                    typographyTextClassName="text-secondary"
                />
                <div className="mt-16">
                    <SimpleTable columns={columns} data={fetchTools?.data || []} />
                </div>

            </CardWidget>
            {/* Edit Document */}
            <WidthModal
                isOpen={openCreateModal}
                onCancel={() => setOpenCreateModal(false)}
                cancelText="انصراف"
                title=""
            >
                <DocumentForm fetchDocuments={fetchTools} onClose={() => setOpenCreateModal(false)} />
            </WidthModal>
            <WidthModal
                isOpen={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                cancelText="انصراف"
                title=""
            >
                <DocumentEditForm fetchDocuments={fetchTools} onClose={() => setOpenEditModal(false)} id={DocumentItem?.id || 0} />
            </WidthModal>
            {/* Delete Document */}
            <WidthModal
                isOpen={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                cancelText="انصراف"
                title="حذف نوع پرونده"
            >
                <DocumentDeleteForm fetchDocuments={fetchTools} onClose={() => setOpenDeleteModal(false)} item={DocumentItemDelete} />
            </WidthModal>

        </>
    )
}

export default DocumentList