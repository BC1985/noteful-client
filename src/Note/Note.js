import React from "react";
import { Link, Redirect } from "react-router-dom";
// import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../config";
import "./Note.css";

export default class Note extends React.Component {
  constructor() {
    super();
    this.state = {
      note_name: "",
      content: ""
    };
  }
  deleteNote = e => {
    let id = this.props.id;
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/notes/${id}`, {
      method: "DELETE"
    })
      .then(() => this.props.deleteNote(id))
      .catch(error => console.error(error))
      .then(
        this.setState({
          Redirect: true
        })
      );
  };
  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/notes/${this.props.id}`}>{this.props.name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.deleteNote}
        >
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note_content">{this.props.content}</div>
        {/* <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{" "}
            <span className="Date">
              {format(this.props.modified, "Do MMM YYYY")}
            </span>
          </div>
        </div> */}
      </div>
    );
  }
}
