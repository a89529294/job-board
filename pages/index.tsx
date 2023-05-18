import { JobList } from '@/components/JobList'
import { Layout } from '@/components/Layout'
import { SerializedJobSummaries, deserializeJobSummaries, serializeJobSummaries } from '@/lib/jobs'
import { getJobs } from '@/lib/jobs_server'
import type { GetServerSideProps, NextPage } from 'next'

type Props = {
  jobs: SerializedJobSummaries
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('fetching first page of jobs')
  const jobs = await getJobs({ page: 1 })
  return {
    props: {
      jobs: serializeJobSummaries(jobs),
    },
  }
}

const Home: NextPage<Props> = ({ jobs }) => {
  const initialJobs = deserializeJobSummaries(jobs)
  return (
    <Layout>
      <JobList initialJobs={initialJobs} />
    </Layout>
  )
}

export default Home
