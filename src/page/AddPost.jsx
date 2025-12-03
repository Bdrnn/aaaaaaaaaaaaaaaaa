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
        <div>
            <h1>Add post</h1>
            <form onSubmit={handleSubmit}>
                <p>Title</p>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <p>Content</p>
                <input
                    placeholder="Content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
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
                <button type="submit">Post</button>
            </form>
        </div>
    )
}