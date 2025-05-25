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
            <h4 className="font-bold py-2">{props.title}</h4>
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
            <div ref={printComponentRef} style={{ direction: "rtl", margin: 30 }}>
                <h2 className="text-center font-bold text-2xl">ثبت اطلاعات مراجعه کننده</h2>
                <div className="flex flex-col justify-end items-end mb-4">
                    <span className="font-bold text-lg text-left">شماره : .............................</span>
                    <span className="font-bold text-lg text-left">تاریخ : .............................</span>
                </div>
                <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                    <div className="grid grid-cols-1">
                        <span className="font-bold text-secondary text-lg">مشخصات شخصی</span>
                    </div>
                </div>
                <div className="border-[1px] border-b-0 border-black">
                    <div className="grid grid-cols-3 p-4">
                        <h4 className="font-bold py-2">نام:</h4>
                        <h4 className="font-bold py-2">نام خانوادگی:</h4>
                        <h4 className="font-bold py-2">تاریخ تولد:</h4>
                        <h4 className="font-bold py-2">شماره تماس:</h4>
                        <h4 className="font-bold py-2">آدرس:</h4>
                        <div className="col-span-3">
                            <h4 className="font-bold py-2">معرف:</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                        <div className="grid grid-cols-1">
                            <span className="font-bold text-secondary text-lg">وضعیت خانوادگی</span>
                        </div>
                    </div>
                    <div className="border-[1px] border-b-0 border-black">
                        <div className="grid grid-cols-2 p-4">
                            <h4 className="font-bold py-2">{"وضعیت تاهل؟"}</h4>
                            <h4 className="font-bold py-2">{"تعداد اعضای خانواده؟"}</h4>
                            <h4 className="font-bold py-2">{"چندمین فرزند خانواده؟"}</h4>
                            <h4 className="font-bold py-2">{"نوع ارتباط با اعضای خانواده؟"}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                        <div className="grid grid-cols-1">
                            <span className="font-bold text-secondary text-lg">سابقه پزشکی و روانشناختی</span>
                        </div>
                    </div>
                    <div className="border-[1px] border-b-0 border-black">
                        <div className="grid grid-cols-2 p-4">
                            {TakingMedicationList.map((item) =>
                                <RendertextValue title={item.title} value={""} />
                            )}

                        </div>
                        <div className="pr-4">
                            <h4 className="font-bold pb-2">{"آیا قبلا تحت درمان روانشناختی قرار گرفته اید؟"}</h4>
                            <h4 className="font-bold py-2">{"چه نوع درمانی و برای چه مدتی؟"}</h4>
                            <h4 className="font-bold py-2">{"آیا به اختلال خاصی مانند افسردگی، اضطراب و وسواس مبتلا هستید؟ ئ تست آن را انجام داده اید؟"}</h4>
                            <h4 className="font-bold py-2">{"توضیح دهید که چه زمانی شروع شده و چگونه مدیریت می شود؟"}</h4>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                        <div className="grid grid-cols-1">
                            <span className="font-bold text-secondary text-lg">دلایل مراجعه به مشاوره</span>
                        </div>
                    </div>
                    <div className="border-[1px] border-b-0 border-black">
                        <div className="grid grid-cols-1 p-4">
                            <h4 className="font-bold py-2">{"مشکلات و نگرانی های فعلی؟"}</h4>
                            <h4 className="font-bold py-2">{"انتظارات و نگرانی های فعلی؟"}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="border-[1px] border-b-0 px-4 py-1 border-black">
                        <div className="grid grid-cols-1">
                            <span className="font-bold text-secondary text-lg">تاریخچه زندگی</span>
                        </div>
                    </div>
                    <div className="border-[1px] border-b-0 px-4 py-1 space-y-4 border-black">
                        <div className="grid grid-cols-1 space-y-4">
                            <div className="flex items-center gap-x-2">
                                <h4 className="font-bold">{"وضعیت تحصیلی و شغلی:"}</h4>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <h4 className="font-bold">{"علایق و فعالیت های فراغتی:"}</h4>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <h4 className="font-bold">{"تجربه های خاص یا تروما(Trauma) زندگی:"}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="border-[1px] border-b-0 border-black">
                    </div>
                </div>
            </div>
        </>
    )
}

export default MidWirfyFormPrint1