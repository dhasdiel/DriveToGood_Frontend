import axios from "axios";



export function reverseGeoCodeGetCity(longitude, latitude) {


  const options = {
    method: 'GET',
    url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
    params: { "latitude": latitude, "longitude": longitude, range: '0' },
    headers: {
      'X-RapidAPI-Key': 'fa60c7162bmshca176d8c509d333p19db0cjsnbae8aa01e1b4',
      'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
    }
  };

  return axios.request(options)
}
