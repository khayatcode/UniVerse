import React from 'react'

const LikeButton = (props) => {
    const {post, sessionId, loggedInUserLikes, addLike, removeLike} = props

    const addLikeHandler = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:5000/create_like/${sessionId}/${post.id}`, {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            console.log("data in submitLike", data)
            if (data.success) {
                console.log("Like has been added")
                addLike(data.like)
            }
        })
        .catch(err => {
            console.log(err)
            console.log("There was an error adding the Like")
        })
    }

    const deleteLikeHandler = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:5000/delete_like/${sessionId}/${post.id}`, { 
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            console.log("data in submitDeleteLike", data)
            if (data.success) {
                console.log("Like has been deleted")
                removeLike(data.like.id)
            }
        })
        .catch(err => {
            console.log(err)
            console.log("There was an error deleting the Like")
        })
    }






  return (
    <div>
        {loggedInUserLikes.find(like => like.post_id == post.id) ?
           <button onClick={deleteLikeHandler} className='btn btn-danger btn-sm'>Unlike</button>
            :
            <button onClick={addLikeHandler} className='btn btn-primary btn-success btn-sm'>Like</button>
        }
    </div>
  )
}

export default LikeButton