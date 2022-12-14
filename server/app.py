import base64
import json 
import os
import pandas as pd
import requests
import random
import spotipy
import time
import uuid


from copy import deepcopy
from bson.json_util import dumps
from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, session, request
from flask_cors import CORS, cross_origin
from flask_session import Session
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from lyric_generator import *
from match import *
from pymongo import MongoClient
from spotipy.oauth2 import SpotifyOAuth

TEST_USERS = pd.read_csv("test_users.csv")
DEBUG = True

load_dotenv()
scope = "streaming user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state"

DB_USER = os.environ.get("DB_USER")
REDIRECT = os.environ.get("REDIRECT")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_CLUSTER_URL = os.environ.get("DB_CLUSTER_URL")
SPOTIFY_CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET")
IMGUR_CLIENT_ID = os.environ.get("IMGUR_CLIENT_ID")
IMGUR_CLIENT_SECRET = os.environ.get("IMGUR_CLIENT_SECRET")
authMechanism = "DEFAULT"

NEW_USER = "m001-student"
PASS = "capstone"
mongo_uri = f"mongodb+srv://{DB_USER}:{DB_PASSWORD}@{DB_CLUSTER_URL}/?authMechanism={authMechanism}"
mongo_uri2 = f"mongodb+srv://{NEW_USER}:{PASS}@sandbox.679hr.mongodb.net/?authMechanism={authMechanism}"

base_url = "https://api.musixmatch.com/ws/1.1/"
api_key = "&apikey=b47d930cf4a671795d7ab8b83fd74471"
#CORS(app)

DB_CLIENT = MongoClient(mongo_uri)

app = Flask(__name__)

app.config['SECRET_KEY'] = uuid.uuid4().hex
app.config["SESSION_COOKIE_NAME"] = "Spotify Cookie"
app.config["SESSION_COOKIE_HTTPONLY"] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
socketio = SocketIO(app,cors_allowed_origins="*")
TOKEN_INFO = "code"
CORS(app, resources={r"/*":{"origins":"*"}})
Session(app)

@socketio.on('join')
def on_join(data):
    room = data
    # print("room: " + room)
    join_room(room)

@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
    
@socketio.on("message")
def handle_message(message):
    # print("Received message: " + message['ms'])
    # print("I have been triggered")
    emit('my_response', message, broadcast=True)
    return None

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    # print(request.sid)
    print("client has connected")
    emit("connect",{"data":f"id: {request.sid} is connected"})

def create_auth(cache_handler):
    return SpotifyOAuth(
        scope=scope,
        client_id=SPOTIFY_CLIENT_ID,
        client_secret=SPOTIFY_CLIENT_SECRET,
        redirect_uri=REDIRECT,
        cache_handler=cache_handler
        )

@app.route("/current_user", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def current_user():
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = create_auth(cache_handler)

    spotify = spotipy.Spotify(auth_manager=auth_manager)
    return json.dumps({"user":spotify.current_user()})

@app.route("/user_tracks", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def get_tracks():
    sp = None
    try:
        cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
        auth_manager = create_auth(cache_handler)

        sp = spotipy.Spotify(auth_manager=auth_manager)
    except:
        return {"msg":"no valid logged in user"}
    l = []
    for j in range(10):
        songs = sp.current_user_saved_tracks(limit=50, offset=j*50)['items']
        for i in songs:
            if i in l:
                return dumps(l)
            album = i["track"]["album"]["name"].replace(" ", "-")
            name = i["track"]["name"].replace(" ", "-")
            im = i["track"]["album"]["images"][1]["url"]
            uri = i["track"]["uri"]
            artist = i["track"]["artists"][0]["name"].replace(" ", "-")
            duration = i["track"]["duration_ms"]
            item = {"name": name, "image":im, "artist":artist, "uri":uri, "album":album, "duration": duration}
            if len(i["track"]["artists"]) == 1:
                l.append(item)
    return dumps(l)


@app.route("/get_song_words", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def getLyrics():
    bdy = request.get_json()
    count = len(bdy)
    while count:
        try:
            index = random.randint(0,len(bdy)-1)
            song = bdy[index]
            bdy.pop(index)
            lyric = lyrics(song['name'], song['artist'])
            return jsonify(lyric)
        except:
            count-=1
    return {"msg":"Oops... Seeming to have difficulty with retrieving lyrics."}

@app.route("/create_user", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def create_user():
    user_data = request.get_json()
    db = DB_CLIENT["main"]
    user = db.accounts.insert_one(user_data)
    likes = db.likes.insert_one({
        "user":user_data["spotify_id"],
        "liked":[]
    })
    return {}

@app.route("/update_user", methods=['GET','PUT'])
@cross_origin(supports_credentials=True)
def update_user():
    user_data = request.data.decode("utf-8")
    user_data = json.loads(user_data)
    user_data.pop('_id', None)
    db = DB_CLIENT["main"]
    user = db.accounts.replace_one({"spotify_id":user_data["spotify_id"]},user_data)
    return {}

# have a threshold of when to call it again (first time should be on account creation)
@app.route("/match", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def match():
    # just have it find users here
    user_data = request.data.decode("utf-8")
    user_data = json.loads(user_data)
    user_data.pop('_id', None)

    db = DB_CLIENT["main"]
    bruh = db.accounts.find({"spotify_id":{"$ne":user_data["spotify_id"]},"cluster":user_data["cluster"]},{"_id":0}).limit(1000)
    # print(list(bruh))
    return {"users":list(bruh)}

@app.route("/get_all_users", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def allUser():
    client = MongoClient(mongo_uri)
    db = client["main"]
    users = db.accounts.find({})
    peeps = []
    for d in users:
        peeps.append(d)
    return dumps({"allUsers":peeps})


@app.route("/kmeans", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def kmeans_train():
    now = time.time()
    user_data = request.data.decode("utf-8")
    user_data = json.loads(user_data)
    user_data.pop('_id', None)

    db = DB_CLIENT["main"]

    data = None
    if DEBUG:
        data = debug_create_genre_list(TEST_USERS)
    else:
        data = create_genre_list()
    data = data[list(data.keys())[0]]
    data["spotify_id"] = user_data["spotify_id"]

    cluster = kmeans(data, TEST_USERS)
    if DEBUG:
        cluster = 0
    user_data["cluster"] = cluster

    db.accounts.replace_one({"spotify_id":user_data["spotify_id"]},user_data)

    print(time.time() - now, "END OF ENDPOINT")
    return json.dumps({"kmeans":cluster})

@app.route("/refresh", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def refresh():

    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    auth_manager = create_auth(cache_handler)

    sp = spotipy.Spotify(auth_manager=auth_manager)
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
    cache_handler = spotipy.cache_handler.FlaskSessionCacheHandler(session)
    sp = create_auth(cache_handler)

    session.clear()
    token_info = sp.get_access_token(code)
    print()
    # token_info = sp.get_cached_token()
    print(token_info)
    # spotipy.S
    session[TOKEN_INFO] = token_info
    session.modified = True

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
    db = DB_CLIENT["main"]

    user = db.accounts.find_one({"spotify_id":user_id})

    return dumps({"user":user})

@app.route("/upload", methods=['POST'])
@cross_origin(supports_credentials=True)
def upload():

    file = request.files["file"]
    headers = {"Authorization": "Client-ID "+ IMGUR_CLIENT_ID}

    b64_image = base64.standard_b64encode(file.read())
    data = {'image': b64_image, 'title': str(uuid.uuid4().hex)}

    req = requests.post(url="https://api.imgur.com/3/upload.json", data=data,headers=headers)
    if req.status_code!=200:
        return {"code":404}
    link = req.json()["data"]["link"]
    return {"code":200,"link":link}

@app.route("/posts", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def posts():
    db = DB_CLIENT["main"]
    posts = db.posts
    if request.method == "GET":
        return dumps(posts.find().limit(30))
    else:
        post_data = request.data.decode("utf-8")
        post_data = json.loads(post_data)
        posts.insert_one(post_data)
        return {}

@app.route("/posts/<id>/like", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def like(id):
    user_id = request.data.decode("utf-8")
    db = DB_CLIENT["main"]
    user = db.likes.find_one({"user":user_id})
    post = db.posts.find_one({"post_id":id})
    if user and id in user["liked"]:
        user["liked"].remove(id)
        post["likes"]-=1
    else:
        user["liked"].append(id)
        post["likes"]+=1
    db.likes.replace_one({"user":user_id},user)
    db.posts.replace_one({"post_id":id},post)
    return dumps(db.posts.find({}).limit(20))

@app.route("/addChat", methods = ['POST'])
@cross_origin(supports_credentials=True)
def postChat():
    bdy = request.get_json()
    client = MongoClient(mongo_uri2)
    db = client["chatHistory"]
    try:
        db.chats.insert_one({bdy["name"]:bdy["history"]})
        return dumps({"message":"succeeded in updating db"})
    except:
        return dumps({"message":"error with updating to db. please try again"})

if __name__ == "__main__":
    app.run("127.0.0.1")
    # socketio.run(app, debug=True,port=5000)