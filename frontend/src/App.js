import './App.css';
import Map from './components/Map';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

