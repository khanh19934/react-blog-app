import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link,Redirect,withRouter} from 'react-router-dom';
import Comment from './Comment';
class BLogPostDetail extends React.Component{
    constructor(){
        super();
        this.state = {
            blogPostDetails:{
                title:"",
                content:"",
                likes:null,
                author:{
                    local:{
                        email:""
                    },
                    google:{
                        email:"",
                        name:""
                    },
                    facebook:{
                        email:"",
                        name:""
                    }
                }
            },
            currentUser:null,
            isAuthor:false,
            isDeleted:false,
            liked:false
        }
        this.checkAuthor = this.checkAuthor.bind(this);
        this.onHandleDeleteBlog = this.onHandleDeleteBlog.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleLikeBlog = this.handleLikeBlog.bind(this);
        this.handleUnLikeBlog = this.handleUnLikeBlog.bind(this);
    }

    componentWillMount(){
            this.props.getBlogDetail(this.props.match.params.id).then((res)=>{
                if(res){
                    this.setState({blogPostDetails:{...this.state.blogPostDetails,...res.payload}
                        });
                        this.props.fetchUser().then(user => {
                            if(user){
                                this.setState({currentUser:this.props.auth._id});
                                if(this.state.blogPostDetails.author._id === this.state.currentUser.toString()){
                                    this.setState({isAuthor:true})
                                }
                            }
                        })
                        
                }
            });
    }
    
    checkAuthor(){
        if(this.state.blogPostDetails.author.hasOwnProperty('local')){
            return this.state.blogPostDetails.author.local.email;
        }else if(this.state.blogPostDetails.author.hasOwnProperty('google')){
            return this.state.blogPostDetails.author.google.name;
        }else{
            return this.state.blogPostDetails.author.facebook.name;
        }

    }
    async onHandleDeleteBlog(){
        
       const deleted = await this.props.removeBlog(this.props.match.params.id);
       if(deleted){
           this.setState({isDeleted:true});
       }
    }

    handleSubmitComment(e){
        e.preventDefault();
        const content = e.target.content.value;
        this.props.addComment(this.props.match.params.id,content);
        this.content.value = "";
    }
    handleLikeBlog(){

        this.setState(state => ({
            blogPostDetails:{...this.state.blogPostDetails,likes:this.state.blogPostDetails.likes+1},
            liked:true
        }));
        this.props.likeBlogPost(this.props.match.params.id);
    }
    handleUnLikeBlog(){
        this.setState(state => ({
            blogPostDetails:{...this.state.blogPostDetails,likes:this.state.blogPostDetails.likes-1},
            liked:false
        }));
        this.props.unLikeBLogPost(this.props.match.params.id);
    }
    render(){
        
       if(this.props.auth === null|| this.props.auth._id === null ) return null;
       
        return (
            <div className="container">
                <h1 className="text-center">{this.state.blogPostDetails.title} - Written by {this.checkAuthor()}</h1>
                <p>{this.state.blogPostDetails.content}</p>
               {this.state.isAuthor && (
                   <div>
                       <Link to={`/blog/edit/${this.props.match.params.id}`} className="btn btn-primary">Edit</Link> 
                       <button className="btn btn-danger" onClick={this.onHandleDeleteBlog}>Delete</button>
                       {this.state.isDeleted && <Redirect to={'/blog'}/>}
                    </div>)}
                    <p>{this.state.blogPostDetails.likes > 0 ?  `${this.state.blogPostDetails.likes} like(s) this post` :false }</p>
                {this.props.auth && 
                    (
                        <div>
                            {this.state.liked === false ?
                                <button className="btn btn-primary" onClick={this.handleLikeBlog}>Like</button>
                                :
                                <button className="btn btn-primary" onClick={this.handleUnLikeBlog}>Unlike</button>
                                }
                            <form onSubmit={this.handleSubmitComment}>
                                <div className="form-group">
                                <label htmlFor="content">Comment:</label>
                                <input type="text" name="content" className="form-control" ref={ref=>this.content = ref}/>
                                <button type="submit" className="btn btn-primary" >Send</button>
                                </div>
                                
                            </form>
                        </div>
                    )}
                    <Comment idBlog={this.props.match.params.id}/>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
   return {
    blogDetail:state.blog,
    auth:state.auth
   }
};
export default withRouter(connect(mapStateToProps,actions)(BLogPostDetail));
