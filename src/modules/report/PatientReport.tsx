import { Formik } from "formik"
import FormikDocuments from "../../_cloner/components/inputs/FormikDocuments"
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import { IPatientReport } from "./core/_models"
import Typography from "../../_cloner/components/typography/Typography"
import SimpleTable from "../../_cloner/components/tables/SimpleTable"
import { useDownloadPatientReportBasedOfFileExcel, useFetchPatienReportBasedOfFile } from "../patient/core/_hooks"
import { TableColumnsType, Tag } from "antd"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import { useEffect } from "react"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CustomButton from "../../_cloner/components/buttons/CustomButton"
import { toAbsoulteUrl } from "../../_cloner/utils/absoluteUrl"

const initialValues: IPatientReport = {
    documentId: null,
    fromDate: "",
    toDate: ""
}

const PatientReport = () => {
    const fetchTools = useFetchPatienReportBasedOfFile()
    const downloadTools = useDownloadPatientReportBasedOfFileExcel()

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
    const handleDownloadExcel = () => {
        downloadTools.mutate({ fromDate: "1", toDate: "1" })
    }

    return (
        <>
            {fetchTools.isPending && <Backdrop loading={fetchTools.isPending} />}
            {downloadTools.isPending && <Backdrop loading={downloadTools.isPending} />}
            <CardWidget>
                <Formik initialValues={initialValues} onSubmit={onFilter}>
                    {({ values }) => <form className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-4">
                        <FormikDocuments name="documentId" label="نوع پرونده" hasLabel />
                        <FormikDatepicker name="fromDate" label="از تاریخ" hasLabel placeholder="" />
                        <FormikDatepicker name="toDate" label="تا تاریخ" hasLabel placeholder="" />
                        <div className="lg:col-span-3 flex flex-end items-end justify-end w-full">
                            <SimpleButton btnClassName="!bg-primary" text="جستجو" onSubmit={() => onFilter(values)} />
                        </div>
                    </form>}
                </Formik>
                <div className="flex justify-between items-center mt-2">
                    <Typography
                        type="h3"
                        text="لیست بیماران"
                        typographyTextClassName="text-secondary"
                    />
                </div>
                <div className="mt-16">
                    <div className="flex justify-end items-end">
                        <CustomButton onSubmit={handleDownloadExcel} btnClassName="!bg-green">
                            <img src={toAbsoulteUrl('/pictures/images/excelLogo.png')} width={30} />
                        </CustomButton>
                    </div>
                    <SimpleTable columns={columns} data={fetchTools?.data || []} />
                </div>

            </CardWidget>
        </>


    )
}

export default PatientReport