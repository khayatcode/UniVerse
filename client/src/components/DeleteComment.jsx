import React from 'react'
import { config } from '../Constants'

const SERVER_URL = config.url;

const DeleteComment = (props) => {
    const {commentId, successCallback} = props

    const deleteComment = (e) => {
        e.preventDefault()
        fetch(`${SERVER_URL}/api/delete_comment/${commentId}`, {
            method: "DELETE"
        })
        .then(response => {
            console.log("response in deleteComment", response);
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
        <button className='btn btn-outline-danger commentDeleteBtn' onClick={deleteComment}>Remove</button>
    </div>
  )
}

export default DeleteComment