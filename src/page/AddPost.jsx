import { useState } from "react"
import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const { addPost } = usePosts();
    const navigate = useNavigate();

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !content && !image) {
            alert('Title and content cannot be empty');
            return;
        }

        addPost(title, content, image);

        setTitle('');
        setContent('');
        setImage(null);

        navigate('/');
    }

    return (
        <div className="addPostContainer">

            <form onSubmit={handleSubmit}>
                <h1>Add post</h1>
                <div>
                    <p>Title</p>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <p>Content</p>
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>

                <div>
                    <p>Image</p>
                    {image && (
                        <img src={image} alt="Preview" style={{
                            width: "200px"

                        }} />
                    )}
                    <input
                        type="file"
                        onChange={handleImage}
                    />
                </div>

                <button type="submit">Post</button>
            </form>
        </div>
    )
}