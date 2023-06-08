import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./Layout";
import Home from "./components/Home";
import Error from "./components/Error";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import Unauthorize from "./components/Unauthorize";
import Linkpage from "./components/Linkpage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

const App = () => {
  const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public route */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="linkpage" element={<Linkpage />} />
          <Route path="unauthorized" element={<Unauthorize />} />

          {/* we want to protected this route */}
          <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
          </Route>
          {/* catch all path */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
