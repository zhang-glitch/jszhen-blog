import '../static/style/components/comment/comment.css'
import { Empty, Button, Form, Input, Divider, Avatar, Modal, message, Spin } from "antd"
import { UserOutlined, CommentOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import reqUrl from '../network/url'
import axios from 'axios'


export default function Comment({ articleId, propsCommentData }) {
  const { TextArea } = Input;
  // 评论数据
  let [comment, setComment] = useState([])
  //回复数据
  let [response, setResponse] = useState([])
  let [responseKey, setResponseKey] = useState()


  // 添加评论加载中
  let [isCommentSpin, setIsCommentSpin] = useState(false)
  // 添加评论加载中
  let [isResponseSpin, setIsResponseSpin] = useState(false)


  // 发送请求评论数据

  let getCommentData = async () => {

    let { data } = await axios(reqUrl.comment + articleId)
    // console.log('comment', data.commentData)
    setComment(data.commentData)
    // // 设置未加载状态
    setIsCommentSpin(false)
  }

  // 根据评论id获取回复数据

  // 这个状态非常重要，根据评论id作为键，值为回复的数据
  let responseDataObj = {}
  let responseDataObjKey = []
  let getResponseData = async () => {
    // 这里的id是评论数据的id,不是索引
    for (let i of propsCommentData) {
      // console.log("38",comment)
      var result = await axios(reqUrl.response + i.id)
      // console.log('response', result.data.data)
      //这里的每一进入页面就发生请求，所以要判断是否有回复数据
      if (result && result.data && result.data.data) {
        // setResponse(result.data.data) 
        responseDataObj[i.id] = result.data.data

      }
      // // 设置未加载状态
      setIsResponseSpin(false)
    }
    // 获取回复对象数据的所有key值
    responseDataObjKey = Object.keys(responseDataObj)
    // console.log('responseDataObjKey', responseDataObjKey)
    // console.log('responseDataObj', responseDataObj)
    // 由于下面不能使用变量，所以被迫写成状态
    setResponse(responseDataObj)
    setResponseKey(responseDataObjKey)
  }

  // 获取请求的评论数据
  useEffect(() => {
    getCommentData()
    getResponseData()
    // 这里由于点击发布评论，重新请求没有效果，所以被迫只要输入内容就发送请求
  }, [isCommentSpin, isResponseSpin])



  // 验证提示
  let [inputValue, setInputValue] = useState('')
  // 统一评论昵称的数据
  let handleInputValue = (e) => {
    setInputValue(e.target.value)
  }

  let [textAreaValue, setTextAreaValue] = useState('')
  // 统一评论正文的数据
  let handleTextAreaValue = (e) => {
    setTextAreaValue(e.target.value)
  }

  // 处理点击回复
  let [isShowResponse, setIsShowResponse] = useState(false)
  let [inputResValue, setInputResValue] = useState('')
  let [textAreaResValue, setTextAreaResValue] = useState('')
  // 统一回复昵称的数据
  let handleInputResValue = (e) => {
    setInputResValue(e.target.value)
  }
  // 统一回复昵称的数据
  let handleTextAreaResValue = (e) => {
    setTextAreaResValue(e.target.value)
  }

  let [reqCommentId, setReqCommentId] = useState(1)
  const handleClickResponse = (commentId) => {
    console.log(commentId)
    //打开对话框
    setIsShowResponse(true)
    // 修改commentId以便发送回复请求,且回复时返回数据库作为comment_id的值
    if (commentId) {
      setReqCommentId(commentId)
    }
  }


  // 添加评论回复
  const handleAddResponse = () => {
    // // 开启加载模式
    setIsResponseSpin(true)
    // 验证
    if (!inputResValue) {
      message.error('您尊贵的呢称怎能不填呢？')
      return false
    } else if (!textAreaResValue) {
      message.error('请填写您宝贵的建议')
      return false
    }
    let responseObj = {}
    //获取每次点击不同评论下的回复的这个id不容易呀
    responseObj.comment_id = reqCommentId
    responseObj.responseTime = parseInt(new Date().getTime() / 1000)
    responseObj.responseName = inputResValue
    responseObj.responseText = textAreaResValue
    axios({
      method: 'post',
      url: reqUrl.addResponse,
      data: responseObj
    }).then(res => {
      if (res.data.isSuccess) {
        message.success('感谢您的回复')
      } else {
        message.error('抱歉，回复失败');
      }
    })
  }

  // 点击确定发送请求
  let handleOk = () => {
    setIsShowResponse(false)
    //发送网络请求
    handleAddResponse()
    // 这里的当请求结束后我们在将表单内的元素设置为空
    setInputResValue("")
    setTextAreaResValue("")
  }

  // 点击取消，关闭会话框
  let handleCancel = () => {
    setIsShowResponse(false)
    setInputResValue("")
    setTextAreaResValue("")
  }

  // 添加评论
  let handleAddComment = () => {
    //重新发送获取评论的请求
    getCommentData()
    // // 开启加载模式
    setIsCommentSpin(true)
    if (!inputValue) {
      message.error('您尊贵的呢称怎能不填呢？')
      return false
    } else if (!textAreaValue) {
      message.error('请填写您宝贵的建议')
      return false
    }
    let commentObj = {}
    commentObj.commentName = inputValue
    commentObj.commentText = textAreaValue

    commentObj.article_id = articleId
    // 这里的时间应该是动态添加的
    commentObj.commentTime = parseInt(new Date().getTime() / 1000)
    axios({
      method: 'post',
      url: reqUrl.addcomment,
      data: commentObj
    }).then(res => {
      if (res.data.isSuccess) {
        message.success('感谢您珍贵的评论')
      } else {
        message.error('抱歉，评论失败');
      }
    })

    // 清除输入框中的内容
    setInputValue('')
    setTextAreaValue('')
  }

  return (
    <div className="comment">
      <h1>最新评论</h1>
      {
        comment[0] ?
          comment.map((item, index) => (
            <div className="comment-information" key={item.id}>
              <Avatar src="../static/style/components/comment/comment.jpg" />
              <div className="comment-top">
                <span>{item.commentName}</span>
                <span>{item.commentTime}</span>
              </div>
              <div className="comment-content"> <p>{item.commentText}</p></div>
              <div className="comment-response"><p onClick={() => {handleClickResponse(item.id)}}>回复</p></div>
              {
                //这里表示的时当回复的id和评论中的id相同时就显示在对应评论的下面，可是这里获取不到comment_id
                // 注意这里一定要判断一下，不然永远都获取不到数据，我的心好累
                response && responseKey && item.id ?  
                responseKey[index] == item.id ?
                response[item.id].map(element => (
                  <div className="response-information" key={element.id}>
                    <Avatar src="../static/style/components/selfintroduction/head_portrait.jpg" />
                    <div className="response-top">
                      <span>{element.responseName}</span>
                      <span>{element.responseTime}</span>
                    </div>
                    <div className="response-content"><p>{element.responseText}</p></div>
                  </div>
                 
                )) 
              :  null
              :  null
              }
            </div>
          )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }

      <Divider className="comment-underline">欢迎评论</Divider>
      <Form
        initialValues={{ remember: true }}
      >
        <Form.Item>
          <UserOutlined className="comment-name-icon" />
          <Input className="comment-name" value={inputValue} placeholder="请输入昵称" onChange={handleInputValue} type="text" />
        </Form.Item>

        <Form.Item>
          <CommentOutlined className="comment-text-icon" />
          <TextArea className="comment-text" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" value={textAreaValue} onChange={handleTextAreaValue} />
        </Form.Item>
        <Form.Item>
          <Button className="submit-comment" type="primary" shape="round" onClick={handleAddComment}>发表评论</Button>
        </Form.Item>
      </Form>
      <Modal
        title="回复"
        visible={isShowResponse}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="发表"
        cancelText="取消"
      >
        <Form
          initialValues={{ remember: true }}
        >
          <Form.Item>
            <UserOutlined className="response-name-icon" />
            <Input value={inputResValue} placeholder="请输入昵称" onChange={handleInputResValue} />
          </Form.Item>

          <Form.Item>
            <CommentOutlined className="response-text-icon" />
            <TextArea placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" value={textAreaResValue} onChange={handleTextAreaResValue} />
          </Form.Item>
        </Form>
      </Modal>
      <Spin spinning={isCommentSpin} delay={500} />
      <Spin spinning={isResponseSpin} delay={500} />
    </div>
  )
}