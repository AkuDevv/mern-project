import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Professor = props => (
  <tr>
    <td>{props.professor.name}</td>
    <td>{props.professor.email}</td>
    <td>{props.professor.tel}</td>
    <td>
      <Link to={"/updateprof/" + props.professor._id}>
        <i className="far fa-edit"></i>
      </Link>{" "}
      |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteProfessor(props.professor._id);
        }}
      >
        <i className="far fa-trash-alt"></i>
      </a>
    </td>
  </tr>
);

class ProfPage extends Component {
  constructor(props) {
    super(props);

    this.deleteProfessor = this.deleteProfessor.bind(this);
    this.onChangeRech = this.onChangeRech.bind(this);

    this.state = {
      professors: [],
      search: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/professors/")
      .then(res => {
        this.setState({
          professors: res.data
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

  deleteProfessor(id) {
    axios
      .delete("http://localhost:5000/professors/" + id)
      .then(res => console.log(res.data));

    this.setState({
      professors: this.state.professors.filter(i => i._id !== id)
    });
  }

  professorsList() {
    return this.state.professors
      .filter(
        prof =>
          prof.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
          this.state.search.length === 0
      )
      .map(currentProfessor => {
        return (
          <Professor
            professor={currentProfessor}
            deleteProfessor={this.deleteProfessor}
            key={currentProfessor._id}
          />
        );
      });
  }

  render() {
    return (
      <div className="container">
        <Link to="/createprofessor">
          <button
            style={{ borderRadius: "30px" }}
            type="button"
            className="btn btn-success btn-sm float-right"
          >
            <i className="fas fa-plus"></i>
          </button>
        </Link>
        <div className="grey-text">
          <input
            className="form-control"
            placeholder="Rechercher par nom"
            onChange={this.onChangeRech}
          />
        </div>
        <hr />

        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.professorsList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ProfPage;
