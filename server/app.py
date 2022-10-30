import json 
import os
import spotipy
import uuid


from datetime import time
from dotenv import load_dotenv, find_dotenv
from flask import Flask, session, request
from flask_cors import CORS
from spotipy.oauth2 import SpotifyOAuth

load_dotenv()
scope = "user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state"

DB_USER = os.environ.get("DB_USER")
REDIRECT = os.environ.get("REDIRECT")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_CLUSTER_URL = os.environ.get("DB_CLUSTER_URL")
SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET")

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

def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        raise "No Session!"
    now = int(time.time())
    is_expired = token_info['expires_at'] - now < 60

@app.route("/current_user", methods=['GET','POST'])
def current_user():
    code = request.headers["code"]
    sp = create_auth()
    
    session.clear()

    token_info = sp.get_access_token(code)
    session[TOKEN_INFO] = token_info

    return {"current_user":"current_user"}

@app.route("/create_user", methods=['GET','POST'])
def create_user():
    return {"create_user":"create_user"}

@app.route("/kmeans", methods=['GET','POST'])
def kmeans():
    return {"kmeans":"kmeans"}

@app.route("/refresh", methods=['GET','POST'])
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
def spotify():
    code = request.args.get("code")
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
def user():
    return {"user":"user"}

if __name__ == "__main__":
    app.run()