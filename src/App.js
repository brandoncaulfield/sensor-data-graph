import React from 'react';
import { db } from './firebase';


let sensorData = []
db.collection('senseHat')
  // .orderBy("timestamp")
  .limit(24)
  .get()
  .then((data) => {
    data.forEach(doc => {
      sensorData.push({
        id: doc.id,
        timestamp: doc.data().timestamp,
        temperature: doc.data().temperature,
        humidity: doc.data().humidity,
        pressure: doc.data().pressure,
        compass: doc.data().compass
      })
    })
  })

console.log(sensorData);

/////////////////////////////////////////////////////////////////////////////
// Trying to display the data from Firestore on the webpage but can't 
// using the data returned above. I think I need to call the cloud function
// rather because data is just returned as JSON...
/////////////////////////////////////////////////////////////////////////////

export default function App() {
  return (
    <div className="App">
      <h1>Sensor Data Here Somewhere...</h1>
      {/* <ul>
        {sensorData.forEach(doc => (
          <li>Hello</li>
        ))}
      </ul> */}
    </div>
  );
}
