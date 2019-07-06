import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
// import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
// import dummyStore from '../dummy-store'
import { getNotesForFolder, findNote } from "../notes-helpers";
import "./App.css";
import config from "../config";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    this.fetchFolders();
    this.fetchNotes();
  }
  fetchFolders = () => {
    fetch(`${config.API_ENDPOINT}/folders`)
      .then(res => res.json())
      .then(folders =>
        this.setState({
          folders
        })
      );
  };
  fetchNotes = () => {
    fetch(`${config.API_ENDPOINT}/notes`)
      .then(res => res.json())

      .then(notes =>
        this.setState({
          notes
        })
      );
  };
  deleteNote = id => {
    console.log(id);
    this.setState({
      notes: this.state.notes.filter(n => n.id !== id)
    });
  };

  deleteFolder = folder_id => {
    this.setState({
      folders: this.state.folders.filter(
        f => f.folder_id !== parseInt(folder_id)
      )
    });
  };
  addNote = note => {
    console.log(note);

    this.setState({
      notes: [...this.state.notes, note]
    });
  };
  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };
  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId", "/note/:noteId", "add-note"].map(path => (
          <Route
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
                deleteNote={this.deleteNote}
              />
            )}
          />
        ))}
      </>
    );
  }

  renderNavBar() {
    const { notes, folders } = this.state;
    return (
      <>
        <NoteListNav
          folders={folders}
          notes={notes}
          deleteNote={this.deleteNote}
        />
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folders/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(
                notes,
                parseInt(folderId)
              );
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                  deleteNote={this.deleteNote}
                  deleteFolder={this.deleteFolder}
                />
              );
            }}
          />
        ))}
        <Route
          path="/notes/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            console.log(noteId);

            const note = findNote(notes, parseInt(noteId));
            console.log(note);
            return <NotePageMain {...routeProps} note={note} />;
          }}
        />
        <Route
          path="/add-folder"
          render={routeProps => {
            return <AddFolder {...routeProps} addFolder={this.addFolder} />;
          }}
        />
        <Route
          path="/add-note"
          render={routeProps => {
            return (
              <AddNote
                {...routeProps}
                folders={folders}
                addNote={this.addNote}
              />
            );
          }}
        />
      </>
    );
  }

  render() {
    return (
      <div className="App">
        {/* <div>{this.renderNavBar()}</div> */}
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
