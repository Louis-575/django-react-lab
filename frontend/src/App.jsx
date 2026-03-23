import react from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"

/* Logout function, clears storage and and returns to the login page. */
function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
}
/* Clears storage when a new user is registered */
function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
}
function App() {

  return (
    <BrowserRouter>
        <Routes>
            
            /*Route to the home page is protected*/
            <Route
                path="/"
                element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
                }
            />
            
            /*Routes to the login, logout, register and other pages are not protected*/
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
