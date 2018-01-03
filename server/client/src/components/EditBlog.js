import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Redirect} from 'react-router-dom';
class EditBlog extends React.Component {
    constructor(){
        super();
        this.handleEdit = this.handleEdit.bind(this);
        this.state={
            isUpdated:false
        }
        this.successRedirect = this.successRedirect.bind(this);
    }
   async handleEdit(e){
        e.preventDefault();
        const submitedValue = {
            title:e.target.title.value,
            content:e.target.content.value
        }
       const updated = await this.props.updateBlog(this.props.match.params.id,submitedValue);
       if(updated){
           this.setState({isUpdated:true});
       }

    }
    successRedirect(){
        return (
            <Redirect to={`/blog/${this.props.match.params.id}`}/>
        )
    }
    render(){
        return (
            <div className="container">
                <h1 className="text-center">Edit Blog Post</h1>
                <br/>
                {this.state.isUpdated &&
                (
                    <div className="alert alert-success">
                        <strong>Success!</strong> Update Successful !
                        {this.successRedirect()}
                    </div>
                    
                )}
                <br/>
                <div className="col-xs-offset-2 col-xs-8">
                    <form onSubmit={this.handleEdit}>
                        <div className="form-group">
                            <label htmlFor="Title">Title:</label>
                            <input type="text" name="title" className="form-control" ref={ref=>{this.title = ref}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Content">Content:</label>
                            <textarea name="content" className="form-control" ref={ref=>{this.content = ref}}></textarea>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary">Submit</button>   
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default connect(null,actions)(EditBlog);
