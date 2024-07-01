// 


import React from 'react';
import Toggle from './Toggle';

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <Toggle label={`${blog.title} ${blog.author}`}>
                <div>{blog.url}</div>
                <div>likes {blog.likes} <button>like</button></div>
                <div>{blog.user.name}</div>
            </Toggle>
        </div>
    )
}

export default Blog;