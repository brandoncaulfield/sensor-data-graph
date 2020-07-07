const functions = require('firebase-functions');

// The firebase admin SDK to access Cloud Firestore
const admin = require('firebase-admin')
admin.initializeApp();

const firestore = admin.firestore()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.getSensorData = (req, res) => {
    firestore
        .collection('senseHat')
        .orderBy('timestamp')
        .limit(24)
        .get()
        .then((data) => {
            let sensorReadings = [];
            data.forEach(doc => {
                sensorReadings.push({
                    id: doc.id,
                    timestamp: doc.data().timestamp,
                    temperature: doc.data().temperature,
                    humidity: doc.data().humidity,
                    pressure: doc.data().pressure,
                    compass: doc.data().compass
                })
            })
            return res.json(sensorReadings);
        })
}

exports.getLatestSensorData =
    functions.https.onRequest(async (req, res) => {
        const snapShot = await firestore
            .collection('senseHat')
            // .orderBy("timestamp")
            // .limit(100)
            .get()
        res.send(snapShot.docs.map(doc => doc.data()))
    }
    )