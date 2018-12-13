from flask import Flask, jsonify, request
from flask_cors import CORS
import logging as log
import json

from .sql.db import FlowerDB

# creating the Flask application
app = Flask(__name__)
CORS(app)
log.basicConfig(filename="a5.log", level=log.INFO)
db = FlowerDB()

# Code from flask docs


class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv["message"] = self.message
        return rv


@app.route("/flowers", methods=["GET"])
def get_flowers_list():
    conn = db.create_connection()
    rows = db.get_flowers_list(conn)

    response = []
    # since there is one column I prefer to return a single dimensional array
    for row in rows:
        response.append(row[0])

    conn.close()
    return jsonify(response)


@app.route("/flowers/<flower>", methods=["GET"])
def get_flower_details(flower=None):
    if flower is None:
        raise InvalidUsage(
            "No flower name specified (/flowers/<flower>)", 404)

    conn = db.create_connection()
    rows = db.get_flower_details(conn, flower)

    result = {}
    result["genus"] = rows[0][0]
    result["species"] = rows[0][1]
    result["comname"] = rows[0][2]

    conn.close()
    return jsonify(result)


@app.route("/flowers/<flower>", methods=["PUT"])
def update_flowers(flower=None):
    if flower is None:
        raise InvalidUsage(
            "No flower name specified (/flowers/<flower>)", 404)

    data = request.get_json()
    genus = data['genus']
    species = data['species']

    if not len(genus) or not len(species):
        raise InvalidUsage("Missing parameter (genus, species) received ({0},{1}) instead".format(genus, species), 422)

    conn = db.create_connection()
    result = db.update_flowers(conn, flower, genus, species)

    if result is 0:
        raise InvalidUsage("No such flower name found", "404")
    else:
        conn.commit()

    conn.close()
    return(jsonify("Successfuly updated record"))


@app.route("/flowers/<flower>/sightings", methods=["GET"])
def get_n_recent_sightings(flower=None):
    if flower is None:
        raise InvalidUsage(
            "No flower name specified (/flowers/<flower>/sightings)", 404)

    limit = request.args.get("limit")
    if not limit:
        limit = 10

    conn = db.create_connection()
    rows = db.get_n_recent_sightings(conn, flower, limit)

    result = []
    for row in rows:
        result.append({
            "name": row[0],
            "person": row[1],
            "location": row[2],
            "sighted": row[3]
        })

    conn.close()
    return jsonify(result)


@app.route("/flowers/<flower>/sightings", methods=["POST"])
def insert_new_sighting(flower=None):
    if flower is None:
        raise InvalidUsage(
            "No flower name specified (/flowers/<flower>/sightings)", 404)

    data = request.get_json()
    person = data["person"]
    location = data["location"]
    sighted = data["sighted"]

    if person is None or location is None or sighted is None:
        raise InvalidUsage(
            "Missing parameter (person, location, sighted)", 422)

    conn = db.create_connection()
    result = db.insert_new_sighting(conn, flower, person, location, sighted)

    if result is 0:
        raise InvalidUsage("Failed to insert new sighting", "418")
    else:
        conn.commit()

    conn.close()
    return(jsonify("Successfully inserted new sighting"))


# Code from flask docs


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
