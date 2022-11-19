import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import justin from "../images/justin.png"

export default function Social(){

    // fetch data from db - probably limit the amount
    let data = useSelector(state => state.user.value)
    console.log(data)

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
            {posts.map((post, idx) => <Post key={idx} post_data={post}/>)}
            <Navtab/>
        </div>
    )
}