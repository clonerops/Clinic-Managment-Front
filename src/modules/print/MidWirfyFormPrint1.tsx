import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const MidWirfyFormPrint1 = () => {

    const printComponentRef = useRef<HTMLDivElement>(null);

    const handlePrint: any = useReactToPrint({
        content: (): HTMLDivElement | null => {
            return printComponentRef.current;
        }
    } as any);

    const RendertextValue = (props: { title: string, value: any }) => {
        return (
            <div className="flex items-center gap-x-2">
                <h4 className="font-bold">{props.title}</h4>
                <span>{props.value}</span>
            </div>
        )
    }


    const RenderTakingMedication = (props: { title: string }) => {
        return (
            <div className="flex border-b-[1px] border-black py-1">
                <h3 className="font-bold">{props.title}</h3>
            </div>
        )
    }

    const TakingMedicationList = [
        { id: 1, title: "سابقه بیماری های جسمی؟" },
        { id: 2, title: "سابقه بیماری روانی؟" },
        { id: 3, title: "سابقه مصرف داروهای خاص؟" },
        { id: 4, title: "سابقه بستری شدن در بیمارستان؟" },
    ]


    return (
        <>
            <button className="bg-green-500 text-black px-16 py-2" onClick={handlePrint}>پرینت</button>
            <div ref={printComponentRef} style={{ direction: "rtl" }}>
                <h2 className="text-center font-bold text-2xl">ثبت اطلاعات مراجعه کننده</h2>
                <span className="font-bold text-lg">تاریخ : .........</span>

                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-4">
                        <RendertextValue title="نام" value={""} />
                        <RendertextValue title="نام خانوادگی" value={""} />
                        <RendertextValue title="تاریخ تولد" value={""} />
                        <RendertextValue title="معرف" value={""} />
                    </div>
                </div>
                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-2">
                        <RendertextValue title="شماره تماس" value={""} />
                        <RendertextValue title="آدرس" value={""} />
                    </div>
                </div>
                <div>
                    <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                        <div className="grid grid-cols-1">
                            <span className="font-bold text-secondary">سابقه پزشکی و روانشناختی</span>
                        </div>
                    </div>
                    <div className="border-[1px] border-b-0 px-4 py-1 space-y-8 border-black">
                        <div className="grid grid-cols-2 space-y-8">
                            {TakingMedicationList.map((item) =>
                                <RendertextValue title={item.title} value={""} />
                            )}

                        </div>
                        <div className="flex items-center gap-x-2">
                            <h4 className="font-bold">{"آیا قبلا تحت درمان روانشناختی قرار گرفته اید؟"}</h4>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <h4 className="font-bold">{"چه نوع درمانی و برای چه مدتی؟"}</h4>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <h4 className="font-bold">{"آیا به اختلال خاصی مانند افسردگی، اضطراب و وسواس مبتلا هستید؟ ئ تست آن را انجام داده اید؟"}</h4>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <h4 className="font-bold">{"توضیح دهید که چه زمانی شروع شده و چگونه مدیریت می شود؟"}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                        <div className="grid grid-cols-1">
                            <span className="font-bold text-secondary">وضعیت خانوادکی</span>
                        </div>
                    </div>
                    <div className="border-[1px] border-b-0 px-4 py-1 space-y-4 border-black">
                        <div className="grid grid-cols-2 space-y-4">
                            <div className="flex items-center gap-x-2">
                                <h4 className="font-bold">{"وضعیت تاهل؟"}</h4>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <h4 className="font-bold">{"تعداد اعضای خانواده؟"}</h4>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <h4 className="font-bold">{"چندمین فرزند خانواده؟"}</h4>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <h4 className="font-bold">{"نوع ارتباط با اعضای خانواده؟"}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MidWirfyFormPrint1