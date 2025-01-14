import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useFetchPatientFile } from "../patientFile/core/_hooks";
import { useFetchPatient } from "../patient/core/_hooks";

const MidWirfyFormPrint = () => {
    const { patientId, id }: any = useParams()
    const patient = useFetchPatient()
    const patientDocument = useFetchPatientFile()

    useEffect(() => {
        patient.mutate(patientId)
        patientDocument.mutate(id)
    }, [patientId, id])

    const printComponentRef = useRef<HTMLDivElement>(null);

    const handlePrint: any = useReactToPrint({
        content: (): HTMLDivElement | null => {
            return printComponentRef.current;
        }
    } as any);

    const RendertextValue = (props: { title: string, value: any }) => {
        return (
            <div className="flex items-center gap-x-2">
                <h4 className="font-bold">{props.title}: </h4>
                <span>{props.value}</span>
            </div>
        )
    }
    const RenderSurvey = (props: { title: string }) => {
        return (
            <div className="grid border-b-[1px] border-black last:border-0 grid-cols-8">
                <div className="col-span-6 px-4 py-1">
                    <h3 className="font-bold">{props.title}</h3>
                </div>
                <div className="border-r-[1px] px-4 py-1 flex flex-row gap-x-2 border-black">
                    <h3 className="font-bold">بله</h3>
                    <div className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
                <div className="border-r-[1px] px-4 py-1 flex flex-row gap-x-2 border-black">
                    <h3 className="font-bold">خیر</h3>
                    <div className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
            </div>
        )
    }
    const RenderTakingMedication = (props: { title: string }) => {
        return (
            <div className="flex border-r-[1px] border-b-[1px] border-black px-4 py-1">
                <h3 className="font-bold">{props.title}</h3>
                <div className="w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
            </div>
        )
    }


    const surveyQuestion = [
        { id: 1, title: "هموفیلی" },
        { id: 2, title: "دیابت نوع دوم" },
        { id: 3, title: "انواع پروتز و گوتزهای دندانی و ایمپلنت" },
        { id: 4, title: "ابتلا به انواع هپاتیت ها" },
        { id: 5, title: "عفونت های تب زا/بیماری های عفونی" },
        { id: 6, title: "مشکلات پوستی در ناحیه مورد درمان" },
        { id: 7, title: "کلوئید(گوشت اضافه)" },
        { id: 8, title: "مشکلات سیستم ایمنی بدن" },
        { id: 9, title: "بیماری های مغز و اعصاب مانند(صرع، میگرن، ام اس)" },
        { id: 10, title: "شیمی درمانی و رادیوتراپی" },
        { id: 11, title: "مشکلات قلبی و عروقی" },
        { id: 12, title: "جراحی پلاستیک و عمومی" },
        { id: 13, title: "ورم دارای التهاب" },
        { id: 14, title: "بارداری و شیردهی" },
        { id: 15, title: "اجازه استفاده از تصویرم برای تولید محتوا میدهم" },
    ]

    const TakingMedicationList = [
        { id: 1, title: "فشارخون" },
        { id: 2, title: "هورمونی" },
        { id: 3, title: "کورتون" },
        { id: 4, title: "رقیق کننده خون" },
        { id: 5, title: "قلب/آسپرین" },
        { id: 6, title: "راکوتان" },
        { id: 7, title: "اعصاب" },
        { id: 8, title: "هیچکدام" },
    ]

    if (patient.isPending) {
        return <span>درحال بارگزاری ....</span>
    }
    if (patientDocument.isPending) {
        return <span>درحال بارگزاری ....</span>
    }

    return (
        <>
            <button className="bg-green-500 text-black px-16 py-2" onClick={handlePrint}>پرینت</button>
            <div ref={printComponentRef} style={{ direction: "rtl" }}>
                <h2 className="text-center font-bold text-2xl">فرم رضایت انجام خدمات مامایی</h2>
                <span className="font-bold text-lg">تاریخ : .........</span>

                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-4">
                        <RendertextValue title="نام" value={`${patient?.data?.firstName} `} />
                        <RendertextValue title="نام خانوادگی" value={patient?.data?.lastName} />
                        <RendertextValue title="تاریخ تولد" value={patient?.data?.birthDate} />
                        <RendertextValue title="شماره پرونده" value={patientDocument?.data?.fileCode} />
                    </div>
                </div>
                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-4">
                        <RendertextValue title="شغل" value={patient?.data?.job} />
                        <RendertextValue title="تحصیلات" value={patient?.data?.education} />
                        <RendertextValue title="وضعیت تاهل" value={patient?.data?.maritalStatus == 2 ? " متاهل " : "مجرد"} />
                        <RendertextValue title="معرف" value={patient?.data?.representative} />
                    </div>
                </div>
                <div className="border-[1px] border-b-0 border-black">
                    <div className="grid grid-cols-4 ">
                        <div className="col-span-3 border-l-[1px] border-black py-1">
                            <div className="py-1 border-b-[1px] border-black">
                                <div className="px-4">
                                    <RendertextValue title="نشانی" value={patient?.data?.address} />
                                </div>
                            </div>
                            <div className="py-1 border-b-[1px] border-black">
                                <div className="px-4">
                                    <RendertextValue title="تاریخ آخرین پریود" value={""} />
                                </div>
                            </div>
                            <div className="px-4 py-1 border-black">
                                <div className="grid grid-cols-3">
                                    <div>
                                        <span className="font-bold">تعداد حاملگی</span>
                                    </div>
                                    <div>
                                        <span className="font-bold">تعداد زایمان</span>
                                    </div>
                                    <div>
                                        <span className="font-bold">نوع زایمان</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-y-2 flex-col px-4 py-1">
                            <RendertextValue title="تلفن همراه" value={patient?.data?.mobile} />
                            <RendertextValue title="تلفن منزل" value={patient?.data?.tel} />
                            <RendertextValue title="شماره واتساپ" value={patient?.data?.mobile2} />
                        </div>
                    </div>
                </div>

                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-1">
                        <span className="font-bold">در صورت مبتلا بودن به هریک از بیماری های زیر مشخص کنید</span>
                    </div>
                </div>
                <div className="border-[1px] border-black">
                    {surveyQuestion.map((item) =>
                        <RenderSurvey title={item.title} />
                    )}
                </div>
                <div className="px-4 py-1">
                    <div className="grid grid-cols-1">
                        <span className="font-bold">کدام یک از داروهای زیر را مصرف می کنید؟</span>
                    </div>
                </div>
                <div className="border-t-[1px] border-l-[1px] border-black grid grid-cols-4">
                    {TakingMedicationList.map((item) =>
                        <RenderTakingMedication title={item.title} />
                    )}
                </div>
                <div className="grid grid-cols-1 mt-4">
                    <div className="flex flex-col">
                        <span className="flent-bold text-lg">علت مراجعه</span>
                        <div className="h-[120px] !w-full border-[1px] border-black rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-4">
                    <p>اینجانب تایید می نمایم کلیه موارد باال را به درستی پاسخ داده ام و بدین وسیله عوارض احتمالی در زمان طول درمان را
                        نیزپذیرفته و از ایشان اعالم برائت می کنم.
                        اطالعات این فرم محرمانه تلقی می گردد و اینجانب موافقت خود را با نگهداری این اطالعات جهت درج در سوابق این مرکز و
                        پیگیری های بعدی ، اعالم مینمایم .
                    </p>
                </div>
                <div className="flex justify-around items-center mt-4">
                    <div>
                        <span className="font-bold">نام و نام خانوادگی</span>
                    </div>
                    <div>
                        <span className="font-bold">تاریخ</span>
                    </div>
                    <div>
                        <span className="font-bold">امضا متقاضی</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MidWirfyFormPrint