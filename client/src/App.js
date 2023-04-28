import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import NotFound from "./components/NotFound";
import Search from "scenes/search";
import Message from "scenes/message";
import Notify from "scenes/notify";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from './customRouter/PrivateRouter';

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <HomePage/> : <LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/search/:userId"
              element={isAuth ? <Search /> : <Navigate to="/" />}
            />
            <Route
              path="/message/:userId"
              element={isAuth ? <Message /> : <Navigate to="/" />}
            />
            <Route
              path="/notify/:userId"
              element={isAuth ? <Notify /> : <Navigate to="/" />}
            />
            {/* <PrivateRouter exact path="/:page" component={PageRender} /> */}
            {/* <PrivateRouter exact path="/:page/:userId" component={PageRender} /> */}
            <Route path="*" element={ isAuth ? <NotFound />  : <Navigate to="/" />}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
