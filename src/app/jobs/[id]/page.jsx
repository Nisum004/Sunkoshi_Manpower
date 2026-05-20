import { jobs } from '@/data/jobs'
import JobDetailClient from '@/components/jobs/JobDetailClient'

const BASE = 'https://www.sunkoshimanpower.com'

export function generateStaticParams() {
  return jobs.map(j => ({ id: j.id }))
}

export function generateMetadata({ params }) {
  const job = jobs.find(j => j.id === params.id)
  if (!job) return { title: 'Job Vacancy' }
  const desc = `${job.description} ${job.vacancies} vacancies. Salary: ${job.salary}. Apply through Sunkoshi Manpower, Nepal's licensed recruitment agency.`
  return {
    title: `${job.title} in ${job.country}`,
    description: desc.slice(0, 160),
    alternates: { canonical: `${BASE}/jobs/${job.id}` },
    openGraph: {
      title: `${job.title} in ${job.country} – Sunkoshi Manpower`,
      description: desc.slice(0, 155),
      url: `${BASE}/jobs/${job.id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${job.title} in ${job.country}`,
      description: desc.slice(0, 120),
    },
  }
}

function jobSchema(job) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `${job.description} Requirements: ${job.requirements?.join('. ')}.`,
    datePosted: '2025-01-01',
    validThrough: job.deadline,
    employmentType: 'FULL_TIME',
    totalJobOpenings: job.vacancies,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Sunkoshi Manpower Service (P.) Ltd.',
      sameAs: BASE,
      logo: `${BASE}/images/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: job.country },
    },
    jobBenefits: job.benefits,
    baseSalary: {
      '@type': 'MonetaryAmount',
      value: { '@type': 'QuantitativeValue', unitText: 'MONTH', description: job.salary },
    },
  }
}

export default function JobDetailPage({ params }) {
  const job = jobs.find(j => j.id === params.id)
  return (
    <>
      {job && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema(job)) }}
        />
      )}
      <JobDetailClient id={params.id} />
    </>
  )
}
