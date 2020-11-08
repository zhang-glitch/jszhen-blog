import { Row, Col, Menu } from 'antd'
import { HomeOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import '../static/style/components/header/header.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import reqUrl from '../network/url'
import Link from 'next/link'
import IconFont from './IconFont'
import AutoSmall from './AutoSmall'


let Header = ({ backgroundColor, opacity, menuBckColor, navBtnColor, headerTxt }) => {

  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(reqUrl.header)
      setNavArray(data.data)
    }

    fetchData()
  }, [])

  let handleClickNav = (navProps) => {
    console.log(navProps)
  }
  return (
    <div className='header' style={{ backgroundColor: backgroundColor, opacity: opacity }}>
      <Row type='flex' justify='center'>
        <Col xs={16} sm={16} md={16} lg={15} xl={12}>
          <div className='header-logo'>
            <h1>
              <Link href={{ pathname: '/' }}>
                <a title='js臻'>
                  js臻
                  <img src="../static/style/components/header/blog_logo.png" alt="" className="top-blog" />
                  <img src="../static/style/components/header/blog.gif" alt="" className="bottom-blog" />
                </a>
              </Link>
            </h1>
          </div>
          <div className='header-txt' style={{ color: headerTxt }}>
            IT小白,赶上了前端大军。
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8} xl={7}>
          <Menu mode='horizontal' style={{ background: menuBckColor }}
            overflowedIndicator={<MenuUnfoldOutlined style={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }} />}
          >
            <Menu.Item key='0' className='menu-item' >
              <Link href={{ pathname: '/' }}>
                <a style={{ color: navBtnColor }}>
                  <HomeOutlined />
                首页
              </a>
              </Link>
            </Menu.Item>
            {
              navArray.map((item) => {
                return (
                  <Menu.Item key={item.Id} className='menu-item' onClick={handleClickNav}
                  >
                    <Link href={{ pathname: 'typelist', query: { id: item.Id } }}>
                      <a style={{ color: navBtnColor }} >
                        <IconFont type={item.icon} />
                        {item.typeName}
                      </a>
                    </Link>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
        <Col xs={1} sm={1} md={1} lg={0} xl={0}>
          <AutoSmall navArray={navArray} />
        </Col>
        <Col xs={0} sm={0} md={0} lg={0} xl={1} offset={1}>
          <div className="login">
            <a href='http://localhost:3001/' target="_blank">
              <IconFont type="icondenglu" className="login-icon" />
              登录
            </a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Header