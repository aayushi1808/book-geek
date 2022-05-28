import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Avatar,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { auth, db, provider } from "../../../services/firebaseService";
import { signInWithPopup } from "firebase/auth";
import {
  Logout,
  Person,
  WatchLater,
  History,
  MovieFilter,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import withRoot from "../withRoot";
import * as userApi from "../../../services/userApi";
import logo from "../../../assets/BG_icon.png";

function AppAppBar({ isAuth, setIsAuth }) {
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      var userDoc = await userApi.getUser(result.user.uid);
      if (!userDoc.exists()) {
        await userApi.createUser(result.user.uid, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
        });
        navigate("/profile");
      }
      setIsAuth(true);
    });
  };

  const signOut = () => {
    auth.signOut();
    setIsAuth(false);
    navigate("/");
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img src={logo} alt="Book Geek" height={50} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ fontSize: 24 }}
          >
            {"Book Geek"}
          </Link>
          <Box sx={{ flex: 1 }} />
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Visit Project Gutenberg">
              <a
                href="https://www.gutenberg.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton>
                  <Avatar
                    alt="Gutenberg"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Project_Gutenberg_logo.svg/1200px-Project_Gutenberg_logo.svg.png"
                  />
                </IconButton>
              </a>
            </Tooltip>
            <Tooltip title="Movies based on Books">
              <IconButton
                onClick={() => navigate("/book-movie-recommendation")}
              >
                <Avatar style={{ backgroundColor: "#1e1e1f" }}>
                  <MovieFilter style={{ color: "#fff5f8" }} />
                </Avatar>
              </IconButton>
            </Tooltip>
            {isAuth ? (
              <>
                <Tooltip title={auth.currentUser.displayName}>
                  <IconButton
                    onClick={handleClick}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      alt={auth.currentUser.displayName}
                      src={auth.currentUser.photoURL}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => navigate("/")}>
                    {auth.currentUser.displayName}
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/read-later")}>
                    <ListItemIcon>
                      <WatchLater fontSize="small" />
                    </ListItemIcon>
                    Read Later
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/history")}>
                    <ListItemIcon>
                      <History fontSize="small" />
                    </ListItemIcon>
                    History
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/profile")}>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={signOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={signInWithGoogle}
                size="medium"
                style={{
                  backgroundColor: "white",
                  margin: "0.5rem 0 0.5rem 0",
                }}
              >
                <GoogleIcon style={{ paddingRight: "5px" }} /> Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default withRoot(AppAppBar);
