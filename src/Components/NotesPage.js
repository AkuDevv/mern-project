import React, { Component } from "react";
import Axios from "axios";
import { MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

const Note = props => (
  <tr>
    <td>{props.currentNote.subject}</td>
    <td>{props.currentNote.note}</td>
    <td>
      <Link
        to={
          "/updatenote/" +
          props.currentNote.stid +
          "/" +
          props.currentNote.subjectid
        }
      >
        <i className="far fa-edit"></i>
      </Link>
    </td>
  </tr>
);

class NotesPage extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      student: "",
      notes: [],
      subname: [],
      studentnotes: []
    };
  }

  onChangeName(e) {
    this.setState({
      student: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    Axios.get("http://localhost:5000/students/nom/" + this.state.student)
      .then(res => {
        this.setState({
          idStudent: res.data._id,
          idFil: res.data.filiere
        });
        Axios.get("http://localhost:5000/filieres/" + this.state.idFil)
          .then(res => {
            this.setState({
              subjects: res.data.subjects
            });
            Axios.get("http://localhost:5000/subjects/")
              .then(res => {
                this.setState({
                  subname: res.data.filter(s =>
                    this.state.subjects.includes(s._id)
                  )
                });
                console.log(this.state.subname);

                Axios.get("http://localhost:5000/notes/" + this.state.idStudent)
                  .then(res => {
                    this.setState({
                      notes: res.data
                    });
                    var not = this.state.subname.map(s => {
                      return {
                        subject: s.name,
                        subjectid: s._id,
                        stid: this.state.idStudent,
                        note:
                          this.state.notes
                            .filter(n => n.subject === s._id)
                            .map(m => m.note)[0] ?? "-",
                        noteid:
                          this.state.notes
                            .filter(n => n.subject === s._id)
                            .map(m => m._id)[0] ?? "-"
                      };
                    });
                    this.setState({
                      studentnotes: not
                    });
                    console.log(this.state.studentnotes);
                  })
                  .catch(() => alert("Erreur !!"));
              })
              .catch(() => alert("Erreur !!"));
          })
          .catch(() => alert("Erreur !!"));
      })
      .catch(() => alert("Erreur !!"));
  }

  notesList() {
    return this.state.studentnotes.map((currentNote, i) => {
      return <Note key={i} currentNote={currentNote} />;
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              placeholder="Entrer le nom d'etudiant"
              className="form-control"
              value={this.state.student}
              onChange={this.onChangeName}
            />
          </div>
          <div className="text-center py-4 mt-3">
            <MDBBtn color="primary" type="submit">
              Rechercher
            </MDBBtn>
          </div>
        </form>
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Matiere</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.notesList()}</tbody>
        </table>
      </div>
    );
  }
}

export default NotesPage;
