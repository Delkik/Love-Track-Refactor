import Navtab from "../components/Navtab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { setPosts } from "../redux/posts";
import { setLikes } from "../redux/likes";
import Navbar from "../components/Navbar";
import "../styles/social.css"
import { Navigate } from "react-router-dom";

export default function Social(){

    let posts = useSelector(state => state.posts.value)
    let user_data = useSelector(state => state.user.value)
    let likes = useSelector(state => state.likes.value)
    const dispatch = useDispatch()
    // console.log(user_data)

    useEffect(() => {
        fetch("http://localhost:5000/posts", {
            method: "GET",
            credentials:"include"
        })
        .then(async res => {
            let data = await res.json()
            dispatch(setPosts(data))
            console.log(data,"Got Posts")
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    if (Object.keys(user_data).length === 0){
        return <Navigate to="/"/>
    }

    const onlike = (like_data) => {
        console.log(like_data)
        // need post_id

        let liked_data = [...likes]
        let posts_data = [...posts]
        const post_index = posts_data.indexOf(like_data)
        if (likes.includes(like_data["post_id"])){
            const i = liked_data.indexOf(like_data["post_id"])
            liked_data.splice(i,1)
            posts_data[post_index] = {...posts_data[post_index],likes:posts_data[post_index]["likes"]-1}
            
        }
        else{
            liked_data.push(like_data["post_id"])
            posts_data[post_index] = {...posts_data[post_index],likes:posts_data[post_index]["likes"]+1}

        }
        console.log(posts_data)
        dispatch(setPosts(posts_data))
        dispatch(setLikes(liked_data))
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

    // const pots = [
    //     {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 10},
    //     {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 2},
    //     {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 34},
    //     {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 324},
    //     {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 789},
    //     {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 130},
    //     {profile_img:justin, lyric:"\"Sephiroth\"", song:"One-Winged Angel", likes: 165870},
    // ]

    return (
        <div>
            <Navbar/>
            <div className="screenSettings">
                {posts.length > 0 ? 
                posts.map((post, idx) => <Post key={idx} post_data={post} onLike={onlike} liked={likes.includes(post.post_id)}/>) :
                <div className="social-empty">
                    <h2>Nothing to see here!</h2>
                    <p>Get started by liking some lyrics!</p>
                </div> 
                }
                
            </div>
            <Navtab/>
        </div>
    )
}