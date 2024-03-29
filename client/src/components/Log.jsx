import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Galaxy from '../images/galaxy.jpg'
import MilkyWay from '../images/milkyWay.jpeg'
import { config } from '../Constants'

const SERVER_URL = config.url;

const Log = (props) => {
    const { sessionId, setSessionId } = props
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    console.log("session id: ", sessionId)

    // do something that if session id still exists remove it
    useEffect(() => {
        if (sessionId) {
            Cookies.remove("sessionId")
            setSessionId(null)
        }
    }, [])

    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const submitLog = (e) => {
        e.preventDefault()

        fetch(`${SERVER_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(response => response.json())
            .then(data => {
                console.log("data in submitLogin", data)
                if (data.success) {
                    setUserInfo({
                        email: "",
                        password: ""
                    })
                    setErrors({})
                    setSessionId(data.user.id)
                    Cookies.set("sessionId", data.user.id)
                    navigate("/dashboard/" + data.user.id)
                } else {
                    setErrors(data.message)
                }
            })
            .catch(err => {
                console.log(err)
                console.log("Network error")
            })
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);




    return (
        <div>
            {/* <div className="row p-2 text-centre" style={{backgroundColor: "#483D8B" }}>
            </div> */}
            <div style={{ backgroundImage: `url(${MilkyWay})`, minHeight: "100vh" }}>
                <h1 className='' style={{ color: "white", backgroundColor: 'transparent', fontWeight: 300, padding: '35px' }}>UniVerse</h1>
                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '100px' }}>
                    <div className="col-8 row rounded-3 p-4" style={{ backgroundColor: "#f2f2f2" }}>
                        <div className="row mb-3">
                            <div className="col">
                                <h5><strong>Login to Your UniVerse</strong></h5>
                            </div>
                        </div>
                        {errors.length > 0 ?
                            <p className="text-danger">{errors}</p> :
                            null
                        }
                        <form onSubmit={submitLog}>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-floating">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            id="email"
                                            onChange={changeHandler}
                                            placeholder="Email"
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="form-floating">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            id="password"
                                            onChange={changeHandler}
                                            placeholder="Password"
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3 ">
                                <input
                                    type="submit"
                                    className="btn text-white col-4 mx-auto"
                                    style={{ backgroundColor: '#483D8B' }}
                                    value="Login"
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <Link to="/register" style={{ color: "#483D8B" }}>Don't have an account? Register here.</Link>
                                </div>
                            </div>
                        </form>
                        {/* Write demo account */}
                        <div className="row mb-3">
                            <div className="col">
                                <p className="text-muted small">Demo Account: <br /> Email: yoda123@hotmail.com
                                    <br /> Password: Test12345</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Log