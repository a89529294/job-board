import { Job } from '@prisma/client'

export type SerializedJob = ReturnType<typeof serializeJob>

export const serializeJob = (job: Job) => ({ ...job, date: job.date.toISOString() })

export const deserializeJob = (job: SerializedJob): Job => ({ ...job, date: new Date(job.date) })

export type JobSummary = Omit<Job, 'applyUrl' | 'description'>

export type SerializedJobSummaries = ReturnType<typeof serializeJobSummaries>

export const serializeJobSummaries = (jobSummaries: JobSummary[]) =>
  jobSummaries.map((js) => ({ ...js, date: js.date.toISOString() }))

export const deserializeJobSummaries = (jobSummaries: SerializedJobSummaries) =>
  jobSummaries.map((jobSummary) => ({
    ...jobSummary,
    date: new Date(jobSummary.date),
  }))

export interface GetJobsOptions {
  page?: number
  jobTitle?: string
  company?: string
}

export const toJob = (obj: any): Job => ({ ...obj, date: new Date(obj.date) })

export const toJobSummary = (job: Job): JobSummary => {
  const { description, applyUrl, ...jobSummary } = job
  return jobSummary
}
