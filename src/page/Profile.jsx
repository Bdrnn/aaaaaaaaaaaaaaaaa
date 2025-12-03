import { useAuth } from "../context/UserContext";
import { usePosts } from "../context/PostContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { currentUser, setCurrentUser, users, setUsers } = useAuth();
    const { posts, deletePost } = usePosts();
    const [displayName, setDisplayName] = useState(currentUser.displayName);
    const [profileImage, setProfileImage] = useState(currentUser.profileImage || null);
    console.log(localStorage);
    const navigate = useNavigate();

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
        <div>
            <h1>Profile</h1>
            <div>
                <h1>My Profile</h1>
                <input
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                />
                <button onClick={handleChangeName}>Change name</button>
                {profileImage && (
                    <img src={profileImage} alt="Profile" />
                )}

                <input
                    type="file"
                    alt="Preview"
                    onChange={handleChangeImage}
                />
            </div>
            <div>
                <h1>My posts</h1>
                {myPosts.length === 0 ? (
                    <p>No post</p>
                ) : (
                    <>


                        <div>
                            {myPosts.map(post => (
                                <div key={post.id}>
                                    <p>{post.title}</p>
                                    <p>{post.content}</p>
                                    {post.image && <img src={post.image} style={{
                                        width: "200px"
                                    }} />}

                                    <button onClick={() => handleEdit(post.id)}>Edit</button>
                                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                                </div>

                            ))}

                        </div>


                    </>
                )}
            </div>
        </div>
    )
}