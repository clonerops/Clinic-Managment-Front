import { toAbsoulteUrl } from "../_cloner/utils/absoluteUrl";

const ErrorsPage = () => {
  return (
    <div className="mx-auto !w-fit">
      <img alt="sepehriranian"
        src={toAbsoulteUrl("/media/images/404.jpg")}
        className={"w-[400px]"}
      />
    </div>
  );
};

export default ErrorsPage;
