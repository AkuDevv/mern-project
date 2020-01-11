import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = props => (
  <tr>
    <td>{props.student.name}</td>
    <td>{props.student.birthdate.substring(0, 10)}</td>
    <td>{props.student.email}</td>
    <td>{props.student.tel}</td>
    <td>{props.fil}</td>
    <td>
      <Link to={"/update/" + props.student._id}>
        <i className="far fa-edit"></i>
      </Link>{" "}
      |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteStudent(props.student._id);
        }}
      >
        <i className="far fa-trash-alt"></i>
      </a>
    </td>
  </tr>
);

class StudentsPage extends Component {
  constructor(props) {
    super(props);

    this.deleteStudent = this.deleteStudent.bind(this);
    this.onChangeRech = this.onChangeRech.bind(this);

    this.state = {
      students: [],
      filieres: [],
      search: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/filieres/")
      .then(res => {
        this.setState({
          filieres: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/students/")
      .then(res => {
        this.setState({
          students: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChangeRech(e) {
    this.setState({
      search: e.target.value
    });
  }

  deleteStudent(id) {
    axios
      .delete("http://localhost:5000/students/" + id)
      .then(res => console.log(res.data));

    this.setState({
      students: this.state.students.filter(i => i._id !== id)
    });
  }

  studentsList() {
    return this.state.students
      .filter(
        student =>
          student.name
            .toLowerCase()
            .includes(this.state.search.toLowerCase()) ||
          this.state.filieres
            .filter(fil => fil._id === student.filiere)
            .map(fil => fil.nom)[0]
            .toLowerCase()
            .includes(this.state.search.toLowerCase()) ||
          this.state.search.length === 0
      )
      .map(currentStudent => {
        return (
          <Student
            student={currentStudent}
            deleteStudent={this.deleteStudent}
            key={currentStudent._id}
            fil={this.state.filieres
              .filter(fil => fil._id === currentStudent.filiere)
              .map(fil => fil.nom)}
          />
        );
      });
  }

  render() {
    return (
      <div className="container">
        <Link to="/createstudent">
          <button
            type="button"
            style={{ borderRadius: "30px" }}
            className="btn btn-success btn-sm float-right"
          >
            <i className="fas fa-plus"></i>
          </button>
        </Link>
        <div className="grey-text">
          <input
            className="form-control"
            placeholder="Rechercher par nom ou filière"
            onChange={this.onChangeRech}
          />
        </div>
        <hr />

        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Nom</th>
              <th>Date de naissance</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Filiere</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.studentsList()}</tbody>
        </table>
      </div>
      //</Router>
    );
  }
}

export default StudentsPage;
