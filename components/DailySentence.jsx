import '../static/style/components/dailysentence/dailysentence.css'
import reqUrl from '../network/url'
import axios from 'axios'
import {useState, useEffect} from 'react'

function DailySentence() {
  
  let [daySentenceDate, setDaySentenceDate] = useState({})

  useEffect(() => {
    // 注意这里是异步，里面还要用一个函数包裹
    const fetchData = async () => {
      const { data } = await axios(reqUrl.daysentence)
      setDaySentenceDate(data.data[0])
    }

    fetchData()
  }, []) 

  return (
    <div className='sentence'>
      <img src={daySentenceDate.image} />
      <p>{daySentenceDate.text}</p>
    </div>
  )
}

export default DailySentence