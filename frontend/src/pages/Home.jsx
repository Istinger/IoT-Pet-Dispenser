import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Integration from '../components/home/Integration'
import Testimonial from '../components/home/Testimonial'

const Home = () => {
  return (
     <div className="bg-white text-slate-900">
       <Header />
      <main>
        <Hero />
        <Features />
        <Integration />
        <Testimonial />
      </main>
      <Footer />
    </div>
  )
}

export default Home
