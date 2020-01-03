import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class EditUser extends Component {
    
    constructor(props){
        super(props);

        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            username:'',
            password:'',
        }
    }

     componentDidMount(){
                axios.get('http://localhost:5000/admins/'+this.props.user.username+'/'+this.props.user.password)
                .then(res=>{
                    this.setState({
                        username : res.data.username,
                        password : res.data.password,
                    })
            })
            .catch(err=>{console.log(err)});
        }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const admin = {
            username : this.state.username,
            password : this.state.password
        };

        console.log(admin);

        axios.post('http://localhost:5000/admins/update/'+this.props.user.username+'/'+this.props.user.password,admin)
            .then(res => {
                alert(res.data);
            })
            .catch(()=>alert("Erreur de modification !"));

            this.setState({
                username : '',
                password :''
            });
        //window.location = '/';
    }

    render() { 
        return ( 
            <div className="container">
                <MDBContainer>
                    <MDBRow center={true}>
                      <MDBCol md="8">
                        <h2>Editer vos informations personnelles</h2>
                        <br/>
                        <form onSubmit={this.onSubmit}>
                          <div className="grey-text">
                            <div className="form-group">
                            <label>Nouveau nom d'utilisateur : </label>
                            <input
                              className="form-control"
                              value={this.state.username}
                              onChange={this.onChangeUsername}
                            />
                            </div>
                            <div className="form-group">
                            <label>Nouveau mot de passe : </label>
                            <input
                              type="password"
                              className="form-control"
                              value={this.state.password}
                              onChange={this.onChangePassword}
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
 
export default EditUser;