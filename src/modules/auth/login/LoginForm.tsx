import Typography from "../../../_cloner/components/typography/Typography";
import { RenderSocialMedia } from "./components/RenderSocialMedia";
import {  useLoginUser } from "./core/_hooks";
import { Formik } from "formik";
import { ILogin } from "./core/_models";
import { toastify } from "../../../_cloner/utils/toast";
import Cookies from "js-cookie";
import FormikInput from "../../../_cloner/components/inputs/FormikInput";
import FormikInputPassword from "../../../_cloner/components/inputs/FormikInputPassword";
import SimpleButton from "../../../_cloner/components/buttons/SimpleButton";

const initialValue: ILogin = {
  userName: "string",
  password: "string",
}

const LoginForm = () => {

  const loginTools = useLoginUser()

  const onSubmit = (values: ILogin) => {
    loginTools.mutate(values, {
      onSuccess(response) {
        if(response.isSuccedded) {
          toastify("success", response.message)
          Cookies.set("token", `${response?.data?.accessToken}`);
          window.location.reload();
        } else {
          toastify("error", response.data.Message)
        }
      },
    })
  }

  return (
    <div className="lg:flex lg:justify-center lg:items-center pt-16 overflow-hidden">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center flex-col space-y-4">
          <Typography
            type="h3"
            text="خوش آمدید"
            typographyTextClassName="text-primary"
          />
          <Typography
            type="bodyMd"
            text="جهت ورود به سامانه لطفا نام کاربری و کلمه عبور خود را وارد نمایید"
            typographyTextClassName="text-primary"
          />
        </div>
          <Formik initialValues={initialValue} onSubmit={onSubmit}> 
            {({handleSubmit}) => <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <FormikInput inputClassName="h-[48px]" type="text" placeholder="نام کاربری" name="userName" />
              <FormikInputPassword inputClassName="h-[48px]" placeholder="رمز عبور" name="password" />
              <SimpleButton btnClassName="h-[48px]" onSubmit={handleSubmit} text={loginTools.isPending ? "درحال پردازش ..." : "ورود"} disabled={loginTools.isPending} />
            </form>}
          </Formik>
        <div className="flex justify-center items-center mt-4">
          <RenderSocialMedia url="/pictures/images/facebook.png" />
          <RenderSocialMedia url="/pictures/images/apple-logo.png" />
          <RenderSocialMedia url="/pictures/images/google.png" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
