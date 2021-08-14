import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditNoteModal from "./EditNoteModal";
import ReactHtmlParser from "react-html-parser";


export default function NoteCard({ id, title, body, onDeleteClick, saveEdit }) {
  const [edit, setEdit] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteBody, setNoteBody] = useState(body);
  useEffect(() => {
    setNoteTitle(title);
    setNoteBody(body);
  }, [title, body]);

  return (
    <div className="hex-pos">
    <div className="hex" id="uniqueidentifier">
    <EditNoteModal
        open={edit}
        setOpen={setEdit}
        currentTitle={title}
        currentBody={body}
        id={id}
        saveEdit={saveEdit}
      />
      <div className="content note">
      <Button
          size="small"
          color="primary"
          onClick={() => {
            setEdit(true);
          }}
        >
          EDIT
        </Button>
      <Button
          startIcon={<DeleteIcon />}
          color="error"
          style={{ color: "red" }}
          onClick={() => {
            onDeleteClick(id);
          }} 
        >
          Delete
         </Button>
        <h1 className="name">{ReactHtmlParser(noteTitle)}</h1>
        <div className="body centered">{ReactHtmlParser(noteBody)}</div>
      </div>
    </div>
  </div>
    // <Card style={{ marginBottom: "10px", width: "100%", border: "5px" }}>
    //   <EditNoteModal
    //     open={edit}
    //     setOpen={setEdit}
    //     currentTitle={title}
    //     currentBody={body}
    //     id={id}
    //     saveEdit={saveEdit}
    //   />
    //   <CardActionArea
    //     onClick={() => {
    //       setEdit(true);
    //     }}
    //   >
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="h2">
    //         {noteTitle}
    //       </Typography>
    //       <Typography
    //         variant="body2"
    //         color="textSecondary"
    //         component="p"
    //         dangerouslySetInnerHTML={{ __html: noteBody }}
    //       >
    //         {/* {noteBody} */}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button
    //       size="small"
    //       color="primary"
    //       onClick={() => {
    //         setEdit(true);
    //       }}
    //     >
    //       EDIT
    //     </Button>
    //     <Button
    //       startIcon={<DeleteIcon />}
    //       color="error"
    //       style={{ color: "red" }}
    //       onClick={() => {
    //         onDeleteClick(id);
    //       }}
    //     >
    //       Delete
    //     </Button>
    //   </CardActions>
    // </Card>
  );
}
