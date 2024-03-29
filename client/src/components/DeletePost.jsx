import React from 'react'
import { config } from '../Constants'

const SERVER_URL = config.url;

const DeletePost = (props) => {
    const {postId, successCallback} = props

    const deletePost = (e) => {
        e.preventDefault()
        fetch(`${SERVER_URL}/api/delete_post/` + postId, {
            method: "DELETE"
        })
        .then(response => {
            console.log("response in deletePost", response);
            successCallback();
        }
        )
        .catch(err => {
            console.log(err);
            console.log("Console error");
        })
    }
  return (
    <div>
        <button className='btn btn-danger  postActionBtn'  onClick={deletePost}>Delete</button>
    </div>
  )
}

export default DeletePost