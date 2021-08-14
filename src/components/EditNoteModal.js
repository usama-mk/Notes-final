import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';



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
        position: 'absolute',
        width: "50%",
        height: "auto",
        backgroundColor: theme.palette.background.paper,
        border: '1px solid gray',
        borderRadius: "10px",
        boxShadow: theme.shadows[6],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    let currentTitle = props.currentTitle;
    let currentBody = props.currentBody;

    let newTitle = "" + currentTitle;
    let newDescription = "" + currentBody;


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.setOpen(false);
    };
    const onSave = (e) => {        
        props.saveEdit({ id: props.id, title: newTitle, body: newDescription });
        handleClose();
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3>Edit Note</h3>
            <span>Title</span>
            <input type={"text"} placeholder={"Enter New Title"} defaultValue={currentTitle} style={{ width: "100%" }} onChange={(e) => { newTitle = e.target.value; }} /><br /><br />
            <span>Description</span>
            <textarea placeholder={"Enter New Description"} defaultValue={currentBody} style={{ width: "100%" }} rows={5} onChange={(e) => { newDescription = e.target.value; }} />
            <Button variant={"outlined"} color={"primary"} onClick={onSave}>Save</Button>
            <SimpleModal />
        </div>
    );

    return (
        <div style={{ margin: "auto", }}>

            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>

        </div>
    );
}
