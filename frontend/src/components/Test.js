import React, {useState, useEffect} from "react";
import axios from "axios";

function Test() {
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

  const sendPowerline = (e) => {
    e.preventDefault();
    let geo = document.getElementById("pl-geo").value.replace(/'/g, '"');
    let wear = document.getElementById("pl-wear").value;
    let weather = document.getElementById("pl-weather").value;
    let vegetation = document.getElementById("pl-veg").value;
    let name = document.getElementById("pl-name").value;

    let data = new FormData();
    data.append("geometry", geo);
    data.append("wear", wear);
    data.append("weather", weather);
    data.append("vegetation", vegetation);
    data.append("name", name);

    axios.post("http://localhost:8000/add-powerline/", data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(console.log("DONE SENDING POWERLINE DATA"));
  }
  return (
    <div className="Test">
      <button onClick={sendData}>CREATE REQUEST</button>
      <button onClick={getData}>READ REQUEST</button>
      <br/>
      <p>Current threshold: {threshold}</p>
      <input id="threshold"></input>
      <button onClick={updateThreshold}>UPDATE REQUEST</button>
      <br/>
      <br/>
      <p>Add Powerine</p>
      <br/>
      <p>Geometry <input id="pl-geo"></input></p>
      <p>Wear <input id="pl-wear"></input></p>
      <p>Weather <input id="pl-weather"></input></p>
      <p>Vegetation <input id="pl-veg"></input></p>
      <p>Name <input id="pl-name"></input></p>
      <button onClick={sendPowerline}>ADD POWERLINE</button>



    </div>
  );
}

export default Test;

