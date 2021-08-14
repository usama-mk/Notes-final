import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50%",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid gray",
    borderRadius: "10px",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
  //   <div className="LogInPrompt">
  //   <div className="LogInHex">
  //     <h1>Please login</h1>

  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="username">Username</label>
  //         <input
  //           type="text"
  //           value={formData.username}
  //           onChange={handleChange}
  //           name="username"
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="password">Password</label>
  //         <input
  //           type="password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           name="password"
  //         />
  //       </div>
  //       <input type="submit" value="Login" />
  //     </form>
  //   </div>
  // </div>

    <div style={modalStyle} className={classes.paper}>
      <div style={{backgroundColor:'red'}}>
    kndfksfnfkdmn dckm
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
        
      </Modal>
    </div>
  );
}
