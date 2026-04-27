import { jobs } from '@/data/jobs'
import JobDetailClient from '@/components/jobs/JobDetailClient'

export function generateStaticParams() {
  return jobs.map(j => ({ id: j.id }))
}

export default function JobDetailPage({ params }) {
  return <JobDetailClient id={params.id} />
}
