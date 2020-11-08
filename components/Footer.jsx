
import '../static/style/components/footer/footer.css'
import { HeartOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'
import Link from 'next/link'

const Footer = () => (
	<footer className='footer'>
		<Row type="flex" align="middle" justify="space-between">
			<Col className="left-logo" xs={0} sm={0} md={2} lg={2} xl={4}>
				<Link href="./index">
					<a>
						<img className="top-logo" src="../static/style/components/header/blog.gif"></img>
						<img className="bottom-logo" src="../static/style/components/header/blog_logo.png"></img>
					</a>
				</Link>
			</Col>
			<Col className="right-memu" xs={0} sm={0} md={18} lg={18} xl={18}>
				<div>系统是由React+Node+Ant Design制作</div>
				<p>
					<HeartOutlined type="heart" theme="filled" />&nbsp;
          js臻博客, 记录每一次学习带来的快乐&nbsp;
          <HeartOutlined type="heart" theme="filled" />
				</p>
			</Col>
		</Row>
		{/* 统计博客的访问量 */}
		{/* <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script> */}
	</footer>
)
export default Footer

