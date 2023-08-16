import { useState } from "react"
import "./App.css"
import axios from "axios";

function App() {
  const [data, setData] = useState({})
  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=6544e2dd4d7e16ca5b7eaa4a769ab85a`

  const searchLocation = (event) => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
  }

  return (
    <div className="App">
      <div className="container mt-2 mt-lg-5">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div className="map d-flex mb-4"> 
              <input value={lat} type="text" onChange={event=>setLat(event.target.value)} placeholder="Zemepisná dĺžka" className="form-control"/>
              <input value={lon} type="text" onChange={event=>setLon(event.target.value)} placeholder="Zemepisná šírka" className="form-control mx-2"/>
              <button type="submit" className="btn btn-dark" onClick={searchLocation}>Nájsť</button>
            </div>

            {data.main ?
            <div className="card mt-3">
              { data.name ? <h6 className="pt-2 pt-lg-3 px-5 text-center">{data.name}, {data.sys.country}</h6> : null}
              <div className="d-flex justify-content-center">
                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} className="img-fluid" /> 
              </div>
              <h1 className="px-5 pb-2 pb-lg-3 text-center main-temp">{Math.round(data.main.temp)}°C</h1>
            </div>
            : null }

            {data.main ?
            <div className="card my-3">
              <div className="row px-5 py-2 py-lg-5">
                <div class="col-6 col-lg-3 mb-1">
                  <h6 className="text-center">{Math.round(data.main.feels_like)}°C <br/>pocitová teplota </h6>
                </div>
                <div class="col-6 col-lg-3 mb-1">
                  <h6 className="text-center">{data.wind.speed}m/s <br/> rýchlosť vetra</h6>
                </div>
                <div class="col-6 col-lg-3 mb-1">
                  <h6 className="text-center">{data.main.humidity}% <br/> vlhkosť</h6>
                </div>
                <div class="col-6 col-lg-3 mb-1">
                  <h6 className="text-center">{data.visibility / 1000}km <br/> viditeľnosť</h6>
                </div>
              </div>
            </div>
            : null }

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
