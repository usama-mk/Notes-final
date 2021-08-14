import React, { useState, useContext } from "react";
import NoteCard from "./NoteCard";
import { Button, Modal, Card, IconButton, Badge } from "@material-ui/core";
import NoteIcon from "@material-ui/icons/Note";
import { NoteContext } from "../context/note";
import { UserContext } from "../context/user";

const NotesContainer = () => {
  const { addNote, deleteNote, updateNote, notes } = useContext(NoteContext);
  const { user } = useContext(UserContext);

  const [showaddNoteModal, setShowAddNoteModal] = useState(false);

  let newTitle = "";
  let newBody = "";

  // save new note
  const onSave = async (e = null) => {
    if (newBody) {
      await addNote({
        variables: { title: newTitle, content: newBody, status: "PUBLISH" },
      });
      setShowAddNoteModal(false);

      newTitle = "";
      newBody = "";
    }
  };

  // Delete note
  const onDelete = (id) => {
    deleteNote({ variables: { id } });
  };

  const saveEditedNote = (editedNote) => {
    updateNote({
      variables: {
        id: editedNote.id,
        title: editedNote.title,
        content: editedNote.body,
      },
    });
  };

  const AddNoteModal = () => {
    return (
      <>
        <Modal
          open={showaddNoteModal}
          onClose={() => {
            setShowAddNoteModal(false);
          }}
          style={{ width: "50%", height: "50%", margin: "auto" }}
        >
          <Card>
            <div style={{ backgroundColor: "white", padding: "10px" }}>
              <h3>Add Note</h3>
              <span>Title</span>
              <input
                type={"text"}
                placeholder={"Enter Title"}
                style={{ width: "100%" }}
                onChange={(e) => {
                  newTitle = e.target.value;
                }}
              />
              <br />
              <br />
              <span>Description</span>
              <textarea
                placeholder={"Enter Description"}
                style={{ width: "100%", border: "1px" }}
                rows={5}
                onChange={(e) => {
                  newBody = e.target.value;
                }}
              />
              <Button variant={"outlined"} color={"primary"} onClick={onSave}>
                Save
              </Button>
            </div>
          </Card>
        </Modal>
      </>
    );
  };

  return user ? (
    <>
      <AddNoteModal />
      <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="primary"
        onClick={() => setShowAddNoteModal(true)}
        style={{ marginTop: "0px" }}
      >
        {" "}
        Add Note
        <Badge badgeContent={notes?.length} color="secondary">
          <NoteIcon />
        </Badge>
      </IconButton>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", 
          marginTop: '40px'
        }}
      >
        <br />
        <div className="positioning">
          <div className="hive-container">
            <div className="hive">
        {notes?.map((note) => (
          <NoteCard
            id={note.id}
            title={note.title}
            body={note.content}
            onDeleteClick={onDelete}
            saveEdit={saveEditedNote}
          />
        ))}
        </div>
        </div>
        </div>
       
      </div>
    </>
  ) : null;
};

export default NotesContainer;
