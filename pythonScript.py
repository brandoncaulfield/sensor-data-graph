import datetime
import firebase_admin
from sense_hat import SenseHat
# Import the firebase admin stuff I think??
from firebase_admin import credentials
# Import the firebase database module
from firebase_admin import firestore

# Firebase: initialise the admin SDK
cred = credentials.Certificate(r"/home/pi/Documents/senseHat/serviceAccountKey.json")
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

# Sensor data prep
sense = SenseHat()

# Get all the values for the database call
timestamp = datetime.datetime.now()
temp = sense.get_temperature()
humidity = sense.get_humidity()
pressure = sense.get_pressure()
orientation = sense.get_orientation()
compass = sense.compass



def my_function():
    db.collection('senseHat').add({
        'compass': compass,
        'humidity': humidity,
        'pressure': pressure,
        'temperature': temp,
        'timestamp': firestore.SERVER_TIMESTAMP
        })
    print("Sensor data sucessfully logged to database")
    

my_function()


