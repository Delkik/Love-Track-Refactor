import filled from "../images/filled_social_media_button.png"
import social from "../images/social_media_button.png"
import "../styles/Post.css"

export default function Post({post_data, onLike, liked}){

    return (
        <div className="post-main">
            <div className="post">
                <div className="post-main-items">
                    <img className="post-pfp" src={post_data.profile_img} alt={"hi"}/>
                    <div className="post-lyrics">
                        <p>{post_data.lyric} ({post_data.song})</p>
                    </div>
                </div>
                <div className="post-functions">
                    <div className="post-func">
                    {post_data.likes}
                        <img src={liked ? filled : social} onClick={() => {onLike(post_data)}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}