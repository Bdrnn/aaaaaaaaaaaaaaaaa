import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { posts, updatePost } = usePosts();
    const post = posts.find(p => p.id === Number(id));


    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.image || "");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updatePost(post.id, title, content, image);
        navigate("/");
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="addPostContainer">
            <form>
                <h1>Edit post</h1>
                <div>
                    <p>Title</p>
                    <input
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    ></input>
                </div>

                <div>

                    <p>Content</p>
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <p>Image</p>
                    {image && <img className="addPostImage" src={image} alt="Post" />}
                    <input type="file" onChange={handleImageChange} />
                </div>


                <div className="editbtn">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleBack}>Back</button>
                </div>

            </form>
        </div>
    )
}