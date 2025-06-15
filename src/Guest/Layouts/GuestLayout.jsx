import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Home from '../Pages/Home';

export default function GuestLayout() {
  return (
    <div className="font-sans">
      <div className="sticky top-0 z-50 bg-gray-200 shadow">
        <Navbar />
      </div>
      <Home />
      <Footer />
    </div>
  );
}
