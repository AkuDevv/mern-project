import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class UpdateNote extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeNote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      note: ""
    };
  }
  /*
    componentDidMount(){
                axios.get('http://localhost:5000/notes/findone/'+this.props.match.params.stid+"/"+this.props.match.params.subid)
                .then(res=>{
                    this.setState({
                        note : res.data.note,
                    })
            })
            .catch(err=>{console.log(err)});
        }
*/
  onChangeNote(e) {
    this.setState({
      note: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const note = {
      student: this.props.match.params.stid,
      subject: this.props.match.params.subid,
      note: this.state.note
    };

    console.log(note);

    axios
      .post(
        "http://localhost:5000/notes/update/" +
          this.props.match.params.stid +
          "/" +
          this.props.match.params.subid,
        note
      )
      .then(res => {
        alert(res.data);
      })
      .catch(() => alert("Erreur de modification !"));

    this.setState({
      note: ""
    });
    //window.location = '/';
  }

  render() {
    return (
      <div className="container">
        <MDBContainer>
          <MDBRow center={true}>
            <MDBCol md="8">
              <h2>Editer une note</h2>
              <br />
              <form onSubmit={this.onSubmit}>
                <div className="grey-text">
                  <div className="form-group">
                    <label>Note : </label>
                    <input
                      className="form-control"
                      value={this.state.name}
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

export default UpdateNote;
