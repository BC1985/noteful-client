import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import "./NoteListMain.css";
import config from "../config";

export default class NoteListMain extends React.Component {
  deleteFolder = e => {
    console.log(this.props);
    this.props.history.goBack();

    e.preventDefault();
    const { folderId } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: "DELETE"
    })
      .then(res => console.log(res))
      .then(() => {
        this.props.deleteFolder(folderId);
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <section className="NoteListMain">
        <ul>
          {this.props.notes.map(note => (
            <li key={note.id}>
              <Note
                deleteNote={this.props.deleteNote}
                id={note.id}
                name={note.note_name}
                // modified={note.modified}
                content={note.content}
              />
            </li>
          ))}
        </ul>
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>
        </div>
        {this.props.history.location.pathname.includes("folders") && (
          <div className="NoteListMain__button-container">
            <CircleButton
              type="button"
              className="NoteListMain__delete-folder-button"
              onClick={this.deleteFolder}
            >
              Delete folder
            </CircleButton>
          </div>
        )}
      </section>
    );
  }
}

NoteListMain.defaultProps = {
  notes: []
};
