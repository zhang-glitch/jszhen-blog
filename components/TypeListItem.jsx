import '../static/style/components/typelistitem/typelistitem.css'
import { Tag, Row, Col, Divider } from 'antd';
import { FireOutlined, FieldTimeOutlined, LikeOutlined, TagOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useState, useEffect } from 'react'


function ZHListItem({ item, themeStyle, categoryTheme, listLayout, topItemMargin, bottomItemMargin, sloganSize, listRightMarginLeft }) {
  let isShiftIn = false
  // 处理tags数据
  let tags = []
  if (item.tags.indexOf("，" !== -1)) {
    tags = item.tags.split('，')
  } else {
    tags.push(item.tags)
  }

  // let [mobileThemeStyle, setMobileThemeStyle] = useState({})
  // let [mobileCategoryTheme, setMobileCategoryTheme] = useState({})
  // let [mobileSloganSize, setMobileSloganSize] = useState({})
  // useEffect(() => {
  //   let w = window.innerWidth
  //   if (w == 375 || w == 360) {
  //     setMobileThemeStyle({ fontSize: '.9rem', fontWeight: 800 })
  //     setMobileCategoryTheme({ fontSize: '.5rem', padding: '.05rem .05rem' })
  //     setMobileSloganSize({ fontSize: '.7rem', color: '#b7b8ba', width: '10rem' })
  //   } else if (w == 414 || w == 411 || w == 450) {

  //     setMobileThemeStyle({ fontSize: '1rem', fontWeight: 800 })
  //     setMobileCategoryTheme({ fontSize: '.8rem', padding: '.1rem .1rem' })
  //     setMobileSloganSize({ fontSize: '.8rem', color: '#b7b8ba', width: '11.8rem' })
  //   } else if (w == 768) {
  //     setMobileThemeStyle({ fontSize: '1.2rem' })
  //     setMobileCategoryTheme({ fontSize: '.8rem', padding: '.1rem .1rem' })
  //     setMobileSloganSize({ fontSize: '1rem', color: '#b7b8ba', width: '11.8rem' })
  //   } else {
  //     setMobileThemeStyle({})
  //     setMobileCategoryTheme({})
  //     setMobileSloganSize({})
  //   }
  // }, [])

  return (

    <div className="zh-list" style={listLayout}>
      <div className='list-left'>
        <Link href={{ pathname: 'detail', query: { id: item.id } }}>
          <a><img src={item.image} alt="" /></a>
        </Link>
      </div>
      <div className='list-right' style={listRightMarginLeft}>
        <div className='top-list-item' style={topItemMargin}>
          <span color="blue" className='category-theme' style={categoryTheme}>{item.typeName}</span>
          <Link href={{ pathname: 'detail', query: { id: item.id } }}>
            <a className='list-theme' style={themeStyle}>{item.title}</a>
          </Link>
        </div>
        <Row type="flex" justify="center">
          <Col xs={0} sm={24} md={24} lg={24} xl={24}>
            <div className='middle-list-item'>
              {
                tags.map((tag, index) => (
                  <Tag color={isShiftIn ? "#1890ff" : "red"} key={index}>
                    <span>#</span>&nbsp;
                    {tag}
                  </Tag>
                ))
              }
            </div>
          </Col>
        </Row>
        <Link href={{ pathname: 'detail', query: { id: item.id } }}>
          <a><p className='list-text' style={sloganSize}> {item.slogan}</p></a>
        </Link>
        <div className='bottom-list-item'>
          <Row type="flex" justify="center">
            <Col xs={0} sm={0} md={24} lg={24} xl={24}>
              <ul style={bottomItemMargin}>
                <li>
                  <FireOutlined />
                  <span>{item.view_count || 0}</span>
                  <Divider type={"vertical"} className="divider-style" />
                </li>
                <li>
                  <LikeOutlined />
                  <span>{item.star}</span>
                  <Divider type={"vertical"} className="divider-style" />
                </li>
                <li>
                  <TagOutlined />
                  <span>{item.author}</span>
                  <Divider type={"vertical"} className="divider-style" />
                </li>
                <li >
                  <FieldTimeOutlined />
                  <span>{item.addTime}</span>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default ZHListItem