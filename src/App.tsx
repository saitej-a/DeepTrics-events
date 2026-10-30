import { useEffect, useState } from 'react'
import { registerGsap } from './lib/motion'
import { initSmoothScroll, scrollToSection } from './lib/scroll'
import { CustomCursor } from './components/CustomCursor'
import { Preloader } from './components/Preloader'
import { Navigation } from './components/Navigation'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Services } from './sections/Services'
import { Signature } from './sections/Signature'
import { Portfolio } from './sections/Portfolio'
import { HowItWorks } from './sections/HowItWorks'
import { Testimonials } from './sections/Testimonials'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import type { Service } from './data/services'

registerGsap()

export default function App() {
  const [ready, setReady] = useState(false)
  const [enquiryService, setEnquiryService] = useState<string | null>(null)

  useEffect(() => {
    return initSmoothScroll() ?? undefined
  }, [])

  const handleEnquire = (service: Service) => {
    setEnquiryService(service.title)
    // Give the modal a beat to close before scrolling.
    window.setTimeout(() => scrollToSection('#contact'), 80)
  }

  return (
    <>
      <CustomCursor />
      <Preloader onFinish={() => setReady(true)} />
      <Navigation />

      <main id="main">
        <Hero ready={ready} />
        <About />
        <Services onEnquire={handleEnquire} />
        <Signature />
        <Portfolio />
        <HowItWorks />
        <Testimonials />
        <Contact initialEventType={enquiryService} />
      </main>

      <Footer />
    </>
  )
}
