
import { Card, Affix, Divider, Popover, Row, Col } from 'antd'
import dynamic from 'next/dynamic'
import '../static/style/pages/detail/detail.css'
import '../static/style/pages/detail/md.css'
import { FireOutlined, FieldTimeOutlined, LikeOutlined, TagOutlined, ShareAltOutlined, QqCircleFilled, WeiboOutlined, ZhihuOutlined } from '@ant-design/icons'
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/Tocify.tsx'
import reqUrl from '../network/url'
import IconFont from '../components/IconFont'
import BackImage from '../components/BackImage'
import Layout from '../components/Layout'
import DailySentence from '../components/DailySentence'
const Reward = dynamic(import('../components/Reward'))
const Comment = dynamic(import('../components/Comment'))


export default function Detail({ detailData, articleId, articleUrl, propsCommentData }) {
  const tocify = new Tocify()
  // 解析marked
  const renderer = new marked.Renderer()

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: (code) => hljs.highlightAuto(code).value
  });

  // hljs.configure({ useBR: true });

  let markdown = detailData ? detailData.article_content : '没有数据';

  let html = marked(markdown)

  // let [starCount, setStarCount] = useState(0)
  let starCount = detailData.star
  let isBlue = false
  const handleClickCount = () => {
    // 由于没有设置登录验证，从而使点赞的效果很假
    starCount = starCount + 1
    // 控制颜色变化(这样做为什么不行我也不知道)
    isBlue = !isBlue
  }

  return (
    <>
      <div className='detail-background'>
        <BackImage src="..\static\style\components\banner\banner1.jpg" imageHeight="18rem" />
      </div>
      <Layout
        pageTitle={detailData.title + '-js臻-臻昊'}
        topChildren={
          (<>

            <div className='title-theme'>
              <h1 style={{ fontFamily: 'KaiTi', fontSize: '3rem' }}>{detailData.title}</h1>
              <Row type="flex" justify="center">
                <Col xs={0} sm={24} md={24} lg={24} xl={24} >
                  <div className='bottom-item'>
                    <ul style={{ listStyle: 'none' }}>
                      <li >
                        <FieldTimeOutlined />
                        <span>{detailData.addTime}</span>
                      </li>
                      <li>
                        <TagOutlined />
                        <span>{detailData.author}</span>
                      </li>
                      <li>
                        <FireOutlined />
                        <span>{detailData.view_count || 0}</span>
                        {/* <span id="busuanzi_container_page_pv" style={{ display: 'none' }}>
                          <span id="busuanzi_value_page_pv"></span>
                        </span> */}
                      </li>
                      <li>
                        <LikeOutlined />
                        <span>{starCount}</span>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </>)
        }
        bottomChildren={
          (<>
            <Affix offsetTop={100}>
              <Card className='star-share' size={'small'}>
                {/* 点赞 */}
                <div className='top-star share-star-icon' onClick={handleClickCount} style={isBlue ? { color: '#1296db' } : null}>
                  <LikeOutlined />
                </div>
                <Popover
                  content={
                    <div >
                      <a href={`https://connect.qq.com/widget/shareqq/index.html?url=http://127.0.0.1${articleUrl}&sharesource=qzone&title=${detailData.title}&pics=${detailData.image}&summary=${detailData.slogan}&desc=${detailData.title}`} target="_blank" className="qq-color"><QqCircleFilled /></a>

                      <a href={`http://service.weibo.com/share/share.php?url=http://127.0.0.1${articleUrl}?sharesource=weibo&title=${detailData.title}&pic=${detailData.image}&appkey=2706825840`} target="_blank" className="weibo-color"><WeiboOutlined /> </a>

                      {/* 知乎暂未找到接口 */}
                      {/* <a href="" className="zhihu-color" ><ZhihuOutlined /></a> */}
                    </div>}
                  title="分享到"
                  placement="rightBottom"
                >
                  <div className='bottom-share share-star-icon'>
                    <ShareAltOutlined />
                  </div>
                </Popover>
              </Card>
            </Affix>
            <Card className='commonLeft'>
              {/* marked解析 */}
              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              >
              </div>
              <Divider className="underline" />
              {/* 打赏 */}
              <Reward />
            </Card>
            {/* 评论 */}
            <Card className='commonLeft'>
              <Comment articleId={articleId} propsCommentData={propsCommentData} />
            </Card>
          </>
          )}
        markedRender={
          () => (
            <>
              {
                tocify && tocify.tocItems && tocify.tocItems.length
                  ?
                  <Affix offsetTop={70}>
                    <Card className='commonRight' title={<div className="catalogue"><IconFont type="iconbook" /><span>文章目录</span></div>}>
                      <div className="toc-list" style={{ maxHeight: 500, overflowY: 'auto' }}>
                        {tocify && tocify.render()}
                      </div>
                    </Card>
                  </Affix> : <Affix offsetTop={70}>
                    <Card className='commonRight' title={<div>每日一句</div>}>
                      <DailySentence />
                    </Card>
                  </Affix>
              }
            </>
          )
        }
      />
    </>
  )
}

// 发送网络请求,请求对应的详情页面，根据数据库中的索引
Detail.getInitialProps = async (context) => {
  let id = context.query.id
  // 请求详情页的详细数据
  let { data } = await axios(reqUrl.detail + id)
  console.log(data)

  // 发送评论请求，为了进入comment页面就获取评论id
  let res = await axios(reqUrl.comment + id)
  return {
    detailData: data.data[0],
    articleId: id,
    articleUrl: context.asPath,
    propsCommentData: res.data.commentData
  }
}
