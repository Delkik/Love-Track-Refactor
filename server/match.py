import numpy as np
import pandas as pd
import random

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from kneed import KneeLocator
from sklearn.decomposition import PCA

def create_genre_list(df, songs):
    
    return

def debug_create_genre_list(df):
    return df.sample(n=1)

def debug_kmeans(df,spotify_users):
    spotify = pd.DataFrame()
    for i in spotify_users:
        spotify = pd.concat([users,debug_create_genre_list(df)])
    users = df.sample(n=3000)
    users = pd.concat([spotify,users]) 
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(users)

    pca = PCA()

    # Fitting and Transforming the DF
    df_pca = pca.fit_transform(scaled_features)

    kmeans = KMeans(n_clusters=8)
    kmeans.fit(df_pca)

    users["Cluster"] = list(kmeans.labels_)
    return {"cluster":random.choice(list(kmeans.labels_))}

def kmeans(spotify_users, df):


    # d = spotify_users
    # for i in ["_id","name","age","gender","lookingFor","relationshipType","orientation","interests","test","occupation","school","description","favoriteColor","location","locationRange","ageRange","spotify_id","bio","profile_img","cluster"]:
    #     d.pop(i,None)
    
    # d = pd.DataFrame(d)
    print(list(df.columns))

    new_df = df.drop(columns=["spotify_id"])
    users = new_df.sample(n=3000)
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(users)

    pca = PCA()

    # Fitting and Transforming the DF
    df_pca = pca.fit_transform(scaled_features)

    kmeans = KMeans(n_clusters=8)
    kmeans.fit(df_pca)

    users["Cluster"] = list(kmeans.labels_)
    return {"cluster":random.choice(list(kmeans.labels_))}