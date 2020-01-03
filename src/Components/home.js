import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import NavBar from "./NavBar.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentsPage from './StudentsPage';
import ProfPage from './ProfPage.js';
import FillierePage from './FillierePage.js';
import EditUser from './EditUserPage' ;
import CreateStudent from './CreateStudent.js';
import EditStudent from './EditStudent.js';
import CreateProf from './CreateProf';
import EditProf from './EditProf';
import EditFil from './EditFil';



class Home extends Component {
    state = {  }
    render() {  
        return ( 
        <Router>
         <NavBar logout={this.props.logout}></NavBar>
         <br></br>

         <Route path='/' exact component={StudentsPage}></Route>
         <Route path='/createstudent' component={CreateStudent}></Route>
         <Route path='/update/:id' component={EditStudent}></Route>

         <Route path='/prof' component={ProfPage}></Route>
         <Route path='/createprofessor' component={CreateProf}></Route>
         <Route path='/updateprof/:id' component={EditProf}></Route>

         <Route path='/filliere' component={FillierePage}></Route>
         <Route path='/updatefiliere/:id' component={EditFil}></Route>


         <Route path='/edituser' component={()=><EditUser user={this.props.user}/>}></Route>
        </Router>
         );
    }
}

export default Home;