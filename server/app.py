import base64
import json 
import os
from pymongo import MongoClient
import requests
import spotipy
import uuid
import urllib

from bson.json_util import dumps
from datetime import time
from dotenv import load_dotenv
from flask import Flask, jsonify, redirect, session, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, send, emit 
from imgurpython import ImgurClient
from spotipy.oauth2 import SpotifyOAuth

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

mongo_uri = f"mongodb+srv://{DB_USER}:{DB_PASSWORD}@{DB_CLUSTER_URL}/?authMechanism={authMechanism}"

base_url = "https://api.musixmatch.com/ws/1.1/"
api_key = "&apikey=b47d930cf4a671795d7ab8b83fd74471"
app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = uuid.uuid4().hex
app.config["SESSION_COOKIE_NAME"] = "Spotify Cookie"
socketio = SocketIO(app,cors_allowed_origins="*")
TOKEN_INFO = "code"

@socketio.on("message")
def handle_message(message):
    print("Received message: " + message)
    print("I have been triggered")
    send(message, broadcast=True)
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
    # call user_tracks
    url = base_url + "matcher.lyrics.get?format=json&callback=callback&q_track=sexy%20and%20i%20know%20it&q_artist=lmfao" + api_key
    r = requests.get(url)
    data = r.json()
    data = data['message']['body']
    print(data['lyrics']['lyrics_body'].split('\n')[2])
    response = jsonify({"lyric":data['lyrics']['lyrics_body'].split('\n')[2],"song":"Sexy and I Know It"}) #replace with song name
    return response

@app.route("/create_user", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def create_user():
    user_data = request.get_json()
    client = MongoClient(mongo_uri)
    db = client["main"]
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
    client = MongoClient(mongo_uri)
    db = client["main"]
    user = db.accounts.replace_one({"spotify_id":user_data["spotify_id"]},user_data)
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
            print(i)
            if i in l:
                return dumps(l)
            l.append(i)
    return dumps(l)

@app.route("/upload", methods=['POST'])
@cross_origin(supports_credentials=True)
def upload():

    file = request.files["file"]
    headers = {"Authorization": "Client-ID "+ IMGUR_CLIENT_ID}

    b64_image = base64.standard_b64encode(file.read())
    data = {'image': b64_image, 'title': str(uuid.uuid4().hex)}

    req = requests.post(url="https://api.imgur.com/3/upload.json", data=data,headers=headers)
    print(req.json())
    if req.status_code!=200:
        return {"code":404}
    link = req.json()["data"]["link"]
    return {"code":200,"link":link}

@app.route("/posts", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def posts():
    # if GET, return number of likes
    # if POST, return and add to db
    client = MongoClient(mongo_uri)
    db = client["main"]
    posts = db.posts
    if request.method == "GET":
        return dumps(posts.find().limit(30))
    else:
        post_data = request.data.decode("utf-8")
        print(post_data)
        post_data = json.loads(post_data)
        posts.insert_one(post_data)
        return {}
    return {}

@app.route("/posts/<id>/comment", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def comment(id):
    comment = request.data.decode("utf-8")
    client = MongoClient(mongo_uri)
    db = client["main"]
    post = db.posts.find_one({"post_id":id})
    post.comments.append(comment)
    return db.posts.replace_one({"post_id":id},post)

@app.route("/posts/<id>/like", methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def like(id):
    user_id = request.data.decode("utf-8")
    client = MongoClient(mongo_uri)
    db = client["main"]
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
    return dumps(db.posts.find({}).limit(30))

def getToken():
    token_info = session.get("token_info", None)
    if not token_info:
        raise "exception"
    expired = token_info['expires_at'] - int(time.time())
    if expired < 60:
        oath = create_auth()
        token_info = oath.refresh_access_token(token_info['refresh_token'])
    return token_info

if __name__ == "__main__":
    app.run("127.0.0.1")
    socketio.run(app, debug=True,port=5000)