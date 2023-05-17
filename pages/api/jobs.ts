import { NextApiHandler } from 'next'

const jobs = [
  {
    id: '1',
    title: 'Senior Software Developer',
    company: 'Vercel',
  },
]

const handle: NextApiHandler = (req, res) => {
  if (req.method === 'GET') return res.send(jobs)
  res.status(405).end()
}

export default handle
