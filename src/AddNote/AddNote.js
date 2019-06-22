import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import "./AddNote.css";
import { Redirect } from "react-router";

export default class AddNote extends Component {
  static defaultProps = {
    folders: []
  };
  constructor() {
    super();
    this.state = {
      name: "",
      content: "",
      folder: ""
    };
  }
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
  handleClick = () => {
    this.setState({
      redirect: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8000/api/notes", {
      method: "POST",
      body: JSON.stringify({
        note_name: this.state.name,
        content: this.state.content
      }),
      headers: {
        "content-type": "application/json"
      }
    }).then(res => console.log(res));
  };
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    const { folders } = this.props;

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
            <select
              id="note-folder-select"
              // onChange={this.setState({})}
            >
              <option value={null}>...</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button type="button" onClick={this.handleClick}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}
