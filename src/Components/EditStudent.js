import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';

class EditStudent extends Component {
    
    constructor(props){
        super(props);

        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeTel=this.onChangeTel.bind(this);
        this.onChangeNote=this.onChangeNote.bind(this);
        this.onChangeFiliere=this.onChangeFiliere.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            name: '',
            birthdate:new Date(),
            email:'',
            tel:'',
            note:'',
            filiere:'',
            filieres : [],
            fil :null
        }
    }

    componentDidMount(){
/*         axios.get('http://localhost:5000/filieres/')
        .then(res=>{
            if(res.data.length>0){
            this.setState({
                filieres:res.data.map(fil=>fil.nom),
                filiere:res.data[0]._id,
                fil : res.data
            }); }           
        }); */
        axios.get('http://localhost:5000/students/'+this.props.match.params.id)
            .then(res=>{
                this.setState({
                    name : res.data.name,
                    birthdate : Date.parse(res.data.birthdate),
                    email : res.data.email,
                    tel : res.data.tel,
                    note : res.data.note,
                })
                axios.get('http://localhost:5000/filieres/')
                .then(res2=>{
                    if(res2.data.length>0){
                    this.setState({
                        filieres:res2.data.map(fil=>fil.nom),
                        filiere:res2.data[0].nom,
                        fil : res2.data
                    })
            }})
            .catch(err=>{console.log(err)});

    })
}

    onChangeName(e){
        this.setState({
            name : e.target.value
        });
    }

    onChangeDate(birthdate){
        this.setState({
            birthdate : birthdate
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

    onChangeNote(e){
        this.setState({
            note : e.target.value
        });
    }

    onChangeFiliere(e){
        this.setState({
            filiere : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const student = {
            name : this.state.name,
            birthdate : this.state.birthdate,
            email : this.state.email,
            tel : this.state.tel,
            note : this.state.note,
            filiere : this.state.fil.filter(fil=>fil.nom===this.state.filiere).map(fil=>fil._id)
        };

        console.log(student);

        axios.post('http://localhost:5000/students/update/'+this.props.match.params.id,student)
            .then(res => {
                alert(res.data);
            })
            .catch(()=>alert("Erreur de modification !"));

            this.setState({
                name : '',
                email : '',
                tel : '',
                note :''
            });
        //window.location = '/';
    }

    render() { 
        return ( 
            <div className="container">
                <MDBContainer>
                    <MDBRow center={true}>
                      <MDBCol md="8">
                        <h2>Editer un etudiant</h2>
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
                            <div className="form-group">
                            <label>Note : </label>
                            <input
                            className="form-control"
                              onChange={this.onChangeNote}
                              value={this.state.note}
                            />
                            </div>
                            <div className="form-group">
                            <label>Filiere</label>
                            <select ref="userInput" className="form-control" value={this.state.filiere} onChange={this.onChangeFiliere}>
                                {
                                    this.state.filieres.map(function(filiere){
                                        return <option key={filiere} value={filiere}>
                                            {filiere}
                                        </option>
                                    })
                                }
                            </select>
                            </div>
                            <div className="form-group">
                            <label className="mr-5">Date de naissance : </label>
                            <DatePicker
                            className="form-control"
                            selected={this.state.birthdate}
                                onChange={this.onChangeDate}
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
 
export default EditStudent;