import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Redirect} from 'react-router-dom';
class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            isSubmitted:false,
            file:"",
            imagePreviewURL:"",
            isUploaded:false,
            currentUserInfoState:{
                avatar:""
            }
        }
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentWillMount(){
       
        const currentUserInfo = await this.props.getUserInfo();
        if(currentUserInfo){
            this.setState((state)=>({
                currentUserInfoState:{...this.state.currentUserInfoState,...currentUserInfo.payload}
            }));
        }
       
    }
   async hanndleCreateBlog(e){
        e.preventDefault();
         const title = e.target.elements.title.value;
         const content = e.target.elements.content.value;
         e.target.elements.title.value="";
         e.target.elements.content.value="";
        const saved = await this.props.createBlog(title,content); 
        if(saved){
            this.setState({isSubmitted:true});
        }
     }
     handleImageChange(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file:file,
                imagePreviewURL:reader.result,
            });
        }
        reader.readAsDataURL(file);
     }
    async handleSubmit(e){
       e.preventDefault();
        const userInfo = {
            name:e.target.username.value,
            password:e.target.password.value,
            phoneNumber:e.target.phoneNumber.value,
            address:e.target.address.value
        }
       const uploaded = await this.props.uploadImage(this.state.file,userInfo);
       if(uploaded){
           this.setState({isUploaded:true});
           this.fileInput.value = "";
       }
     }
    render(){
        return (
            <div className="container">
                <h1 className="text-center">Dashboard</h1>
                <br/>
                <br/>
                <div className="row">
                <div className="col-xs-4"> 

                    <ul className="nav nav-pills nav-stacked">
                        <li className="active"><a data-toggle="tab" href="#userInfo">User Information</a></li>
                        <li><a data-toggle="tab" href="#uploadAvatar">Update Information</a></li>
                        <li><a data-toggle="tab" href="#writeBlog">Create Blog</a></li>
                        <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>
                    </ul>
                    
                </div>
                <div className="col-xs-8 tab-content">
                <div id="userInfo" className="tab-pane fade in active">
                    <h3 className="text-center">User Infomation</h3>
                    <p><b>Avatar:</b> {this.state.currentUserInfoState ? <img src={`data:${this.state.currentUserInfoState.avatar.contentType};` +"base64," + this.state.currentUserInfoState.avatar.data} alt="avatar" width="400px" height="400px"/> : 'Please update your information'}</p>
                    <p><b>User Name:</b> {this.state.currentUserInfoState ? this.state.currentUserInfoState.userName : 'Please update your information'}</p>
                    <p><b>Address:</b> {this.state.currentUserInfoState ? this.state.currentUserInfoState.address : 'Please update your information'}</p>
                    <p><b>Phone Number:</b> {this.state.currentUserInfoState ? this.state.currentUserInfoState.phoneNumber : 'Please update your information'}</p>
                </div>
                <div id="uploadAvatar" className="tab-pane fade">
                    <h3 className="text-center">Update User Information</h3>
                    {   this.state.isUploaded && 
                       ( <div className="alert alert-success">
                            <strong>Success!</strong> Update Success
                        </div>)
                    }
                    <form  onSubmit={this.handleSubmit}  ref={(ref) => this.fileUpload = ref}>
                        <div className="form-group">
                            <label htmlFor="Text">Name:</label>
                            <input type="text" name="username" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Phone">Phone number:</label>
                            <input type="text" name="phoneNumber" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Address">Address:</label>
                            <input type="text" className="form-control" name="address"/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="file">Choose avatar</label>
                            <input type="file" name="myImg" className="form-control" onChange={this.handleImageChange} ref={ref=> this.fileInput = ref}/>
                        </div>
                       
                        <div className="text-center">
                        <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                        
                    </form>
                    {this.state.imagePreviewURL && <img src={this.state.imagePreviewURL} alt="preview"/>}
                </div>
                <div id="writeBlog" className="tab-pane fade">
                    <h3 className="text-center">Create Blog</h3>
                    <form onSubmit={this.hanndleCreateBlog.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" className="form-control" name="title"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Content">Content:</label>
                        <textarea className="form-control" name="content"/>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                    </form>
                    {this.state.isSubmitted && <Redirect to="/"/>}
                </div>
                <div id="menu2" className="tab-pane fade">
                    <h3>Menu 2</h3>
                    <p>Some content in menu 2.</p>
                </div>
                </div>

                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth:state.auth,
    blog:state.blog
});
export default connect(mapStateToProps,actions)(Dashboard);
