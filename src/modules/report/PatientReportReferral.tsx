import { Formik } from "formik"
import FormikDocuments from "../../_cloner/components/inputs/FormikDocuments"
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import { IPatientReport, IPatientReportBasedOfReferral } from "./core/_models"
import Typography from "../../_cloner/components/typography/Typography"
import SimpleTable from "../../_cloner/components/tables/SimpleTable"
import { useFetchPatienReportBasedOfReferral } from "../patient/core/_hooks"
import { TableColumnsType, Tag } from "antd"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import { useEffect } from "react"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import FormikInput from "../../_cloner/components/inputs/FormikInput"

const initialValues: IPatientReportBasedOfReferral = {
    documentId: null,
    fromReferral: 0,
    toReferral: 0,
    fromDate: "",
    toDate: ""
}

const PatientReportReferral = () => {
    const fetchTools = useFetchPatienReportBasedOfReferral()
    useEffect(() => {
        fetchTools.mutate({})
    }, [])
    const onFilter = (values: IPatientReport) => {
        fetchTools.mutate(values)
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
            title: "کدملی",
            dataIndex: "nationalCode",
            key: "nationalCode",
            render: (item) => {
                return <Tag color="blue">
                    {item}
                </Tag>
            },

        },
        {
            title: "موبایل",
            dataIndex: "mobile",
            key: "mobile",
            render: (item) => {
                return <Tag color="pink">
                    {item}
                </Tag>
            },

        },
    ];

    return (
        <>
            {fetchTools.isPending && <Backdrop loading={fetchTools.isPending} />}
            <CardWidget>
                <Formik initialValues={initialValues} onSubmit={onFilter}>
                    {({ values }) => <form className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4">
                        <FormikDocuments name="documentId" label="نوع پرونده" hasLabel isRequired />
                        <FormikInput name="fromReferral" label="تعداد مراجعه از " hasLabel placeholder="" type="number" />
                        <FormikInput name="toReferral" label="تا " hasLabel placeholder="" type="number" />
                        <FormikDatepicker name="fromDate" label="از تاریخ" hasLabel placeholder="" />
                        <FormikDatepicker name="toDate" label="تا تاریخ" hasLabel placeholder="" />
                        <div className="lg:col-span-3 flex flex-end items-end justify-end w-full">
                            <SimpleButton btnClassName="!bg-primary" text="جستجو" onSubmit={() => onFilter(values)} />
                        </div>
                    </form>}
                </Formik>
                <Typography
                    type="h3"
                    text="گزارش تعداد مراجعات"
                    typographyTextClassName="text-secondary"
                />
                <div className="mt-16">
                    <SimpleTable columns={columns} data={fetchTools?.data || []} />
                </div>

            </CardWidget>
        </>


    )
}

export default PatientReportReferral