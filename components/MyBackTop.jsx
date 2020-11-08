import { BackTop } from 'antd'
import '../static/style/components/backtop/backtop.css'
import IconFont from './IconFont'

export default function MyBackTop() {
  return (
    <BackTop className="back-top" duration={1000}>
      <IconFont type="iconback-top"/>
    </BackTop>
  )
}