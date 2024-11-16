import Navbar from './components/Navbar'
import Home from './components/Home'
import 'flowbite/dist/flowbite.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

export default function App() {
  return (
     <Router>
      <Routes>

      <Route  element={<Navbar />}>
          {/* Child routes */}
          <Route path='/' element={<Home />} />
         
        </Route>

     </Routes>
     </Router>
  )
}


