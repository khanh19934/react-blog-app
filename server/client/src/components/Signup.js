import React from 'react';

export default class SignUp extends React.Component {
    render(){
        return (
            <div className="container">
                <div className="row">
                    <h1 className="text-center">Sign up</h1>
                    <div className="col-xs-offset-4 col-xs-4">
                        <form action="/user/signup" method="post">
                            <div className="form-group">
                                <label htmlFor="Email">Email:</label>
                                <input type="text" name="email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" className="form-control" name="password"/>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};
