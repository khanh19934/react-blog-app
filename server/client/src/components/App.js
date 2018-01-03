import React from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import * as actions from '../actions';
import HomePage from './Homepage';
import Header from './Header';
import SignUp from './Signup';
import Dashboard from './Dashboard';
import Blog from './Blog';
import BlogPostDetail from './BlogPostDetail';
import Image from './Image';
import EditBlog from './EditBlog';
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => (
    <Route
      {...rest}
      render={ props => (
        isAuthenticated
        ?  (
           <Component {...props} />
        )
        : (<Redirect to={{ pathname: '/', state: { from: props.location} }} />)
      )}
    />
    );



class App extends React.Component{
    checkAuthenticate(){
       if(this.props.auth){
           return true;
       }else{
           return false;
       }
    }
    async componentDidMount(){
       await this.props.fetchUser();
    }
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                    <Route path="/" component={HomePage} exact={true} />
                    <Route path="/signup" component={SignUp} exact={true}/>
                    <Route path="/blog" component={Blog} exact={true} perPage={10}/>
                    <Route path="/blog/:id" component={BlogPostDetail} exact/>
                    <Route path="/img" component={Image}/>
                    <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={this.checkAuthenticate} />
                    <PrivateRoute path="/blog/edit/:id" component={EditBlog} isAuthenticated={this.checkAuthenticate} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
};


const mapStateToProps = (state) => ({
    auth:state.auth
});
export default connect(mapStateToProps,actions)(App);

