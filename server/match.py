import pandas as pd
import random

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import time

def create_genre_list(songs):
    # df = pd.read_csv("songs_cleaned_4.csv")
    return

def debug_create_genre_list(df):
    # return first column for testing purposes so we are the same cluster
    return df.iloc[[0]].to_dict("index")

def kmeans(spotify_users, df):

    # df = pd.read_csv("test_users_1.csv")
    # # df.to_csv("test_users_1.csv")
    # df = df.iloc[0:5000]
    # df = df.drop(columns=["Unnamed: 0"])
    # print(df)
    # df.to_csv("test_users.csv",index=False)
    # exit()

    now = time.time()
    df = pd.concat([df,pd.DataFrame(spotify_users,index=range(len(df),len(df)+1))])
    new_df = df.drop(columns=["spotify_id"])
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(new_df)

    pca = PCA()

    # Fitting and Transforming the DF
    df_pca = pca.fit_transform(scaled_features)

    kmeans = KMeans(n_clusters=8)
    kmeans.fit(df_pca)

    df["Cluster"] = list(kmeans.labels_)
    print(time.time() - now, "INSIDE KMEANS")
    return int(list(kmeans.labels_)[-1])

# print(kmeans(1,""))