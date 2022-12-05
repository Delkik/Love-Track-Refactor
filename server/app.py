import json 
import os
from pymongo import MongoClient
import spotipy
import uuid
import requests

from bson.json_util import dumps
from datetime import time
from dotenv import load_dotenv, find_dotenv
from flask import Flask, jsonify, make_response, redirect, session, request, Response
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from spotipy.oauth2 import SpotifyOAuth

load_dotenv()
scope = "streaming user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state"

DB_USER = os.environ.get("DB_USER")
REDIRECT = os.environ.get("REDIRECT")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_CLUSTER_URL = os.environ.get("DB_CLUSTER_URL")
SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET")
authMechanism = "DEFAULT"

mongo_uri = f"mongodb+srv://{DB_USER}:{DB_PASSWORD}@{DB_CLUSTER_URL}/?authMechanism={authMechanism}"

base_url = "https://api.musixmatch.com/ws/1.1/"
api_key = "&apikey=b47d930cf4a671795d7ab8b83fd74471"
app = Flask(__name__)
CORS(app, resources={r"/*":{"origins":"*"}})
#cors = CORS(app, resources={r'/get_lyrics': {'origins':'http://localhost:3000/#/lyrics'}})

app.config['SECRET_KEY'] = uuid.uuid4().hex
app.config["SESSION_COOKIE_NAME"] = "Spotify Cookie"
socketio = SocketIO(app,cors_allowed_origins="*")
#app.debug = True

TOKEN_INFO = "code"

@socketio.on('join')
def on_join(data):
    room = data
    print("room: " + room)
    join_room(room)

@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
    
@socketio.on("message")
def handle_message(message):
    print("Received message: " + message['ms'])
    print("I have been triggered")
    emit('my_response', message, broadcast=True)
    return None

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect",{"data":f"id: {request.sid} is connected"})

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



@app.route("/get_song_words", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getLyrics():
    url = base_url + "matcher.lyrics.get?format=json&callback=callback&q_track=sexy%20and%20i%20know%20it&q_artist=lmfao" + api_key
    r = requests.get(url)
    data = r.json()
    data = data['message']['body']
    print(data['lyrics']['lyrics_body'].split('\n')[2])
    response = jsonify(lyric = data['lyrics']['lyrics_body'].split('\n')[2])
    #response.headers.add('Access-Control-Allow-Origin', '*')
    return response




@app.route("/create_user", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def create_user():
    user_data = request.get_json()
    client = MongoClient(mongo_uri)
    db = client["main"]
    user = db.accounts.insert_one(user_data)
    return {}

@app.route("/getAuth")
@cross_origin(supports_credentials=True)
def getAuth():
    oath = create_auth()
    url = oath.get_authorize_url()
    return redirect(url)
    
@app.route("/user_tracks", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def get_tracks():
    sp = None
    try:
        token_info = session.get(TOKEN_INFO, None)
        sp = spotipy.Spotify(auth = token_info['access_token'])
    except:
        return {"msg":"no valid logged in user"}
    print(str(sp.current_user_saved_tracks(limit=50, offset=0)['items']))
    l = []
    for j in range(10):
        songs = sp.current_user_saved_tracks(limit=50, offset=j*50)['items']
        for i in songs:
            #print(i)
            if i in l:
                return dumps(l)
            name = i["track"]["album"]["name"].replace(" ", "%20")
            im = i["track"]["album"]["images"][1]["url"]
            artist = i["track"]["album"]["artists"][0]["name"].replace(" ", "%20")
            print("name: " + name + "  image:  " + im + " . artist:  " + artist)
            item = {"n": name, "i":im, "a":artist}
            #l.append(i)
            if len(i["track"]["album"]["artists"]) == 1:
                l.append(item)
    #return dumps(l)
    return l

    

def getToken():
    token_info = session.get("token_info", None)
    if not token_info:
        raise "exception"
    expired = token_info['expires_at'] - int(time.time())
    if expired < 60:
        oath = create_auth()
        token_info = oath.refresh_access_token(token_info['refresh_token'])
    return token_info

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
    #app.run("127.0.0.1")
    #socketio.init_app(app, cors_allowed_origins="*")
    #socketio.run(app)
    socketio.run(app, debug=True,port=5000)
 