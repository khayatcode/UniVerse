import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Reg from './components/Reg';
import Log from './components/Log';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import Cookies from 'js-cookie';
import EditProfile from './components/EditProfile';
import EditPost from './components/EditPost';
import ViewPost from './components/ViewPost';
import NotFound from './components/NotFound';
import { useNavigate } from 'react-router-dom';
import { config } from './Constants';


function App() {
  const [sessionId, setSessionId] = useState(Cookies.get("sessionId") || "");
  const SERVER_URL = config.url;
  console.log("URL:", SERVER_URL);
  useEffect(() => {
    console.log("sessionId changed:", sessionId);
    Cookies.set("sessionId", sessionId);
  }, [sessionId]);


  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Reg sessionId={sessionId} setSessionId={setSessionId}/>} />
        <Route path="/login" element={<Log sessionId={sessionId} setSessionId={setSessionId}/>} />
        <Route path="/dashboard/:sessionId" element={<Dashboard sessionId={sessionId} setSessionId={setSessionId}/>} />
        <Route path="/profile/:userId" element={<Profile sessionId={sessionId} setSessionId={setSessionId}/>} />
        <Route path="/profile/edit/:sessiodId" element={<EditProfile sessionId={sessionId} setSessionId={setSessionId}/>} />
        <Route path="/post/edit/:postId" element={<EditPost sessionId={sessionId} setSessionId={setSessionId}/>} />
        <Route path="/post/view/:postId/:userId" element={<ViewPost sessionId={sessionId} setSessionId={setSessionId}/>} />
        {/* Add a default route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}


export default App;
