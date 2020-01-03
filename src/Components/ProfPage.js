import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Professor = props =>(
    <tr>
      <td>{props.professor.name}</td>
      <td>{props.professor.email}</td>
      <td>{props.professor.tel}</td>
      <td>
      <Link to={"/updateprof/"+props.professor._id}><i className="far fa-edit"></i></Link>  |  <a href="#" onClick={()=>{props.deleteProfessor(props.professor._id)}}><i className="far fa-trash-alt"></i></a></td>
    </tr>
  )


class ProfPage extends Component {

    constructor(props) {
        super(props);
    
        this.deleteProfessor = this.deleteProfessor.bind(this);  
      
        this.state = {
          professors : [],
        };
      }

      componentDidMount(){ 
        axios.get('http://localhost:5000/professors/')
          .then(res=>{
            this.setState({
              professors : res.data
            });
          })
          .catch((err)=>{console.log(err)});
      }


      deleteProfessor(id){
        axios.delete('http://localhost:5000/professors/'+id)
          .then(res=>console.log(res.data));
    
        this.setState({
          professors:this.state.professors.filter(i=>i._id !== id)
        });
      }

      professorsList(){
        return this.state.professors.map(currentProfessor =>{
          return <Professor professor={currentProfessor} deleteProfessor={this.deleteProfessor} key={currentProfessor._id}/>
        })
      }
    

    render() {
        return (
            <div className="container">
            <Link to="/createprofessor">
              <button style={{borderRadius:"30px"}} type="button" className="btn btn-success btn-sm float-right">
              <i className="fas fa-plus"></i>
              </button>
              </Link>
         
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.professorsList()}
        </tbody>
      </table>
      </div>
        )
    }
}

export default ProfPage;
