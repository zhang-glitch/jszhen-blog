import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <div>
        <Head>
          <title>
            未发现页面-js臻-臻昊
          </title>
        </Head>
        <Header/>
        <div style={{textAlign: 'center', marginTop: "20%"}}>
          <span style={{fontSize: '2rem', fontWeight: 800}}>404</span>
           <p style={{fontSize: '1rem'}}>This page could not be found.</p>
        </div>
      </div>
    )
  }
}