import React from 'react';
import {Link} from 'react-router-dom';

export default class BlogItem extends React.Component{
    constructor(){
        super();
        this.checkAuthor = this.checkAuthor.bind(this);
    }
    checkAuthor(){
        if(this.props.details.author.hasOwnProperty('local')){
            return this.props.details.author.local.email;
        }else if(this.props.details.author.hasOwnProperty('google')){
            return this.props.details.author.google.name;
        }else{
            return this.props.details.author.facebook.name;
        }
    }
    render(){
        return (

            <div className="list-group-item">
                <h1 className="text-center">{this.props.details.title} - Written by {this.checkAuthor()}</h1>
                <p>{this.props.details.content}</p>
                <Link to={`/blog/${this.props.details._id}`} className="btn btn-primary">Read more</Link>
            </div>
        );
    }
}
