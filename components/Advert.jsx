
import '../static/style/components/advert/advert.css'
import {useState, useEffect} from 'react'
import axios from "axios"
import reqUrl from '../network/url'

function Advert() {
  let [advertData, setAdvertData] = useState([])
  useEffect(() => {
    // 注意这里是异步，里面还要用一个函数包裹
    const fetchData = async () => {
      const { data } = await axios(reqUrl.advert)
      setAdvertData(data.data[0])
    }

    fetchData()
  }, [])
  return (
    <div className='advert-img'>
      <div><a href={advertData.advLink}><img src={advertData.image} width='100%' /></a></div>
    </div>
  )
}

export default Advert