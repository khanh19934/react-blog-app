import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height                : '800' + 'px',
      width                 : '700' + 'px'
    }
  };

class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            modalIsOpen: false
          };
      
          this.openModal = this.openModal.bind(this);
          this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
      }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    renderNavbar(){
        switch(this.props.auth){
            case null:
            return;
            case false:
            return [
                <li key="1"><a href="#" onClick={this.openModal}>Login</a></li>,
                <li key="2"><NavLink to="/signup">Sign Up</NavLink></li>
            ];
            default:
            return [
                <li key="3"><a href="/api/logout">Logout</a></li>,
                <li key="4"><NavLink to="/dashboard">Dashboard</NavLink></li>
            ];
        }
    }
    render(){
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <NavLink className="navbar-brand" to="/">Brand</NavLink>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-left">
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/blog">Blog Post</NavLink></li>
                                <li><NavLink to="/">About Us</NavLink></li>
                                <li><NavLink to="/">Contact Us</NavLink></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                {this.renderNavbar()}
                            </ul>
                        </div>
                    </div>
                </nav>
                <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >

                <h1 className="text-center">Login</h1>
                <div className="row">
                    <h2 className="text-center">With Soccial Account</h2>
                    <br/>
                    <div className="col-xs-offset-3 col-xs-6">
                        <a href="/auth/google" className="btn btn-success btn-block">Login with Google+</a>
                        <a href="/auth/facebook" className="btn btn-primary btn-block">Login with Facebook</a>
                    </div>
                </div>
                <br/>
                <hr/>
                <div className="row">
                    <h2 className="text-center">With Email & Password</h2>
                    <br/>
                    <div className="col-xs-offset-3 col-xs-6">
                        <form action="/user/login" method="post">
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="text" name="email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control"/>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-info">Submit</button>
                                <h3>You dont have account? Sign up <Link to="/signup" onClick={this.closeModal}>here</Link></h3>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <br/>
                <div className="text-center">
                    <button className="btn btn-default" onClick={this.closeModal}>Close</button>
                </div>
            </Modal>
            </div>
           
        );
    }
};
const mapStateToProps = ({auth}) => ({
    auth
});
export default connect(mapStateToProps)(Header);
