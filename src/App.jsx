import Navbar from './components/Navbar';
import Hero from './pages/Hero';

export default function App() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, Arial' }}>
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
