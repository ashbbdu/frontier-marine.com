import { Route, Routes } from 'react-router-dom';

const Placeholder = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-2xl font-semibold text-brand-navy dark:text-brand-light">{title}</h1>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder title="Home" />} />
      <Route path="/about" element={<Placeholder title="About" />} />
      <Route path="/services" element={<Placeholder title="Services" />} />
      <Route path="/contact" element={<Placeholder title="Contact" />} />
      <Route path="*" element={<Placeholder title="404 — Not Found" />} />
    </Routes>
  );
}
