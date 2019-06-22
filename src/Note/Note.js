import React from "react";
import { Link } from "react-router-dom";
// import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Note.css";

export default class Note extends React.Component {
  handleDelete = e => {
    let id = this.props.id;
    console.log(id);

    e.preventDefault();
    fetch(`http://localhost:8000/api/notes/${id}`, {
      method: "DELETE"
    })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  };
  render() {
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/notes/${this.props.id}`}>{this.props.name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleDelete}
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
