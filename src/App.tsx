import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';

const Placeholder = ({ title }: { title: string }) => (
  <div className="mx-auto max-w-7xl px-4 py-24 md:px-6">
    <h1 className="text-3xl font-bold text-brand-navy dark:text-brand-light">{title}</h1>
  </div>
);

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Placeholder title="Services" />} />
          <Route path="/contact" element={<Placeholder title="Contact" />} />
          <Route path="*" element={<Placeholder title="404 — Not Found" />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
