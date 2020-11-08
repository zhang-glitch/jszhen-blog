
import '../static/style/components/deathcomponent/deathcomponent.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const DeathComponent = ({ deathData, imgStyle, styleObj }) => {
  // let [mobileImgStyle, setMobileImgStyle] = useState({})
  // let [mobileStyleObj, setMobileStyleObj] = useState({})
  // useEffect(() => {
  //   let w = window.innerWidth
  //   if (w == 375 || w == 360) {
  //     setMobileStyleObj({ display: 'flex', width: '100%' })
  //     setMobileImgStyle({ width: '80% ', height: '100% ', marginRight: '.5rem', marginTop: '2.7rem' })
  //   } else if (w == 414 || w == 411 || w == 450) {
  //     setMobileStyleObj({ display: 'flex', width: '100%', marginTop: '-.8rem' })
  //     setMobileImgStyle({ width: '80% ', height: '110% ', marginRight: '1rem', marginTop: '2rem' })
  //   } else if (w == 768) {
  //     setMobileStyleObj({ display: 'flex', width: '100%', marginTop: '-1rem' })
  //     setMobileImgStyle({ width: '80% ', height: '110% ', marginRight: '1rem', marginTop: '2rem' })
  //   }
  // }, [])
  return (
    <div className="death-component" style={styleObj}>
      <div className='top-img' style={imgStyle}>
        <a href={deathData[0].data_link}>
          <img src={deathData[0].data_image} alt={deathData[0].data_theme} />
          <span className='bottom-text'>{deathData[0].data_theme}</span>
        </a>
        <Link href={{ pathname: deathData[0].data_link }}>
          <a >
            <div className="mask"></div>
          </a>
        </Link>
      </div>
      <div className='bottom-img' style={imgStyle}>
        <a href={deathData[1].data_link}>
          <img src={deathData[1].data_image} alt={deathData[1].data_theme} />
          {/* <img src="../static/style/components/deathcomponent/family.jpg" alt="一家五口人"/> */}
          <span className='bottom-text'>{deathData[1].data_theme}</span>
        </a>
        <Link href={{ pathname: deathData[1].data_link }}>
          <a >
            <div className="mask"></div>
          </a>
        </Link>

      </div>
    </div>
  )
}

export default DeathComponent