import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../graphql/mutation";
import { GET_NOTES } from "../graphql/query";

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState();

  const user =
    localStorage.getItem("notes_app_user") &&
    JSON.parse(localStorage.getItem("notes_app_user"));

  // Get notes
  const { data } = useQuery(GET_NOTES, {
    variables: { author: user?.databaseId },
  });

  useEffect(() => {
    if (data?.posts) {
      setNotes(data?.posts?.nodes);
    }
  }, [data]);

  // Add new note
  const [addNote] = useMutation(CREATE_NOTE, {
    onCompleted(result) {
      let updatedNotes = [result.createPost.post, ...notes];
      setNotes(updatedNotes);
    },
  });

  // Delete note
  const [deleteNote] = useMutation(DELETE_NOTE, {
    onCompleted(result) {
      let filteredNotes = notes.filter(
        (note) => note.id != result.deletePost.deletedId
      );
      setNotes(filteredNotes);
    },
  });

  const [updateNote] = useMutation(UPDATE_NOTE, {
    onCompleted(result) {
      console.log(result.updatePost.post.id);
      let changedNotes = [...notes];
      changedNotes.forEach((note, index) => {
        if (note.id == result.updatePost.post.id) {
          changedNotes[index].title = result.updatePost.post.title;
          changedNotes[index].content = result.updatePost.post.content;
        }
      });
      setNotes(changedNotes);
    },
  });

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
