import './App.css';
import Test from './components/Test';
import Map from './components/Map'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Test/>}/>
          <Route path="/map" element={<Map/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

