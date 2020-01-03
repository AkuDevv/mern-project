import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class EditFil extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nom: ""
    };
  }

  componentDidMount() {
      console.log(this.props.match.params.id);
    axios.get("http://localhost:5000/filieres/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          nom: res.data.nom,
          subjects : res.data.subjects
        });
        console.log(res.data);
      });
  }

  onChangeName(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const filiere = {
      nom: this.state.nom,
      subjects: this.state.subjects
    };

    console.log(filiere);

    axios.post(
        "http://localhost:5000/filieres/update/" + this.props.match.params.id,
        filiere
      )
      .then(res => {
        alert(res.data);
      })
      .catch(()=>alert("erreur de modification !"));

      this.setState({
        nom : '',
    });
    //window.location = '/';
  }

  render() {
    return (
      <div className="container">
        <MDBContainer>
          <MDBRow center={true}>
            <MDBCol md="8">
              <h2>Editer une filière</h2>
              <br />
              <form onSubmit={this.onSubmit}>
                <div className="grey-text">
                  <div className="form-group">
                    <label>Nom : </label>
                    <input
                      className="form-control"
                      value={this.state.nom}
                      onChange={this.onChangeName}
                    />
                  </div>

                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="primary" type="submit">
                      Editer
                    </MDBBtn>
                  </div>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default EditFil;
