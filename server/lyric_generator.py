from bs4 import BeautifulSoup
import requests
import random

def lyrics(songName, songArtist):
    url = f"https://genius.com/{songArtist}-{songName}-lyrics"
    print(url)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    results = soup.find_all("div",class_="Lyrics__Container-sc-1ynbvzw-6 YYrds")
    print(results)
    lyrics = []
    for i in results:
        for p in str(i).split('<br/>'):
            if p.find("<") == -1 and p.find("[") == -1:
                lyrics.append(p)
    index = random.randint(0, len(lyrics)-2)
    return {"lyric":lyrics[index] + "; " + lyrics[index+1], "song":songName}

# if __name__ == "__main__":
#     lyrics("hello", "yaar")



