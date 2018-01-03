const passport = require('passport');
module.exports = (app) => {
    app.get('/auth/google/callback',passport.authenticate('google',{ failureRedirect: '/' }), (req,res) => {
        res.redirect('/dashboard');
    });
    
    app.get('/auth/google', passport.authenticate('google', 
        { 
            scope : ['profile', 'email'] 
        }
    ));

   

    app.get('/auth/facebook',passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',passport.authenticate('facebook'),(req,res) => {
        res.redirect('/');
    });

    app.get('/api/current_user',(req,res) => {
        res.send(req.user);
    });
    app.get('/api/logout',(req,res) => {
        req.logout();
        req.session.destroy(function(err) {
            res.clearCookie('connect.sid',{path:'/'});
        });
        res.redirect('/');
    });
    app.post('/user/signup',passport.authenticate('local-signup',{
        successRedirect :'/',
        failureRedirect :'/signup',
        session: false
    }));
    app.post('/user/login',passport.authenticate('local-login',{
        successRedirect: '/',
        failureRedirect:'/signup'
    }));
};