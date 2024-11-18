import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/login';
import SignUp from './components/signUp';
import 'flowbite/dist/flowbite.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

function Layout({ children }) {
  const location = useLocation();

  // Paths where Navbar and Footer should NOT be displayed
  const hideLayoutPaths = ["/login","/Signup"];

  return (
    <>
      {!hideLayoutPaths.includes(location.pathname) && <Navbar />}
      <main>{children}</main>
      {!hideLayoutPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}
