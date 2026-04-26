import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import About from '@/components/home/About'
import Services from '@/components/home/Services'
import ProcessSteps from '@/components/home/ProcessSteps'
import Countries from '@/components/home/Countries'
import Categories from '@/components/home/Categories'
import Testimonials from '@/components/home/Testimonials'
import MDMessage from '@/components/home/MDMessage'
import NewsPreview from '@/components/home/NewsPreview'
import ClientsTicker from '@/components/home/ClientsTicker'
import QuickApply from '@/components/home/QuickApply'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <ProcessSteps />
      <Countries />
      <Categories />
      <Testimonials />
      <MDMessage />
      <NewsPreview />
      <ClientsTicker />
      <QuickApply />
    </>
  )
}