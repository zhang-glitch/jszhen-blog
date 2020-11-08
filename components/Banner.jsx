import { Carousel } from 'antd'
import '../static/style/components/banner/banner.css'
import '../static/style/components/school/school.css'
import reqUrl from '../network/url'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

let Banner = ({ bannerBottomMargin }) => {

  let [bannerData, setBannerData] = useState([])
  const [done, setDone] = useState(false)

  let carouselRef = useRef()

  const bannerSetting = {
    dots: true,
    lazyLoad: true,
    autoplay: true,
    centerPadding: "120px",
  };

  // let [mobileBannerBottomMargin, setMobileBannerBottomMargin] = useState({})

  useEffect(() => {
    // 注意这里是异步，里面还要用一个函数包裹
    const fetchData = async () => {
      const { data } = await axios(reqUrl.banner)
      // 异步加载图片
      data.data.forEach(item => {
        const img = new Image();
        // 发出请求，请求图片
        img.src = item.image;
        // 当图片加载完毕
        img.onload = () => {
          setDone(true)
        }
      })
      await setBannerData(data.data)
      // useState 返回的更新状态方法是异步的，要在下次重绘才能获取新值。不要试图在更改状态之后立马获取状态。
      // console.log(bannerData)//这里显示的是无数据，为什么下面还可以对齐便利呢
    }

    fetchData()


    //   // 移动端
    //   let w = window.innerWidth
    //   if (w == 375 || w == 360) {
    //     setMobileBannerBottomMargin({ marginBottom: '3rem' })
    //   }else if( w == 414 || w == 320 || w == 411 || w == 450){
    //     setMobileBannerBottomMargin({ marginBottom: '4.5rem' })
    //   }else if(w == 768) {
    //     setMobileBannerBottomMargin()
    //   }else if(w == 1024) {
    //     setMobileBannerBottomMargin()
    //   }
  }, [])

  return (
    <div className='mainBanner' style={bannerBottomMargin}>
      {
        bannerData.length && bannerData ? <Carousel {...bannerSetting} arrows ref={carouselRef} dots={true} dotPosition={"top"}>
          {
            done ? bannerData.map(item => (
              <div key={item.Id} className="banner-mark">
                <img src={item.image} />
                <div className="mask"></div>
              </div>
            )) : null
          }
        </Carousel> : null
      }
      {
        bannerData && bannerData.length ? <>
          <span className="left-arrows" onClick={() => { carouselRef.current.slick.slickPrev() }}><LeftOutlined /> </span>
          <span className="right-arrows" onClick={() => { carouselRef.current.slick.slickNext() }}><RightOutlined /></span>
        </> : null
      }
    </div>
  )
}

export default Banner