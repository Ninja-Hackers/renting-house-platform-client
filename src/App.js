import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HouseListPage from "./pages/HouseListPage";
import CreateHousePage from "./pages/CreateHousePage";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/houses' element={<HouseListPage />} />
        <Route path='/create-house' element={<CreateHousePage />} />
      </Routes>
    </div>
  );
}

export default App;
