import { Card } from "antd"
import React, { FC } from "react"

interface IProps {
    children: React.ReactNode
}

const CardWidget:FC<IProps> = ({children}) => {
  return (
    <Card>
        {children}
    </Card>
  )
}

export default CardWidget