from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import pickle
import numpy as np

APP_ROOT = os.path.abspath(os.path.dirname(__file__))

# Load previously saved models


# Prediction
def predict_donor_data(data):

    if prediction[0] == 0:
        return jsonify({"msg":  False})
    else:
        return jsonify({"msg": True})


# Init app
app = Flask(__name__)
CORS(app)



# Predict the donor status 
@app.route('/api/predict', methods=['POST'])
def handle_prediction():
    age = request.json['age']
    organType = request.json['organType']
    bmi = request.json['bmi']
    bloodPressure = request.json['bloodPressure']
    bloodType = request.json['bloodType']
    glucose = request.json['glucose']
    surgery = request.json['surgery']


    payload = (
        age,
        organType,
        bmi,
        bloodPressure,
        bloodType,
        glucose,
        surgery
    )

    result = predict_donor_data(payload)

    return result


# Run Server
if __name__ == '__main__':
    app.run(host="192.168.1.101", port=5000)  # Replace with your own IP address
