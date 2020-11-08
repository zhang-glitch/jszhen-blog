
import { List, Card, Breadcrumb, Empty } from 'antd'
import { useState, useEffect } from 'react'


import '../static/style/pages/detail/detail.css'
import axios from 'axios'
import reqUrl from '../network/url'
import TypeListItem from '../components/TypeListItem'
import Link from "next/link"
import BackImage from '../components/BackImage'
import Layout from '../components/Layout'
import Header from '../components/Header'


export default function TypeList({ data }) {
  const [typeList, setTypeList] = useState(data)
  // 每当我们点击按钮，就是一次重新渲染，这样我们就可以更新页面了
  useEffect(() => {
    setTypeList(data)
  })
  return (
    <>
      {
        typeList[0] ? <>
          {
            typeList[0] ? <>
              <div className='detail-background'>
                <BackImage src="..\static\style\components\banner\banner3.jpg" imageHeight="18rem" />
              </div>
              <Layout
                pageTitle={typeList[0].typeName + "列表-js臻-臻昊"}
                bottomChildren={
                  <Card className='commonLeft'>
                    <List
                      itemLayout="vertical"
                      header={<div className="latest-list">
                        <Breadcrumb>
                          <Breadcrumb.Item>
                            <Link href={{ pathname: '/' }}>
                              <a >首页</a>
                            </Link>
                          </Breadcrumb.Item>
                          <Breadcrumb.Item style={{ fontSize: "1.2rem" }}>{typeList[0].typeName}</Breadcrumb.Item>
                        </Breadcrumb>
                      </div>}
                      dataSource={typeList}
                      renderItem={item => (
                        <List.Item
                          key={item.title}
                        >
                          <TypeListItem item={item} />
                        </List.Item>
                      )}
                    />
                  </Card>
                }
              />
            </> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          }
        </> :

          <>
            <Header />
            <Card className="commonLeft">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="no-data"/>
           </Card>
          </>
      }
    </>
  )
}

// 请求数据
TypeList.getInitialProps = async (context) => {
  console.log(context)
  // 获取nav的id
  const id = context.query.id
  const { data } = await axios(reqUrl.typelist + id)
  console.log(data)
  // 这里的内部数据在data中
  return data
}


