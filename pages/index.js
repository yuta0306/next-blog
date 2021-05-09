import Head from 'next/head'
import path from 'path'

import { getAllPosts } from '../lib/md2html'

import Header from '../components/header'
import Footer from '../components/footer'
import Main from '../components/main'
import Card from '../components/partial/card'

export async function getStaticProps() {
  const dirName = path.join(process.cwd(), 'pages', 'docs')
  const allPostData = await getAllPosts(dirName)

  return {
    props: {
      allPostData,
    }
  }
}

export default function Home({ allPostData }) {
  let categories = allPostData.map(data => {
    let {content} = data
    return content.Category
  })
  categories = [...new Set(categories)]
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header categories={categories} />

      <Main 
        content={
          <>
          {allPostData.map(data => {
            let {slug, content} = data
            return <Card slug={slug} content={content} />
          })}
          </>
        }
        sidebar={
          <>
          <p>ここにサイドバーを書き加えていきます</p>
          </>
        }
        grid_layout={true}
      />
          

      <Footer />
    </>
  )
}
