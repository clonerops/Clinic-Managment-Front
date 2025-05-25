import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useFetchPatientFile } from "../patientFile/core/_hooks";
import { useFetchPatient } from "../patient/core/_hooks";

const LazerFormPrint = () => {
    const { patientId, id }: any = useParams()
    const patient = useFetchPatient()
    const patientDocument = useFetchPatientFile()

    useEffect(() => {
        patient.mutate(patientId)
        patientDocument.mutate(id)
    }, [patientId, id])


    const printComponentRef = useRef<HTMLDivElement | null>(null); 
    const handlePrint = useReactToPrint({ 
        content: () => printComponentRef.current
    });



    const RendertextValue = (props: {title: string, value: any}) => {
        return (
            <div className="select-none flex items-center gap-x-2">
                <h4 className="select-none font-bold">{props.title}: </h4>
                <span className="select-none">{props.value}</span>
            </div>
        )
    }
    const RenderSurvey = (props: {title: string}) => {
        return (
            <div className="select-none grid border-b-[1px] border-black last:border-0 grid-cols-8">
                <div className="select-none col-span-6 px-4 py-1">
                    <h3 className="select-none font-bold">{props.title}</h3>
                </div>
                <div className="select-none border-r-[1px] px-4 py-1 flex flex-row gap-x-2 border-black">
                    <h3 className="select-none font-bold">بله</h3>
                    <div className="select-none w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
                <div className="select-none border-r-[1px] px-4 py-1 flex flex-row gap-x-2 border-black">
                    <h3 className="select-none font-bold">خیر</h3>
                    <div className="select-none w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
            </div>
 )
    }
    const RenderTakingMedication = (props: {title: string}) => {
        return (
                <div className="select-none flex border-r-[1px] border-b-[1px] border-black px-4 py-1">
                    <h3 className="select-none font-bold">{props.title}</h3>
                    <div className="select-none w-[16px] h-[16px] rounded-full bg-transparent border-[1px] border-black"></div>
                </div>
 )
    }


    const surveyQuestion = [
        {id: 1, title: "هموفیلی"},
        {id: 2, title: "دیابت نوع دوم"},
        {id: 3, title: "انواع پروتز دندانی و ایمپلنت"},
        {id: 4, title: "ابتلا به انواع هپاتیت ها"},
        {id: 5, title: "عفونت های تب زا/بیماری های عفونی"},
        {id: 6, title: "مشکلات پوستی در ناحیه مورد درمان"},
        {id: 7, title: "کلوئید(گوشت اضافه)"},
        {id: 8, title: "مشکلات سیستم ایمنی بدن"},
        {id: 9, title: "بیماری های مغز و اعصاب مانند(صرع، میگرن، ام اس)"},
        {id: 10, title: "شیمی درمانی و رادیوتراپی"},
        {id: 11, title: "مشکلات قلبی و عروقی"},
        {id: 12, title: "جراحی پلاستیک و عمومی"},
        {id: 13, title: "ورم دارای التهاب"},
        {id: 14, title: "بارداری و شیردهی"},
        {id: 15, title: "اجازه استفاده از تصویرم برای تولید محتوا میدهم"},
    ]

    const TakingMedicationList = [
        {id: 1, title: "فشارخون"},
        {id: 2, title: "هورمونی"},
        {id: 3, title: "کورتون"},
        {id: 4, title: "رقیق کننده خون"},
        {id: 5, title: "قلب/آسپرین"},
        {id: 6, title: "راکوتان"},
        {id: 7, title: "اعصاب"},
        {id: 8, title: "هیچکدام"},
    ]
    
    if(patientDocument.isPending) {
        return <span>درحال بارگزاری ....</span>
    }

    if(patient.isPending) {
        return <span>درحال بارگزاری ....</span>
    }

  return (
    <>
        <button className="select-none bg-green-500 text-black px-16 py-2" onClick={() => handlePrint()}>پرینت</button>
        <div ref={printComponentRef} style={{direction: "rtl"}}>
            <h2 className="select-none text-center font-bold text-2xl">فرم رضایت انجام خدمات لیزر</h2>
            <span className="select-none font-bold text-lg">تاریخ : .........</span>

            <div className="select-none border-[1px] border-b-0 px-4 py-1 border-black">
                <div className="select-none grid grid-cols-4">
                    <RendertextValue title="نام" value={`${patient?.data?.firstName} `} />
                    <RendertextValue title="نام خانوادگی" value={patient?.data?.lastName} />
                    <RendertextValue title="تاریخ تولد" value={patient?.data?.birthDate} />
                    <RendertextValue title="شماره پرونده" value={patientDocument?.data?.fileCode} />
                </div>
            </div>
            <div className="select-none border-[1px] border-b-0 px-4 py-1 border-black">
                <div className="select-none grid grid-cols-4">
                    <RendertextValue title="شغل" value={patient?.data?.job} />
                    <RendertextValue title="تحصیلات" value={patient?.data?.education} />
                    <RendertextValue title="وضعیت تاهل" value={patient?.data?.maritalStatus == 2 ? " متاهل " : "مجرد"} />
                    <RendertextValue title="معرف" value={patient?.data?.representative} />
                </div>
            </div>
            <div className="select-none border-[1px] border-b-0 border-black">
                <div className="select-none grid grid-cols-4 ">
                    <div className="select-none col-span-3 border-l-[1px] border-black px-4 py-1">
                        <RendertextValue title="نشانی" value={patient?.data?.address} />
                    </div>
                    <div className="select-none flex gap-y-2 flex-col px-4 py-1">
                        <RendertextValue title="تلفن همراه" value={patient?.data?.mobile} />
                        <RendertextValue title="تلفن منزل" value={patient?.data?.tel} />
                        <RendertextValue title="شماره واتساپ" value={patient?.data?.mobile2} />
                    </div>
                </div>
            </div>

            <div className="select-none border-[1px] border-b-0 px-4 py-1 border-black">
                <div className="select-none grid grid-cols-1">
                    <span className="select-none font-bold">در صورت مبتلا بودن به هریک از بیماری های زیر مشخص کنید</span>
                </div>
            </div>
            <div className="select-none border-[1px] border-black">
                {surveyQuestion.map((item) => 
                    <RenderSurvey title={item.title} />
                )}
            </div>
            <div className="select-none px-4 py-1">
                <div className="select-none grid grid-cols-1">
                    <span className="select-none font-bold">کدام یک از داروهای زیر را مصرف می کنید؟</span>
                </div>
            </div>
            <div className="select-none border-t-[1px] border-l-[1px] border-black grid grid-cols-4">
                {TakingMedicationList.map((item) => 
                    <RenderTakingMedication title={item.title} />
                )}
            </div>
            <div className="select-none px-4 py-1">
                <div className="select-none grid grid-cols-1">
                    <span className="select-none font-bold">متقاضی کدام یک از موارد زیر هستید؟</span>
                </div>
            </div>
            <div className="select-none grid grid-cols-1 mt-4">
                <p>اینجانب تایید می نمایم رضایت نامه را با دقت خوانده و درک نموده ام و پزشک به کلیه سوال های اینجانب به صورت شفاف
                    پاسخ داده و زمان کافی برای اخذ این تصمیم را داشته ام همچنین تایید می کنم که در خصوص موارد منع استفاده ، روند
                    درمان ، عواقب احتمالی ،پیگیری های آینده درمان ، مزایا و معایب و روش های موجود کامل مطلع شده ام .همچنین نحوه
                    انجام نیز مورد تایید اینحانب می باشد و بدین وسیله عوارض احتمالی در زمان طول درمان را نیز پذیرفته و از ایشان اعلام
                    برائت می کنم. اطلاعات این فرم محرمانه تلقی می گردد و اینجانب موافقت خود را با نگهداری این اطلاعات جهت درج در
                    سوابق این مرکز و پیگیری های بعدی ، اعلام مینمایم
                </p>
            </div>
            <div className="select-none flex justify-around items-center mt-4">
                <div>
                    <span className="select-none font-bold">نام و نام خانوادگی</span>
                </div>
                <div>
                    <span className="select-none font-bold">تاریخ</span>
                </div>
                <div>
                    <span className="select-none font-bold">امضا متقاضی</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default LazerFormPrint