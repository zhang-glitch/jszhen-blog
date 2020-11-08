import getViewPortOffset from './getWindowSize'
import {useState} from 'react'

let [styleObj, setStyleObj] = useState({})
let [imgStyle, setImgStyle] = useState({})
let [themeStyle, setThemeStyle] = useState({})
let [categoryTheme, setCategoryTheme] = useState({})
let [listLayout, setListLayout] = useState({})
let [topItemMargin, setTopItemMargin] = useState({})
let [bottomItemMargin, setBottomItemMargin] = useState({})
let [sloganSize, setSloganSize] = useState({})
let [bannerBottomMargin, setBannerBottomMargin] = useState({})
let Size = () => {
  let { w } = getViewPortOffset()
  // console.log(w)
  if (w <= 375) {
    setThemeStyle({ fontSize: '.9rem', fontWeight: 800 })
    setCategoryTheme({ fontSize: '.5rem', padding: '.05rem .05rem' })
    setStyleObj({})
    setImgStyle({ display: 'none' })
    setListLayout({})
    setTopItemMargin({})
    setBottomItemMargin({})
    setSloganSize({ fontSize: '.7rem' })
    setBannerBottomMargin({ marginBottom: '3rem' })
  } else if (w > 375 && w < 576) {
    setStyleObj({ display: 'flex', width: '100%', marginTop: '-.8rem' })
    setImgStyle({ width: '80% ', height: '110% ', marginRight: '1rem' })

    setThemeStyle({ fontSize: '1rem', fontWeight: 800 })
    setCategoryTheme({ fontSize: '.8rem', padding: '.1rem .1rem' })
    setListLayout({ display: 'flex', flexDirection: 'row-reverse' })
    setTopItemMargin({ marginBottom: '1rem' })
    setBottomItemMargin({})
    setSloganSize({ fontSize: '.8rem', color: '#b7b8ba' })
    setBannerBottomMargin({})
  } else if (w <= 768 && w >= 576) {
    // deathcomponent响应样式
    setStyleObj({ display: 'flex', width: '100%', marginTop: '-1rem' })
    setImgStyle({ width: '80% ', height: '110% ', marginRight: '1rem' })
    // typelistitem响应样式
    setThemeStyle({ fontSize: '1.2rem' })
    setCategoryTheme({ fontSize: '.8rem', padding: '.1rem .1rem' })
    setListLayout({})
    setTopItemMargin({})
    setBottomItemMargin({})
    setSloganSize({ fontSize: '1rem', color: '#b7b8ba' })
    setBannerBottomMargin({})
  } else if (w > 992 && w <= 1200) {
    setImgStyle({ width: '90% ', height: '110%', marginTop: '15%' })
    setStyleObj({})

    setThemeStyle({ fontSize: '1.4rem' })
    setCategoryTheme({ fontSize: '.8rem', padding: '.2rem .1rem' })
    setListLayout({})
    setTopItemMargin({ marginBottom: '-1rem' })
    setBottomItemMargin({ marginTop: '.6rem' })
    setSloganSize({ fontSize: '1rem', color: '#b7b8ba' })
    setBannerBottomMargin({})
  } else {
    setStyleObj({})
    setImgStyle({})
    setThemeStyle({})
    setCategoryTheme({})
    setListLayout({})
    setTopItemMargin({})
    setBottomItemMargin({})
    setSloganSize({})
    setBannerBottomMargin({})
  }
}

export default Size