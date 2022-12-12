from bs4 import BeautifulSoup
import requests
import random

def lyrics(songName, songArtist):
    url = "https://genius.com/{}-{}-lyrics".format(songArtist, songName)
    # url = "https://genius.com/Lil-baby-get-ugly-lyrics"
    # soup = BeautifulSoup(requests.get(url).content, 'lxml')
    # lyric = []
    # for tag in soup.select('div[class^="Lyrics__Container"], .song_body-lyrics p'):
    #     for i in tag:
    #         try:
    #             i.unwrap()
    #         except:
    #             pass
    #     tag.smooth()
    #     #t = tag.get_text(strip=True, separator='\n')
    #     t = tag.get_text(strip=True, separator='\n')
    #     if t:
    #         lyric.append(t)
    #         #print(t + '\n\n\n')
    # #print(lyric[0].split('\n'))
    # for i in lyric[0].split('\n'):
    #     print(i + '\n\n')
    # print(len(lyric[0].split('\n')))
    # return lyric
    #url = "https://genius.com/Lil-baby-get-ugly-lyrics"
    #url = "https://genius.com/Trippie-Redd-A-Love-Letter-To-You-4-lyrics"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    results = soup.find_all("div",class_="Lyrics__Container-sc-1ynbvzw-6 YYrds")
    lyrics = []
    for i in results:
        #print(str(i).split('<br/>'))
        for p in str(i).split('<br/>'):
            if p.find("<") == -1 and p.find("[") == -1:
                #print(p + '\n\n')
                lyrics.append(p)
    #print(lyrics[random.randint(0, len(lyrics)-1)] + "; " + lyrics[random.randint(0, len(lyrics)-1)])
    return lyrics[random.randint(0, len(lyrics)-1)] + "; " + lyrics[random.randint(0, len(lyrics)-1)] + " - \"{}\"".format(songName)

# if __name__ == "__main__":
#     lyrics("hello", "yaar")



