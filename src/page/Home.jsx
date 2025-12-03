import { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext"
import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";
import { MdOutlinePostAdd, MdEdit } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { SlOptions } from "react-icons/sl";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";



export default function Home() {
    const { currentUser, users } = useAuth();
    const { posts, deletePost } = usePosts();
    const [filteredPost, setFilteredPost] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
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
    console.log(localStorage);
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




    const handleEdit = (id) => {
        navigate(`/editpost/${id}`);
    }

    const handleDelete = (id) => {
        deletePost(id);
    }

    return (
        <div className="container">
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h1>Posts</h1>
                {currentUser && (
                    <Link className="addpostBtn" to='/addpost'><MdOutlinePostAdd size={40} /></Link>
                )}

            </div>

            <input className="search" onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
            />
            {currentUser ? (
                <><div style={{
                    width: "100%"
                }}>

                </div> </>
            ) : (<></>)}
            <div className="cardContainer">
                {filteredPost.length === 0 ? (
                    <p>No post</p>
                ) : (
                    <>
                        {filteredPost.map(post => (
                            <div key={post.id} className="card">
                                <div className="cardTop">
                                    <div className="cardHeader">
                                        <img className="profileImage" src={post.user?.profileImage} />
                                        <div>
                                            <p>{post.user?.displayName}</p>
                                            <small style={{
                                                fontSize: "10px"
                                            }}>{timeAgo(post.createdAt)}</small>
                                        </div>
                                    </div>
                                    {currentUser && post.user && post.user.username === currentUser.username && (
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
                                    )}

                                </div>




                                <p>{post.title}</p>
                                {post.image && <img className="cardImg" src={post.image} style={{

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