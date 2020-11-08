
const baseUrl = 'http://127.0.0.1:7001/default/'

const reqUrl = {
  // 这里的路径如果要是加上了参数就必须要在后面加上/
  detail: baseUrl + 'getArticleById/', //详情页
  index: baseUrl + 'getArticleList', //首页
  header: baseUrl + 'getTypeInfo', //文章类别导航
  typelist: baseUrl + 'getListById/', //根据文章类别id获取列表数据
  advert: baseUrl + 'getAdvert', //获取广告数据
  school: baseUrl + 'getSchool', //获取广告数据
  daysentence: baseUrl + 'getDaySentence', //获取广告数据
  banner: baseUrl + 'getBanner', //获取轮播图数据
  comment: baseUrl + 'getCommentById/', //获取获取评论数据
  response: baseUrl + 'getResponseById/', //获取获取h回复数据
  addcomment: baseUrl + 'addComment', //添加评论
  setStarView: baseUrl + 'setStarView', //设置点赞数和访问量
  addResponse: baseUrl + 'addResponse', //设置点赞数和访问量
  getDeathData: baseUrl + 'getDeathData', //请求死数据
  getAllArticleCount: baseUrl + 'getAllArticleCount', //获取总文章数，点赞数，访问数
}

export default reqUrl

