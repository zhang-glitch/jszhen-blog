
import { Carousel } from 'antd'
import {BankFilled, EnvironmentFilled, GlobalOutlined, } from '@ant-design/icons'

import '../static/style/components/school/school.css'
import reqUrl from '../network/url'
import axios from 'axios'
import {useState, useEffect} from 'react'

function School() {

  let [schoolData, setSchoolData] = useState([])

  useEffect(() => {
    // 注意这里是异步，里面还要用一个函数包裹
    const fetchData = async () => {
      const { data } = await axios(reqUrl.school)
      await setSchoolData(data.data)
      // console.log(schoolData)//useState中的值是异步设置的，而不能立刻获得
    }

    fetchData()
  }, []) 

  return (
    <div className='school'>
      <Carousel autoplay>
      {
         schoolData.map(item => ( <div key={item.Id}>
          <a href={item.website} target="_blank"><img src={item.image} /></a>
        </div>))
       }
      </Carousel>
      <div className='detailedIntroduction'>
        <p>
          <BankFilled />&nbsp;
          {schoolData[0] ? schoolData[0].schoolName : '渤海大学'}
        </p>
        <p>
          <EnvironmentFilled />&nbsp;
          {schoolData[0] ? schoolData[0].local : '辽宁省锦州市'}
        </p>
        <p>
          <GlobalOutlined />&nbsp;
          {schoolData[0] ? schoolData[0].website : 'http://www.bhu.edu.cn'}
        </p>
      </div>
    </div>
  )
}

export default School