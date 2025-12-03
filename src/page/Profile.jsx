import { useAuth } from "../context/UserContext";
import { usePosts } from "../context/PostContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { currentUser, setCurrentUser, users, setUsers } = useAuth();
    const { posts, deletePost } = usePosts();
    const [displayName, setDisplayName] = useState(currentUser.displayName);
    const [profileImage, setProfileImage] = useState(currentUser.profileImage || null);

    const navigate = useNavigate();

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


    const handleEdit = (id) => {
        navigate(`/editpost/${id}`);
    }

    const handleDelete = (id) => {
        deletePost(id);
    }

    const handleChangeName = () => {
        const updatedUser = { ...currentUser, displayName, profileImage };
        setCurrentUser(updatedUser);

        const updatedUsers = users.map(user =>
            user.username === currentUser.username ? updatedUser : user
        );
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        alert('Profile name changed')
    }

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                setProfileImage(base64);

                const updatedUser = {
                    ...currentUser,
                    displayName,
                    profileImage: base64
                };
                setCurrentUser(updatedUser);
                const updatedUsers = users.map(user =>
                    user.username === currentUser.username ? updatedUser : user
                )
                setUsers(updatedUsers);
                localStorage.setItem("users", JSON.stringify(updatedUsers));
                localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            };
            reader.readAsDataURL(file);
        }
    }

    const myPosts = posts.filter(post =>
        post.user === currentUser.username
    );

    return (
        <div className="profile">

            <div>
                <h1>My Profile</h1>
                <div className="myProfile">
                    <div className="changeName">
                        <input
                            placeholder="Change name..."
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                        />
                        <button onClick={handleChangeName}>Change name</button>
                    </div>

                    {profileImage && (
                        <img src={profileImage} alt="Profile" />
                    )}

                    <input className="changeImage"
                        type="file"
                        alt="Preview"
                        onChange={handleChangeImage}
                    />
                </div>
            </div>
            <div>

                {myPosts.length === 0 ? (
                    <p>No post</p>
                ) : (
                    <>


                        <div className="cardContainer">

                            <h1>My posts</h1>

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

                        </div>


                    </>
                )}
            </div>
        </div>
    )
}