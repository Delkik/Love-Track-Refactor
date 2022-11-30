import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import justin from "../images/justin.png"
import { setPosts } from "../redux/posts";

export default function Social(){

    let posts = useSelector(state => state.posts.value)
    let user_data = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    console.log(posts,"BJBI")
    // console.log(user_data)

    useEffect(() => {
        fetch("http://localhost:5000/posts", {
            method: "GET",
            credentials:"include"
        })
        .then(async res => {
            let data = await res.json()
            for (let i = 0; i < data.length; i++){
                data[i].profile_img = justin
            }
            dispatch(setPosts(data))
            console.log(data,"usharedfibuawelifu")
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const onlike = (like_data) => {
        console.log(like_data)
        // need post_id
        fetch("http://localhost:5000/posts/"+like_data["post_id"]+"/like", {
            method: "POST",
            body: user_data.user.spotify_id,
            credentials:"include"
        })
        .then(async res => {
            const data = await res.json()
            dispatch(setPosts(data))
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const onComment = (comment_data) => {
        console.log(comment_data)
        // fetch("http://localhost:5000/posts", {
        //     method: "GET",
        //     credentials:"include"
        // })
        // .then()
        // .catch(err => {
        //     console.log(err)
        // })
    }

    const pots = [
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 10},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 2},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 34},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 324},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 789},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 130},
        {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 165870},
    ]

    return (
        <div>
            {posts.map((post, idx) => <Post key={idx} post_data={post} onLike={onlike} onComment={onComment}/>)}
            <Navtab/>
        </div>
    )
}