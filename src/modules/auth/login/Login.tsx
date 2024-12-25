import Typography from "../../../_cloner/components/typography/Typography";
import LoginForm from "./LoginForm";
import LoginStatic from "./components/LoginStatic";

const Login = () => {
  return (
    <>
      {/* Web Screen  */}
      <div className="bg-primary w-full h-screen hidden lg:block overflow-hidden">
        <div className="grid grid-cols-2 gap-x-8">
          <div className="h-[96%]">
            <div className="bg-[#e4e4e4] w-full h-full m-4 rounded-md">
              <div className="p-16">
                <Typography
                  type="h2"
                  text="سامانه مدیریت کلینیک به تن رو"
                  typographyTextClassName="text-secondary"
                />
                <LoginForm />
              </div>
            </div>
          </div>
          <div className="h-screen bg-login-pattern">
            <LoginStatic />
          </div>
        </div>
      </div>
      {/* Mobile Screen */}
      <div className="bg-primary  bg-login-pattern w-full h-screen block lg:hidden overflow-hidden">
        <div className="w-full h-full mr-auto flex items-center justify-center">
          <div className="bg-white border-[1px] box-shadow shadow-sm rounded-[10px] hadow-[#4E68C2] w-[80%] shrink-0  py-8 h-fit p-8">
            <Typography
              type="h2"
              text="سامانه مدیریت کلینیک به تن رو"
              typographyTextClassName="text-secondary"
            />
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
