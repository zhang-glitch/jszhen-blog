

import React, { useState, useEffect } from 'react'
import '../static/style/components/backImage/backImage.css'

const BackImage = (props) => {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const img = new Image();
    // 发出请求，请求图片
    img.src = props.src;
    // 当图片加载完毕
    img.onload = () => {
      setDone(true)
    }
  }, [])

  let backgroundBlack = done ? null : {background: '#1e1e1e !important'}
  return (
    <div className='main-image' style={backgroundBlack}>
      {props.children}
      {
				done
					?
					
					<img src={props.src} alt={props.alt} style={{height: props.imageHeight}}/>
         
          :
          
          <div className="loader">
          <span className="txt">
            <span>js</span>
            <span>臻</span>
            <span>博</span>
            <span>客</span>
          </span>
        </div>
			}
    </div>

  )
}

export default BackImage