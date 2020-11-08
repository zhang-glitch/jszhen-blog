import Header from './Header'
import Head from 'next/head'
import Footer from './Footer'
import DailySentence from '../components/DailySentence'
import School from '../components/School'
import SelfIntroduction from '../components/SelfIntroduction'
import Advert from '../components/Advert'
import MyBackTop from './MyBackTop'
import { Row, Col, Card } from 'antd'

/**
 * 
 * @param {pageTitle} 页面标题title
 * @param {markedRender} 页面目录的渲染
 * @param {topChildren} 页面上半部分
 * @param {bottomChildren} 页面下半部分
 *  
 */
const Layout = ({ pageTitle = "页面不存在 | js臻-臻昊", markedRender, topChildren = null, bottomChildren = null }) => {
  return (
    <>
      <Header />
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {topChildren}
      <Row justify='center' type='flex' className='mainIndex'>
        <Col xs={24} sm={24} md={24} lg={15} xl={15}>
          {bottomChildren}
        </Col>
        <Col xs={0} sm={0} md={0} lg={6} xl={5} >
          {markedRender ? (
            markedRender()
          ) : (
              <>
                <Card className='commonRight' title={<div>菜鸡博主</div>}>
                  <SelfIntroduction />
                </Card>
                <Card className='commonRight' title={<div>每日一句</div>}>
                  <DailySentence />
                </Card>
                <Card className='commonRight' title={<div>我的大学</div>}>
                  <School />
                </Card>
                <Card className='commonRight' title={<div>广告</div>}>
                  <Advert />
                </Card>
              </>
            )}
        </Col>
      </Row>
      <MyBackTop />
      <Footer />
    </>
  )
}

export default Layout