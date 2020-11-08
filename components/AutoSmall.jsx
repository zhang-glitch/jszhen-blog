import { Drawer, Menu } from 'antd'
import { MenuOutlined, HomeOutlined } from '@ant-design/icons'
import '../static/style/components/autosmall/autosmall.css'
import { useState } from 'react'
import Link from 'next/link'
import IconFont from './IconFont'

const AutoSmall = ({ navArray }) => {
  let [isShowSelect, setIsShowSelect] = useState(false)
  let handleClickShow = () => {
    setIsShowSelect(true)
  }
  let onClose = () => {
    setIsShowSelect(false)
  }

  // 点击选项时，关闭抽屉
  let handleClickItem = () => {
    setIsShowSelect(false)
  }
  return (
    <div className="select">
      <div className="select-btn" onClick={handleClickShow}>
        <MenuOutlined />
      </div>
      <Drawer
        className="drawer-style"
        title="js臻博客"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={isShowSelect}
        theme="dark"
      >
        <Menu mode='vertical'>
          <Menu.Item key='0'
            className="select-menu-item">
            <Link href={{ pathname: '/' }}>
              <a >
                <HomeOutlined />
                首页
              </a>
            </Link>
          </Menu.Item>
          {
            navArray.map((item) => {
              return (
                <Menu.Item key={item.Id}
                  onClick={handleClickItem}
                  className="select-menu-item"
                >
                  <Link href={{ pathname: 'typelist', query: { id: item.Id } }}>
                    <a >
                      <IconFont type={item.icon} />
                      {item.typeName}
                    </a>
                  </Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Drawer>
    </div>
  )
}

export default AutoSmall