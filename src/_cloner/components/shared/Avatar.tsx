import { FC } from "react"
import { toAbsoulteUrl } from "../../utils/absoluteUrl"

interface IProps {
  avatarDivClassName: string
}

const Avatar:FC<IProps> = ({avatarDivClassName}) => {
  return (
    <div className={`${avatarDivClassName} rounded-full flex items-center justify-center cursor-pointer`}>
        <img src={toAbsoulteUrl('/pictures/images/person.webp')} width={34} height={34} className="rounded-full" />
    </div>
  )
}

export default Avatar