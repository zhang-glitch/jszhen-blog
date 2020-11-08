import '../static/style/components/selfintroduction/selfintroduction.css'
import { Tag, Divider, Avatar, Popover } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import reqUrl from '../network/url'
import CountTo from 'react-count-to'

function SelfIntroduction({ data }) {
  // 文章总数，由于这样统计效率较低
  // let total = data ? data.length : 0
  // let viewTotal = 0
  // let starToTal = 0
  // if (data && data.length !== 0) {
  //   for (let item of data) {

  //     viewTotal += item.view_count
  //     starToTal += item.star
  //   }
  // }
  let [allStar, setAllStar] = useState(0)
  let [allArticle, setAllArticle] = useState(0)
  let [allViewCount, setAllViewCount] = useState(0)
  // 请求网站的一些统计
  let getStat = async () => {
    let { data } = await axios(reqUrl.getAllArticleCount)
    // console.log(data)
    setAllArticle(data.data[0].allArticle)
    setAllStar(data.data[0].allStar)
    setAllViewCount(data.data[0].allViewCount)
  }

  // 操作音乐
  let [bgControl, setBgControl] = useState(true)
  let avatar = useRef()
  let playRef = useRef()
  //  console.log(playRef.current.style)
  let audioRef = useRef()
  //  console.log('playRef', playRef)
  //  console.log('audioRef', audioRef)
  // 转动样式
  useEffect(() => {
    var timer = null
    playRef.current.onclick = () => {
      if (audioRef.current.paused) {
        audioRef.current.play()
        setBgControl(false)
        let i = 0
        timer = setInterval(function () {
          (i == 360) ? i = 0 : i++;
          if (avatar.current) {
            avatar.current.style.transform = "rotate(" + i + "deg)"
          }
        }, 30)
      } else {
        audioRef.current.pause()
        setBgControl(true)
        clearInterval(timer)
      }
    }

    // 发出请求
    getStat()
  }, [])

  return (
    <div className='self-introduction'>
      <div className='head-portrait' ref={avatar}>
        <div className="btn-bg"></div>
        <div className="play" ref={playRef} style={{ backgroundImage: bgControl ? 'url("../static/style/components/selfintroduction/control.png")' : 'none' }}>
          <audio src="../static/style/components/selfintroduction/music.mp3" loop ref={audioRef}></audio>
        </div>
      </div>
      <h3>js臻</h3>
      <p>前端小白,希望可以找到自己的定位</p>
      <div className='tags'>
        <Tag color="magenta">小白</Tag>
        <Tag color="purple">前端img</Tag>
        <Tag color="cyan">加油</Tag>
        <Tag color="blue">
          总访问 <CountTo to={allViewCount} speed={1000} /> 次
        </Tag>
        {/* {
          <span id="busuanzi_value_site_pv"></span> ? 
          <Tag color="blue">
            <span id="busuanzi_container_site_pv"  style={{display:'none'}}>
              本站总访问量<span id="busuanzi_value_site_pv"></span>
              次</span>
          </Tag> : null
        } */}
        <Tag color="orange">
          收获 <CountTo to={allStar} speed={1000} /> 赞
        </Tag>
        <Tag color="green">
          文章共 <CountTo to={allArticle} speed={1000} /> 篇
        </Tag>
      </div>
      <Divider plain>社交账号</Divider>
      <div className='social'>
        <Avatar size={28}
          icon={
            <Popover placement="top" content={'github: https://github.com/zhang-glitch'}>
              <a href="https://github.com/zhang-glitch" target="_blank" className="goto-github"><GithubOutlined /></a>
            </Popover>}
          className="account"
        ></Avatar>
        <Avatar size={28}
          icon={
            <Popover placement="top" content={'QQ: 669638556'}>
              <QqOutlined />
            </Popover>}
          className="account"
        ></Avatar>
        <Avatar size={28}
          icon={
            <Popover placement="top" content={'wechat: ZH-zhenshang'}>
              <WechatOutlined />
            </Popover>}
          className="account"
        ></Avatar>
      </div>
    </div>
  )
}

export default SelfIntroduction
