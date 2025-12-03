import { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext"
import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";


export default function Home() {
    const { currentUser, users } = useAuth();
    const { posts } = usePosts();
    const [filteredPost, setFilteredPost] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        let list = posts.map(post => {
            const user = users.find(u => u.username === post.user);
            return { ...post, user };
        });

        if (search) {
            list = list.filter(post =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.content.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredPost(list);
    }, [search, posts, users])

    const post = posts.map(post => {
        const user = users.find(u => u.username === post.user);
        return { ...post, user };
    })

    function timeAgo(date) {
        const now = new Date();
        const postDate = new Date(date);
        const diffMin = Math.floor((now - postDate) / 1000 / 60);
        if (diffMin < 1) return "Just now";
        if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
        const diffHour = Math.floor(diffMin / 60);
        if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
        const diffDay = Math.floor(diffHour / 24);
        return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    }


    return (
        <div className="container">
            <h1>Posts</h1>
            <input className="search" onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
            />
            {currentUser ? (
                <>
                    <Link className="addpostBtn" to='/addpost'>Add post</Link>
                </>
            ) : (<></>)}
            <div className="cardContainer">
                {filteredPost.length === 0 ? (
                    <p>No post</p>
                ) : (
                    <>
                        {filteredPost.map(post => (
                            <div key={post.id} className="card">
                                <div className="cardHeader">
                                    <img className="profileImage" src={post.user?.profileImage} />
                                    <div>
                                        <p>{post.user?.displayName}</p>
                                        <small style={{
                                            fontSize: "10px"
                                        }}>{timeAgo(post.createdAt)}</small>
                                    </div>
                                </div>

                                <p>{post.title}</p>
                                {post.image && <img src={post.image} style={{
                                    width: "300px"
                                }} />}
                                {post.image ? (
                                    <>
                                        <p>{post.content}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="content">
                                            {post.content}
                                        </p>
                                    </>
                                )}

                                <p className="date">{new Date(post.createdAt).toLocaleString()}</p>
                            </div>

                        ))}
                    </>

                )}
            </div>
        </div>
    )
}