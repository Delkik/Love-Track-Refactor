import "../styles/Post.css"
import chat from "../images/chat_button.png"
import social from "../images/social_media_button.png"

export default function Post({post_data}){
    return (
        <div className="post-main">
            <div className="post">
                <div className="post-main-items">
                    <img className="post-pfp" src={post_data.profile_img} alt={"hi"}/>
                    {/* {post_data.profile_img} */}
                    <div className="post-lyrics">
                        <p>{post_data.lyric} ({post_data.song})</p>
                    </div>
                </div>
                <div className="post-functions">
                    <img className="post-func" src={social}/>
                    <img className="post-func" src={chat}/>
                </div>
            </div>
        </div>
    )
}