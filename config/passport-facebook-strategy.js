const passport=require('passport');
const fb_strategy=require('passport-facebook').Strategy;

passport.use(new fb_strategy({
    clientID:'1197199350612970',
    clientSecret:'5a99db68f09eb9b60682e6ba15704a51',
    callbackURL:'http://localhost:8000/users/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('Error in facebook Strategy : ',err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null,user)
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString("hex")
            },function(err,user){
                if(err){
                    console.log('Error in facebook Strategy : ',err);
                    return;
                }

                return done(null,user);
            })
        }
    })
}))