import './App.css';
import React, {useState, useEffect} from "react";
import axios from "axios";

function App() {
  const [threshold, setThreshold] = useState(0.5);

  useEffect(() => {
    axios.get('http://localhost:8000/edit-threshold/')
      .then(res => {
        console.log(res.data[0].value);
        setThreshold(res.data[0].value);
      })
      .catch(err => console.log(err))
      .then(console.log("LOAD DONE"));
  }, []);
  const getData = (e) => {
    e.preventDefault();
    axios.get('http://localhost:8000')
      .then(function (response){
        console.log(response.data);
      })
      .catch(function (error){
        console.log(error);
      })
      .then(function (){
        console.log("DONE");
      });
  }

  const sendData = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", "SENDING FROM REACT");
    axios.post('http://localhost:8000/add/', data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
      .then(console.log("DONE"));
  }

  const updateThreshold = (e) => {
      e.preventDefault();
      let newThreshold = document.getElementById("threshold").value;
      if (0 <= newThreshold && newThreshold <= 1)
      {
        let data = new FormData();
        data.append("value", newThreshold);
        axios.put("http://localhost:8000/edit-threshold/", data)
        // .then(res => document.location.reload())
        .then(setThreshold(newThreshold))
        .catch(err => console.log(err))
        .then(console.log("DONE"));
      }
      else
      {
        alert("Bad Input Range");
      }
  }
  return (
    <div className="App">
      <button onClick={sendData}>CREATE REQUEST</button>
      <button onClick={getData}>READ REQUEST</button>
      <br/>
      <p>Current threshold: {threshold}</p>
      <input id="threshold"></input>
      <button onClick={updateThreshold}>UPDATE REQUEST</button>
    </div>
  );
}

export default App;

