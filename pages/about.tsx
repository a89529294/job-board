import { Layout } from '@/components/Layout'
import { NextPage } from 'next'

const AboutPage: NextPage = () => {
  return (
    <Layout title="About">
      <h2>About</h2>
      <p>
        This job board is project create using the book <em>Serverless Web Applications with React and Next.js</em>.
      </p>
    </Layout>
  )
}
export default AboutPage
