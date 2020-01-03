import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class EditProf extends Component {
    
    constructor(props){
        super(props);

        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeTel=this.onChangeTel.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            name: '',
            email:'',
            tel:'',
        }
    }

    componentDidMount(){
                axios.get('http://localhost:5000/professors/'+this.props.match.params.id)
                .then(res=>{
                    this.setState({
                        name : res.data.name,
                        email : res.data.email,
                        tel : res.data.tel,
                    })
            })
            .catch(err=>{console.log(err)});
        }

    onChangeName(e){
        this.setState({
            name : e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value
        });
    }

    onChangeTel(e){
        this.setState({
            tel : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const professor = {
            name : this.state.name,
            email : this.state.email,
            tel : this.state.tel,
        };

        console.log(professor);

        axios.post('http://localhost:5000/professors/update/'+this.props.match.params.id,professor)
            .then(res => {
                alert(res.data);
            })
            .catch(()=>alert("Erreur de modification !"));

            this.setState({
                name : '',
                email : '',
                tel : ''
            });
        //window.location = '/';
    }

    render() { 
        return ( 
            <div className="container">
                <MDBContainer>
                    <MDBRow center={true}>
                      <MDBCol md="8">
                        <h2>Editer un professeur</h2>
                        <br/>
                        <form onSubmit={this.onSubmit}>
                          <div className="grey-text">
                            <div className="form-group">
                            <label>Nom : </label>
                            <input
                              className="form-control"
                              value={this.state.name}
                              onChange={this.onChangeName}
                            />
                            </div>
                            <div className="form-group">
                            <label>Email : </label>
                            <input
                            className="form-control"
                              value={this.state.email}
                              onChange={this.onChangeEmail}
                            />
                            </div>
                            <div className="form-group">
                            <label>Telephone : </label>
                            <input
                            className="form-control"
                              onChange={this.onChangeTel}
                              value={this.state.tel}
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
 
export default EditProf;