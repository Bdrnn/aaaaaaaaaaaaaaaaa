import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './UserContext';

const PostContext = createContext();

export function PostProvider({ children }) {
    const [posts, setPosts] = useState(() => {
        const savedPost = localStorage.getItem('posts');
        return savedPost ? JSON.parse(savedPost) : [];
    });
    const { currentUser } = useAuth();

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts])

    const savePosts = (newPosts) => {
        setPosts(newPosts);
        localStorage.setItem("posts", JSON.stringify(newPosts));
    }

    const addPost = (title, content, image) => {
        const newPost = {
            id: Date.now(),
            user: currentUser.username,
            title,
            content,
            author: currentUser.displayName,
            createdAt: new Date().toISOString(),
            image,
        }
        setPosts([newPost, ...posts]);
    }

    const updatePost = (id, title, content, image) => {
        const updated = posts.map(p => p.id === id
            ? { ...p, title, content, image: image ?? p.image } :
            p)
        savePosts(updated);
    };

    const deletePost = (id) => {
        const filtered = posts.filter(p => p.id !== id);
        savePosts(filtered);
    };

    return (
        <PostContext.Provider value={{ addPost, updatePost, deletePost, posts }}>
            {children}
        </PostContext.Provider>
    )
}

export const usePosts = () => useContext(PostContext);