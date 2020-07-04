import React from 'react';
import './App.css';
import { db } from './firebase'

let sensorData = []
const senseHat = db.collection('senseHat').get()
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

const reptiles = [{ 'name': 'alligator' }, { 'name': 'snake' }, { 'name': 'lizard' }];

export default function App() {
  return (
    <div className="App">
      <h1>Sensor Data Here Somewhere...</h1>
      <ol>
        {reptiles.map(s => (
          <li>{s.name}</li>
        ))}
      </ol>
    </div>
  );
}
