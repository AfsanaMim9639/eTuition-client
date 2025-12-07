import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Register from './pages/Register'; // আপনার register component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout with Home Page */}
        <Route path="/" element={<MainLayout />} />
        
        {/* Register Page - Separate Route (No MainLayout) */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;