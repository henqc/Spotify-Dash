import json
import os
from flask import Flask, session, redirect, url_for, request, jsonify, make_response
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime, timedelta
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
redirect_uri = 'http://localhost:8000/callback'
scope = 'playlist-read-private'

cache_handler = FlaskSessionCacheHandler(session)
sp_oauth = SpotifyOAuth(
    client_id = client_id,
    client_secret = client_secret,
    redirect_uri = redirect_uri,
    scope = scope,  
    cache_handler=cache_handler,
    show_dialog=True
)

sp = Spotify(auth_manager=sp_oauth)

@app.route('/')
def home():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        return jsonify({"logged_in": False})
    return jsonify({"logged_in": True})

@app.route('/callback')
def callback():
    code = request.args.get('code')
    sp_oauth.get_access_token(code)
    response = make_response(redirect('http://localhost:3000'))  # Replace with your actual frontend URL
    return response

@app.route('/get_playlists')
def get_playlists():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)

    playlists = sp.current_user_playlists()

    return jsonify(playlists)

@app.route('/get_playlist_songs')
def get_playlist_songs():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)

    playlist_id = request.args.get('playlist_id')
    tracks = sp.playlist_tracks(playlist_id, fields=None, limit=100, offset=0, market=None, additional_types=('track', ))

    return jsonify(tracks)

@app.route('/login')
def login():
    auth_url = sp_oauth.get_authorize_url()
    return jsonify({'auth_url': auth_url})

@app.route('/logout')
def logout():
    response = make_response('http://localhost:3000')
    session.clear()
    return response

@app.route('/verify')
def verify():
    token_info = session.get('token_info', None)
    if token_info is not None and sp_oauth.validate_token(token_info):
        return jsonify({"logged_in": True})
    else:
        return jsonify({"logged_in": False})

if __name__ == '__main__':
    app.run(debug=True, port=8000) 