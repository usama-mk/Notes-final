import React, { useState, useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { APP_NAME } from "../constants/constants";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LoginModal from "react-login-modal";
import { Modal } from "@material-ui/core";
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";
import SimpleModal from "./AuthModal";
import './AuthModal.css'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const TopBar = () => {
  const { register, login, logout } = useContext(UserContext);

  const user =
    localStorage.getItem("notes_app_user") &&
    JSON.parse(localStorage.getItem("notes_app_user"));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLoginClick = (event) => {
    setShowAuthModal(true);
    handleMenuClose();
  };

  const AuthModal = () => {
    const handleSignup = async (username, email, password) => {
      await register({ variables: { username, email, password } });
      setShowAuthModal(false);
    };
    const handleLogin = async (username, password) => {
      await login({ variables: { username, password } });
      setShowAuthModal(false);
    };
    const [formData, setFormData] = useState({
      username: "", // Havock
      password: "", // Bkbi vP8z jmoK FVYB ANwf Nt0t
      email: "",
    });

    const [signup, setSignup]= useState(false)

    const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
      
     signup?
     handleSignup(formData.username, formData.email, formData.password):
     handleLogin(formData.username, formData.password)
    };

    const handleToggleModal=(event)=>{

      var modal = document.getElementById('loginPrompt');

      if (event.target == modal) {
        setShowAuthModal(false);
      }
    }

    return (
      <>
       
        {
          !user?
          <div id="loginPrompt" onClick={handleToggleModal} className="LogInPrompt">
          <div className="LogInHex">
            <h1 style={{marginBottom: '20px'}} >{signup?"Please Signup":"Please login"}</h1>
    
            <form style={{
              borderRadius: '50px'
            }} onSubmit={handleSubmit}> 
            {
                signup &&
                <div>

              <div>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="email"
                />
              </div>

                </div>
                
              }

              <div>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  name="username"
                  placeholder="username"
                />
              </div>

              <div>
    
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="password"
                />
              </div>
              

             
              <input className="submit" style={{cursor: 'pointer'}} type="submit" value={signup?'SignUp':'Login'} />


              <div className="signs">
               {
                 signup?
                 <div style={{margin: '10px'}}>
                    <p>Already have an Account?</p>
                    <br />
                <span style={{color: 'lightblue', fontWeight: 'bold', cursor: 'pointer'}} onClick={()=> setSignup(false)} >Click to SignIn</span>
                 </div>
                 :
                 <div style={{margin: '10px'}} >
                    <p>Don't have an Account?</p>
                    <br />
                <span style={{color: 'lightblue', fontWeight: 'bold', cursor: 'pointer'}} onClick={()=> setSignup(true)} >Click to SignUp</span>
                 </div>
               }
              </div>
            </form>
          </div>
        </div>
          :''
        }
      </>
    );
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user?.id ? (
        <>
          <MenuItem
            onClick={() => {
              logout();
              handleMenuClose();
              // history.push('/')
              window.location.reload();
            }}
          >
            Logout
          </MenuItem>
          <MenuItem>
            <Link to="/profile">Profile</Link>
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleLoginClick}>Login/Signup</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user?.id ? (
        <>
          <MenuItem
            onClick={() => {
              logout();
              handleMenuClose();
              // history.push('/')
              window.location.reload();
            }}
          >
            Logout
          </MenuItem>
          <MenuItem>
            <Link to="/profile">Profile</Link>
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleLoginClick}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge color="secondary">
              <VpnKeyIcon />
            </Badge>
          </IconButton>
          <p>Login/Signup</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AuthModal />
      <AppBar style={{backgroundColor: 'transparent'}} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {APP_NAME}
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle  />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export default TopBar;
