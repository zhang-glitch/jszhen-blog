import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Col, Row, List, Card } from 'antd'
import { useState, useEffect } from 'react'
import DailySentence from '../components/DailySentence'
import School from '../components/School'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import MyBackTop from '../components/MyBackTop'
import axios from 'axios'
import reqUrl from '../network/url'
import '../static/style/pages/index/index.css'
const Header = dynamic(import('../components/Header'))
const BackImage = dynamic(import('../components/BackImage'))
const Banner = dynamic(import('../components/Banner'))
const TypeListItem = dynamic(import('../components/TypeListItem'))
const SelfIntroduction = dynamic(import('../components/SelfIntroduction'))
const Layout = dynamic(import('../components/Layout'))
import DeathComponent from '../components/DeathComponent'
import throttle from '../static/utils/throttle'
import getViewPortOffset from '../static/utils/getWindowSize'
// import Size from '../static/utils/auto'

import debounce from '../static/utils/debounce'

export default function Index({ indexListData, deathData }) {
  let [listDate, setListDate] = useState(indexListData)
  // nav的整体背景
  let [backgroundColor, setBackgroundColor] = useState('#1e1e1e')
  // 导航按钮的背景
  let [menuBckColor, setMenuBckColor] = useState('#1e1e1e')
  // nav的透明度
  let [opacity, setOpacity] = useState(0.8)
  // 导航按钮的字体颜色
  let [navBtnColor, setNavBtnColor] = useState('#fff')
  // logo的小字
  let [headerTxt, setHeaderTxt] = useState('#fff')
  // 监听鼠标的滚动事件
  function Scroll(e) {
    // 节流函数
    let top = document.documentElement.scrollTop
    // console.log(top)
    if (top > 200) {
      setBackgroundColor('#ffffff')
      setOpacity(1)
      setMenuBckColor('#ffffff')
      setNavBtnColor('#000000')
      setHeaderTxt('#000000')
    } else {
      setBackgroundColor('#1e1e1e')
      setOpacity(0.8)
      setMenuBckColor('#1e1e1e')
      setNavBtnColor('#fff')
      setHeaderTxt('#fff')
    }
  }

  // 死数据整体部分
  let [styleObj, setStyleObj] = useState({})
  // 死数据图片部分
  let [imgStyle, setImgStyle] = useState({})
  // 列表数据的标题部分
  let [themeStyle, setThemeStyle] = useState({})
  // 列表数据的标签部分
  let [categoryTheme, setCategoryTheme] = useState({})
  // 列表数据的布局
  let [listLayout, setListLayout] = useState({})
  // 列表数据右侧的顶部标题
  let [topItemMargin, setTopItemMargin] = useState({})
  // 列表数据右侧的底部标签
  let [bottomItemMargin, setBottomItemMargin] = useState({})
  // 列表数据右侧中间标签
  let [sloganSize, setSloganSize] = useState({})
  // banner部分
  let [bannerBottomMargin, setBannerBottomMargin] = useState({})
  // 列表整体部分的margin-top
  let [listMarginTop, setListMarginTop] = useState({})
  // 列表右侧部分的margin-left
  let [listRightMarginLeft, setListRightMarginLeft] = useState({})
  // 获取可视窗口大小 (这里只能写函数表达式，我也不知道为什么)
  let Size = () => {
    let { w } = getViewPortOffset()
    console.log(w)
    if (w <= 375) {
      // setThemeStyle({ fontSize: '.9rem', fontWeight: 800 })
      // setCategoryTheme({ fontSize: '.5rem', padding: '.05rem .05rem' })
      // setStyleObj({ display: 'flex', width: '100%' })
      // setImgStyle({ width: '80% ', height: '100% ', marginRight: '.5rem', marginTop: '2.7rem' })
      // setListLayout({ display: 'flex', flexDirection: 'row-reverse' })
      // setListRightMarginLeft({ marginLeft: '1rem' })
      setListMarginTop({})
      setTopItemMargin({})
      setBottomItemMargin({})
      // setSloganSize({ fontSize: '.7rem', color: '#b7b8ba', width: '10rem' })
      // setBannerBottomMargin({ marginBottom: '3rem', marginTop: '2.3rem' })
    } else if (w > 375 && w < 576) {
      // // setStyleObj({ display: 'flex', width: '100%', marginTop: '-.8rem' })
      // setImgStyle({ width: '80% ', height: '110% ', marginRight: '1rem', marginTop: '3.5rem' })
      // setListMarginTop({ marginTop: '2rem' })
      // setListRightMarginLeft({ marginLeft: '1rem' })

      // setThemeStyle({ fontSize: '1rem', fontWeight: 800 })
      // setCategoryTheme({ fontSize: '.8rem', padding: '.1rem .1rem' })
      // setListLayout({ display: 'flex', flexDirection: 'row-reverse' })
      // setTopItemMargin({ marginBottom: '1rem' })
      setBottomItemMargin({})
      // setSloganSize({ fontSize: '.8rem', color: '#b7b8ba', width: '11.8rem' })
      // setBannerBottomMargin({ marginTop: '2.3rem' })
    } else if (w <= 768 && w >= 576) {
      // deathcomponent响应样式
      // setStyleObj({ display: 'flex', width: '100%', marginTop: '-1rem' })
      // setImgStyle({ width: '80% ', height: '110% ', marginRight: '1rem', marginTop: '3rem' })
      // typelistitem响应样式
      // setThemeStyle({ fontSize: '1.2rem'})
      setListRightMarginLeft({})
      // setCategoryTheme({ fontSize: '.8rem', padding: '.1rem .1rem' })
      setListLayout({})
      // setListMarginTop({ marginTop: '2rem' })
      setTopItemMargin({})
      setBottomItemMargin({})
      // setSloganSize({ fontSize: '1rem', color: '#b7b8ba', width: '11.8rem' })
      // setBannerBottomMargin({ marginTop: '2.3rem' })
    } else if (w > 992 && w <= 1200) {
      // setImgStyle({ width: '90% ', height: '48%', marginTop: '7%' })
      setStyleObj({})
      setListMarginTop({})
      setListRightMarginLeft({})

      // setThemeStyle({ fontSize: '1.4rem' })
      // setCategoryTheme({ fontSize: '.8rem', padding: '.2rem .1rem' })
      setListLayout({})
      setListRightMarginLeft({})
      // setTopItemMargin({ marginBottom: '-1rem' })
      // setBottomItemMargin({ marginTop: '.6rem' })
      // setSloganSize({ fontSize: '1rem', color: '#b7b8ba' })
      setBannerBottomMargin({})
    } else {
      setStyleObj({})
      setImgStyle({})
      setListMarginTop({})
      setListRightMarginLeft({})
      setThemeStyle({})
      setCategoryTheme({})
      setListLayout({})
      setTopItemMargin({})
      setBottomItemMargin({})
      setSloganSize({})
      setBannerBottomMargin({})
    }
  }

  useEffect(() => {
    //监听滚动
    window.addEventListener('scroll', throttle(Scroll))
    // 监听窗口改变
    window.addEventListener('resize', debounce(Size, 600))

    // let w = window.innerWidth
    // if (w <= 375) {
    //   setImgStyle({ display: 'none' })
    //   setBannerBottomMargin({ marginBottom: '3rem' })
    // }
    // debounce(Size, 600)
  }, [])

  return (
    <>
      <Head>
        <title>首页列表-js臻博客-臻昊</title>
      </Head>
      {/* 头部导航 */}
      <Header backgroundColor={backgroundColor} opacity={opacity} menuBckColor={menuBckColor} navBtnColor={navBtnColor} headerTxt={headerTxt} />
      {/* 背景图，等风也等你 */}
      <Row justify='center' type='flex'>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} >
          <BackImage background={true} src="http://cdn.lululuting.com/ae90d560-ccd1-11ea-8da5-110c1182d541?imageslim"><span>我们的目标是星辰大海 ！</span></BackImage>
        </Col>
      </Row>
      {/* 第一部分  banner部分*/}
      <Row justify='center' type='flex' className='mainIndex'>
        {/* 左边 */}
        <Col xs={24} sm={24} md={16} lg={16} xl={14} className="banner-style">
          <Banner bannerBottomMargin={bannerBottomMargin} />
        </Col>
        {/* 右边 */}
        <Col xs={24} sm={24} md={7} lg={7} xl={6} >
          <DeathComponent deathData={deathData} styleObj={styleObj} imgStyle={imgStyle} />
        </Col>
      </Row>

      {/* 第二部分  typelist部分*/}
      <Row justify='center' type='flex' className='mainIndex'>
        {/* 左边 */}
        <Col xs={24} sm={24} md={24} lg={16} xl={15} style={listMarginTop}>
          <Card className='commonLeft index-list-top'>
            <List
              itemLayout="vertical"
              split={false}
              header={<div className="latest-list">全部</div>}
              dataSource={listDate}
              renderItem={item => (
                <List.Item
                  key={item.title}
                >
                  <TypeListItem item={item} themeStyle={themeStyle} categoryTheme={categoryTheme} listLayout={listLayout} topItemMargin={topItemMargin} bottomItemMargin={bottomItemMargin} sloganSize={sloganSize} listRightMarginLeft={listRightMarginLeft} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        {/* 右边 */}
        <Col xs={0} sm={0} md={0} lg={6} xl={5} >
          <Card className='commonRight index-list-top' title={<div>菜鸡博主</div>}>
            <SelfIntroduction data={indexListData} />
          </Card>
          <Card className='commonRight' title={<div>每日一句</div>}>
            <DailySentence />
          </Card>
          <Card className='commonRight' title={<div><a href="http://www.bhu.edu.cn/fpage/pgeneral/index.asp" style={{ color: "#000000" }}>我的大学</a></div>}>
            <School />
          </Card>
          <Card className='commonRight' title={<div>广告</div>}>
            <Advert />
          </Card>
        </Col>
      </Row>
      <MyBackTop />
      <Footer />
    </>
  )
}


// 请求数据
Index.getInitialProps = async () => {
  const { data } = await axios({
    url: reqUrl.index,
    withCredentials: true
  })
  // console.log(data)
  // 请求首页的死数据
  const res = await axios({
    url: reqUrl.getDeathData
  })
  return {
    // 首页列表数据
    indexListData: data.data,
    // banner侧边数据
    deathData: res.data.data
  }
}