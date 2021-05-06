/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=40aaf282a5d6b7af624089d2fc5fedf3';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction );

function performAction(e){
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather (baseURL, zip, apiKey)
  .then (function (wData) {
      const temperature = wData.main.temp;
      const feeling = feelings;
      postData('/post', {
          temp: temperature, date: newDate, feeling: feeling
          })
          .then(() => {
              updateUI()
          });
      });  
}

const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL+zip+apiKey);
  try {
      const wData = await res.json();
      console.log(wData);
      return wData;
  } catch(error) {
      console.log('error', error);
  }
}
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
});
  try {
      const newData = await res.json();
      console.log(newData);
      return newData;
  } catch(error) {
      console.log('error', error);
  };
}

const getData = async (url='') =>{
  const request = await fetch(url);
  try {
      const getData = await request.json()
  }
  catch(error){
      console.log('error', error);
  }
};

const updateUI = async () => {
  const request = await fetch('/getData');
  try{
      const lastEntry = await request.json();
      document.getElementById('date').innerHTML = lastEntry["date"];
      document.getElementById('temp').innerHTML = lastEntry["temp"];
      document.getElementById('content').innerHTML = lastEntry["feeling"];
      } catch(error){
          console.log('error', error);
  }
};