import { useEffect, useRef, useState } from 'react'
import type { JobSummary } from './jobs'

export const useJobs = (page?: number, jobTitle?: string, company?: string, initialJobs?: JobSummary[]) => {
  const [jobs, setJobs] = useState<JobSummary[]>(initialJobs ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    setLoading(true)
    setError(false)

    let query = []
    if (page !== undefined) {
      query.push(`page=${page}`)
    }
    if (jobTitle !== undefined) {
      query.push(`jobTitle=${encodeURIComponent(jobTitle)}`)
    }
    if (company !== undefined) {
      query.push(`company=${encodeURIComponent(company)}`)
    }

    let isCurrentRequest = true
    fetch(`/api/jobs?${query.join('&')}`)
      .then((res) => res.json())
      .then((jobs) => {
        console.log(jobs)
        if (isCurrentRequest) {
          setJobs(
            jobs.map((job: any) => ({
              ...job,
              date: new Date(job.date),
            })),
          )
        }
      })
      .catch((err) => {
        if (isCurrentRequest) {
          console.error(err)
          setError(err)
        }
      })
      .finally(() => {
        if (isCurrentRequest) setLoading(false)
      })

    return () => {
      isCurrentRequest = false
    }
  }, [company, jobTitle, page, initialJobs])

  return { jobs, loading, error }
}
