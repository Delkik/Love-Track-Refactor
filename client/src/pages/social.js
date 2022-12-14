import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Navtab from "../components/Navtab";
import Post from "../components/Post";
import { setLikes } from "../redux/likes";
import { setPosts } from "../redux/posts";
import "../styles/social.css"

export default function Social(){

    let posts = useSelector(state => state.posts.value)
    let user_data = useSelector(state => state.user.value)
    let likes = useSelector(state => state.likes.value)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch("http://localhost:5000/posts", {
            method: "GET",
            credentials:"include"
        })
        .then(async res => {
            let data = await res.json()
            dispatch(setPosts(data))
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    if (Object.keys(user_data).length === 0){
        return <Navigate to="/"/>
    }

    const onlike = (like_data) => {
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
        })
        .catch(err => {
            console.log(err)
        })
    }

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