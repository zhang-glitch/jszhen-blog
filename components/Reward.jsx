
import { Button, Modal } from 'antd'
import { useState } from 'react'
import '../static/style/components/reward/reward.css'
import IconFont from './IconFont'


export default function Reward() {

  // 判断点击按钮后显示收钱二维码
  let [isShow, setIsShow] = useState(false)
  let [changeMoney, setChangeMoney] = useState("wechat")
  let [weChatIcon, setWeChatIcon] = useState("iconweixinzhifu")
  let [alipayIcon, setAlipayIcon] = useState("iconicon-zhifubao")
  // 显示收款码
  let handleClick = () => {
    setIsShow(!isShow)
  }

  // 点击x关闭收款码
  let handleCancel = () => {
    setIsShow(false)
  }

  let handleWechat = () => {
    console.log(changeMoney)
    // true表示微信
    setChangeMoney("wechat")
    // 支付宝不高亮
    setAlipayIcon("iconicon-zhifubao")
    // 设置高亮微信
    setWeChatIcon('iconweixinzhifu')
    
  }

  let handleAlipay = () => {
    console.log(changeMoney)
    // true表示微信
    setChangeMoney("alipay")
    // 微信不高亮
    setWeChatIcon("iconweixinzhifu1")
    // 设置高亮支付宝
    setAlipayIcon('iconicon_zhifubao')
    
  }

  return (
    <>
      <div className="collect-money" >
        <div className="inner-item">
          <p>"你的支持，是对我最大的鼓励！"</p>
          <Button className="btn-money" type="primary" size="large" onClick={handleClick}>
            <IconFont type="iconshang" />
            <span>赞赏支持</span>
          </Button>
        </div>
      </div>

      <Modal visible={isShow} footer={null} onCancel={handleCancel} width="300px" className="isShow-item">
        <div className="content-img">
          {
            changeMoney && changeMoney == 'wechat' ? <img src="../static/style/pages/detail/wechat.png" /> : <img src="../static/style/pages/detail/alipay.png" />
          }
        </div>
        <div className="option-btn">
          <span className="wechat-btn" onClick={(e) => {handleWechat(e)}}>
            <IconFont type={weChatIcon} />
            <span>微信</span>
          </span>
          <span className="alipay-btn" onClick={(e) => {handleAlipay(e)}}>
            <IconFont type={alipayIcon} />
            <span>支付宝</span>
          </span>
        </div>
      </Modal>
    </>
  )
}