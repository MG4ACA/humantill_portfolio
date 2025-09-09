import Navbar from './components/Navbar';
import About from './pages/About';
import Cta from './pages/Cta';
import Footer from './pages/Footer';
import Gallery from './pages/Gallery';
import Hero from './pages/Hero';
import Highlights from './pages/Highlights';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Highlights />
        {/* <Locations /> */}
        <Gallery />
        <Cta />
        <Footer />
      </main>
    </>
  );
}
