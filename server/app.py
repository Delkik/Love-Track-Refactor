import json 
import os
from pymongo import MongoClient
import spotipy
import uuid

from bson.json_util import dumps
from datetime import time
from dotenv import load_dotenv, find_dotenv
from flask import Flask, make_response, session, request, Response
from flask_cors import CORS, cross_origin
from spotipy.oauth2 import SpotifyOAuth

load_dotenv()
scope = "streaming user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state web-playback"

DB_USER = os.environ.get("DB_USER")
REDIRECT = os.environ.get("REDIRECT")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_CLUSTER_URL = os.environ.get("DB_CLUSTER_URL")
SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET")
authMechanism = "DEFAULT"

mongo_uri = f"mongodb+srv://{DB_USER}:{DB_PASSWORD}@{DB_CLUSTER_URL}/?authMechanism={authMechanism}"


app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = uuid.uuid4().hex
app.config["SESSION_COOKIE_NAME"] = "Spotify Cookie"
TOKEN_INFO = "code"

def create_auth():
    return SpotifyOAuth(
        scope=scope,
        client_id=SPOTIFY_CLIENT_ID,
        client_secret=SPOTIFY_CLIENT_SECRET,
        redirect_uri=REDIRECT)

@app.route("/current_user", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def current_user():
    token_info = session.get(TOKEN_INFO, None)
    client = spotipy.client.Spotify(auth=token_info["access_token"])
    user = client.me()
    return json.dumps({"user":user})

@app.route("/create_user", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def create_user():
    user_data = request.get_json()
    client = MongoClient(mongo_uri)
    db = client["main"]
    user = db.accounts.insert_one(user_data)
    return {}

@app.route("/kmeans", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def kmeans():
    return {"kmeans":"kmeans"}

@app.route("/refresh", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def refresh():

    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        raise "No Session!"
    
    sp = create_auth()
    token_info = sp.refresh_access_token(token_info["refresh_token"])
    session[TOKEN_INFO] = token_info

    return json.dumps(
        {
            "accessToken"   :   token_info["access_token"],
            "refreshToken"  :   token_info["refresh_token"],
            "expiresIn"     :   token_info["expires_in"]
        })

@app.route("/spotify", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def spotify():
    code = request.data.decode("utf-8")
    sp = create_auth()

    session.clear()

    token_info = sp.get_access_token(code)
    session[TOKEN_INFO] = token_info

    return json.dumps(
        {
            "accessToken"   :   token_info["access_token"],
            "refreshToken"  :   token_info["refresh_token"],
            "expiresIn"     :   token_info["expires_in"]
        })

@app.route("/user", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def user():
    user_id = request.data.decode("utf-8")
    client = MongoClient(mongo_uri)
    db = client["main"]

    user = db.accounts.find_one({"spotify_id":user_id})

    return dumps({"user":user})

if __name__ == "__main__":
    app.run()