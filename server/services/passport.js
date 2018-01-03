const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStategy = require('passport-local').Strategy;
const keys = require('../config/keys');
const User = require('../model/User');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(async (id,done) => {
    const user = await User.findById(id);
    if(user){
        done(null,user);
    }
});

//Passport Google login
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:"/auth/google/callback",
    proxy:true
},async (accessToken,refreshToken,profile,done) => {
    const searchExist = await User.findOne({'google.id':profile.id});
    if(!searchExist){
        let newUser = new User();
        newUser.google.id = profile.id;
        newUser.google.name = profile.displayName;
        newUser.google.email = profile.emails[0].value;
        const user = await newUser.save();
        if(user){
            return done(null,user);
        }
    }
})
);

//Passport Facebook Login

passport.use(new FacebookStrategy({
    clientID:keys.facebookClientID,
    clientSecret:keys.facebookClientSecret,
    callbackURL:"/auth/facebook/callback",
    profileFields:['id','emails','name'],
    proxy:true
},async (accessToken,refreshToken,profile,done) => {
    const searchExist = await User.findOne({'facebook.id':profile.id});
    if(!searchExist){
        let newUser = new User();
        newUser.facebook.id = profile.id;
        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.facebook.email = profile.emails[0].value;
        const user = await newUser.save();
        if(user){
            return done(null,user);
        }
    }
    
}))

//Passport Local sign up 

passport.use('local-signup',new LocalStategy(
    { 
        usernameField:'email',
        passwordField:'password'
    } , (email,password,done) => {
        process.nextTick(async () => {
            try{
                const checkUser = await User.findOne({'local.email':email});
            if(!checkUser){
                const newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                const user = newUser.save();
                if(user){
                    return done(null,user);
                }
            }
            }catch(e){
                return done(e);
            }
            
        });
    }
));

//passport local login
passport.use('local-login',new LocalStategy({
    usernameField:"email",
    passwordField:"password"
}, async (email,password,done) => {
    try{
        const user = await User.findOne({'local.email':email});
        if(user.validPassword(password)){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }catch(e){
        return done(null,false);
    }
}))
