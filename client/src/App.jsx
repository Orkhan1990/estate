import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import PrivateRouter from "./components/PrivateRouter";
import Listing from "./pages/Listing";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Home/>} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/about" element={<About/>} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/listing" element={<Listing/>} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
