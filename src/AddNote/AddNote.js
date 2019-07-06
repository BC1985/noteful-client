import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import "./AddNote.css";
import config from "../config";

export default class AddNote extends Component {
  static defaultProps = {
    folders: []
  };
  constructor() {
    super();
    this.state = {
      name: "",
      content: "",
      folder_id: ""
    };
  }

  handleFolderSelect = e => {
    this.setState({
      folder_id: e.target.value
    });
  };
  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleContentInput = e => {
    this.setState({
      content: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const newNote = {
      note_name: this.state.name,
      content: this.state.content,
      folder_id: parseInt(this.state.folder_id)
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(note => {
        this.props.addNote(note);
      })
      .then(this.props.history.goBack());
  };
  render() {
    const { folders } = this.props;
    const { folder_id, name, content } = this.state;
    const isEnabled = folder_id && content.length > 0 && name.length > 0;
    return (
      <section className="AddNote">
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="note-name-input">Name</label>
            <input
              type="text"
              id="note-name-input"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea
              id="note-content-input"
              type="text"
              value={this.state.content}
              onChange={this.handleContentInput}
            />
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">Folder</label>
            <select id="note-folder-select" onChange={this.handleFolderSelect}>
              <option value={""}>...</option>
              {folders.map(folder => (
                <option key={folder.folder_id} value={folder.folder_id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button
              type={!isEnabled ? "disabled" : "submit"}
              disabled={!isEnabled}
              onClick={this.handleSubmit}
            >
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}
