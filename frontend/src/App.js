import './App.css';
import Map from './components/Map';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import NavBar from './components/NavBar';
import EditPowerlines from './components/EditPowerlines';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar/>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/map" element={<PrivateRoute/>}>
                  <Route path="/map" element={<Map/>}/>
              </Route>
              <Route path="/edit" element={<PrivateRoute/>}>
                  <Route path="/edit" element={<EditPowerlines/>}/>
              </Route>
            <Route path="*" element={<Error/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

