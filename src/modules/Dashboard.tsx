import { Card } from "antd"
import { toAbsoulteUrl } from "../_cloner/utils/absoluteUrl"
import Typography from "../_cloner/components/typography/Typography"

const Dashboard = () => {
  return (
    <Card className="flex justify-center items-center">
      <img src={toAbsoulteUrl('/pictures/images/640-logo.png')} width={240} />
      <Typography text="کلینیک زیبایی به تن رو" type="h2" />
    </Card>
  )
}

export default Dashboard