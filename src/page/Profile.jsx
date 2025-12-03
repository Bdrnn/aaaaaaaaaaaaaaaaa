import { useAuth } from "../context/UserContext";
import { usePosts } from "../context/PostContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from
    '@headlessui/react'
import { MdOutlinePostAdd, MdEdit } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { MdOutlineDelete } from "react-icons/md";

export default function Profile() {
    const { currentUser, setCurrentUser, users, setUsers } = useAuth();
    const { posts, deletePost } = usePosts();
    const [displayName, setDisplayName] = useState(currentUser.displayName);
    const [profileImage, setProfileImage] = useState(currentUser.profileImage || null);

    const navigate = useNavigate();





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

    const myPosts = posts
        .filter(post => post.user === currentUser.username)
        .map(post => {
            const owner = users.find(u => u.username === post.user);
            return {
                ...post,
                userData: owner
            };
        });


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

                            {myPosts.map(post => (
                                <div key={post.id} className="card">
                                    <div className="cardTop">
                                        <div className="cardHeader">
                                            <img className="profileImage" src={post.userData.profileImage} />
                                            <div>
                                                <p>{post.userData.displayName}</p>
                                                <small style={{
                                                    fontSize: "10px"
                                                }}>{timeAgo(post.createdAt)}</small>
                                            </div>
                                        </div>
                                        <div className="option">
                                            <Menu >
                                                <MenuButton ><SlOptions size={25} /></MenuButton>
                                                <MenuItems className="menuItems" anchor="bottom">
                                                    <MenuItem >
                                                        <a onClick={() => handleEdit(post.id)} className="edit" >
                                                            <MdEdit size={20} Edit />
                                                            Edit
                                                        </a>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <a onClick={() => handleDelete(post.id)} className="delete">
                                                            <MdOutlineDelete size={20} />
                                                            Delete
                                                        </a>
                                                    </MenuItem>

                                                </MenuItems>
                                            </Menu>
                                        </div>
                                    </div>

                                    <p>{post.title}</p>
                                    {post.image && <img src={post.image} className="cardImg" />}
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