import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import "./AddFolder.css";
import config from "../config";

export default class AddFolder extends Component {
  state = {
    name: ""
  };
  handleFolderName = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name
      }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(folder => {
        this.props.addFolder(folder);
        this.props.history.goBack();
      });
  };

  render() {
    console.log(this.state.name);

    return (
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="folder-name-input">Name</label>
            <input
              type="text"
              value={this.state.name}
              id="folder-name-input"
              onChange={this.handleFolderName}
            />
          </div>
          <div className="buttons">
            <button type="submit" onClick={this.handleSubmit}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}
