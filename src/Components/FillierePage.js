import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { MDBCard,MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText} from 'mdbreact';

const Filiere = props =>(
    
        <div style={{float: "left" ,margin:"20px"}} className="App">
        <MDBCard style={{width:"300px",height:"500px"}}>
        <MDBCardImage  top src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" waves />
        <MDBCardBody>
      <MDBCardTitle className="card-title">{props.filiere.nom}</MDBCardTitle>
        <div style={{color:"teal"}}>Matières : </div>
      {
          <div><MDBCardText style={{textAlign:"center"}}>{props.sub.filter(subject=>props.filiere.subjects.includes(subject._id)).map(subject=><div>{subject.name}<br/></div>)}</MDBCardText></div>
      }        
      </MDBCardBody>
      <Link to={"/updatefiliere/"+props.filiere._id}><button type="button" style={{marginRight:"30px",marginBottom:"20px",width:"80px",borderRadius:"40px"}} className="btn btn-primary btn-sm float-right btn-mr-4 btn-mb-4"><i className="far fa-edit"></i></button></Link>
        </MDBCard>
      </div>
  )

export class FillierePage extends Component {

    constructor(props) {
        super(props);      
        this.state = {
          filieres : [],
          subjects : []
        };
      }

      componentDidMount(){
        axios.get('http://localhost:5000/subjects/')
          .then(res=>{
            this.setState({
              subjects : res.data
            });
          })
          .catch((err)=>{console.log(err)});
    
        axios.get('http://localhost:5000/filieres/')
          .then(res=>{
            this.setState({
              filieres : res.data
            });
            console.log(this.state.filieres);
          })
          .catch((err)=>{console.log(err)});
      }

      filiereList(){
        return this.state.filieres.map(currentFiliere =>{
          return <Filiere filiere={currentFiliere} key={currentFiliere._id} sub={this.state.subjects}/>
        })
      }
    

    render() {
        return (
            <div className="container">
              <br></br>
          {this.filiereList()}
      </div>
        )
    }
}

export default FillierePage;
