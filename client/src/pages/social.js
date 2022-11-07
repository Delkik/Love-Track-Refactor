import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Post from "../components/Post";
import justin from "../images/justin.png"

export default function Social(){
    const {state} = useLocation();
    const data = state
    console.log(data)

    // fetch data from db - probably limit the amount

    const posts = [
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel"},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel"},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel"},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel"},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel"},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel"},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel"},
    ]

    return (
        <div>
            {posts.map((post) => <Post post_data={post}/>)}
            <Navtab data={data}/>
        </div>
    )
}