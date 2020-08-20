const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("cors");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/user1DB",{ useNewUrlParser: true , useUnifiedTopology: true })
mongoose.set("useCreateIndex", true); 



const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    password: String
});
 
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);


passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/api", function(req,res){
    if (req.isAuthenticated()) { 
       
        res.json({
            isVerified:true,
            Message:"authenticated"
        })
    }else{
        
        res.json({
            isVerified:false,
            Message:"no"
        });
    }
    // else{
    //     res.json({
    //         email:"ab",
    //         password:"qw"
    //     })
    // }
    }); 

app.post("/register",function(req,res,next){

 User.register({
     username: req.body.username,
     fName: req.body.fName,
     lName: req.body.lName
},
req.body.password, function(err,user){
     if(err){
         console.log(err);
         res.send(err);
     }
     else{

        // passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', })(req, res);
        passport.authenticate("local", function(err, user, info) {
        
            if (err) return next(err); 
            if (!user) return res.send("user not found");
        
            req.logIn(user, function(err) {
                if (err)  return next(err); 
                return res.json({
                                email:user.username,
                                password:user.password
                            })
                
                
            });
        
        })(req, res, next);
    }
});

});

app.post("/login",function(req,res){
    const email=req.body.username;
    const password=req.body.password;
    

        const user = new User({
            username:email,
            password:password
        });
    
        req.login(user, function(err){
            if(err){
                console.log(err);
            }
         
            else{
                
                passport.authenticate("local", function(err, user, info) {
        
                    if (err) return console.log(err); 
                    if (!user) return res.json({
                        isVerified:false,
                        Message:"User Not Found"
                    })
                    res.json({
                        isVerified:true,
                        Message:"logged in successfully"
                    });
                })(req,res);
            }
        });
    });



app.listen(5000,function(req,res){
    console.log("server is up and running");
})














