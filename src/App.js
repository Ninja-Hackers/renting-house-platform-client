import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HouseListPage from "./pages/HouseListPage";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/houses' element={<HouseListPage />} />
      </Routes>
    </div>
  );
}

export default App;
