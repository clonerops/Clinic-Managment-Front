import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Typography from "../_cloner/components/typography/Typography";
import { toAbsoulteUrl } from "../_cloner/utils/absoluteUrl";

const handleLogout = () => {
  Cookies.remove("token");
  window.location.reload();
}

const AccessDenied = () => {
  return (
    <div className={"flex flex-col items-center justify-center space-y-4"}>
      <Typography text="دسترسی غیرمجاز" type="h2" />
      <h3>شما دسترسی های لازم برای انجام عملیات روی صفحه مورد نظر را ندارید! لطفا با پشتیبانی تماس بگیرید</h3>
      <img alt="sepehriranian"
        src={toAbsoulteUrl("/media/images/access-denied.jpg")}
        className={"w-[400px]"}
      />

      <div className="flex flex-row gap-x-8">
        <div>
          <Link to={"/dashboard"}>
            <button
              type={"button"}
              className={
                "rounded-[12px] bg-purple-900 !text-white leading-9 !px-5 !py-1 mt-5"
              }
            >
              برگشت به صفحه اصلی
            </button>
          </Link>
        </div>
        <div>
            <button
              type={"button"}
              onClick={() => handleLogout()}
              className={
                "rounded-[12px] bg-indigo-900 !text-white leading-9 !px-5 !py-1 mt-5"
              }
            >
              خروج از برنامه
            </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
