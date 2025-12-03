import { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext"
import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";

export default function Home() {
    const { currentUser } = useAuth();

    const { posts } = usePosts();
    const [filteredPost, setFilteredPost] = useState([]);
    const [search, setSearch] = useState('');
    console.log(localStorage);
    useEffect(() => {
        if (!search) {
            setFilteredPost(posts);
        } else {
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.content.toLowerCase().includes(search.toLocaleLowerCase())
            );
            setFilteredPost(filtered);
        }
    }, [search, posts])

    return (
        <div className="container">
            <h1>Posts</h1>
            {currentUser ? (
                <>
                    <Link to='/addpost'>Add post</Link>
                </>
            ) : (<></>)}
            <div className="cardContainer">
                {filteredPost.length === 0 ? (
                    <p>No post</p>
                ) : (
                    <>
                        {filteredPost.map(post => (
                            <div key={post.id}>
                                <p>{post.title}</p>
                                <p>{post.content}</p>
                                {post.image && <img src={post.image} style={{
                                    width: "200px"
                                }} />}
                            </div>

                        ))}
                    </>

                )}
            </div>
        </div>
    )
}