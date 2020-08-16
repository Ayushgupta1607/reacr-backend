const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("cors");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
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
    email: String,
    password: String
});
 
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);


passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post("/register",function(req,res,next){

 User.register({username: req.body.email},req.body.password, function(err,user){
     if(err){
         console.log(err);
         res.redirect("/");
     }
     else{

        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', })(req, res);
        // passport.authenticate("local", function(err, user, info) {

        //     if (err) return next(err); 
        //     if (!user) return res.redirect('/'); 
        
        //     req.logIn(user, function(err) {
        //         if (err)  return next(err); 
        //         return res.redirect("/login");
                
                
        //     });
        
        // })(req, res, next);
     }
 });

});

// app.post("/login",function(req,res){
    // const email=req.body.email;
    // const password=req.body.password
    //     const user = new User({
    //         username:email,
    //         password:password
    //     });
    // console.log(user);
    //     req.login(user, function(err){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             passport.authenticate("local")(req,res,function(){
    //                 res.redirect("/");
    //             });
    //         }
    //     });
    // });



app.listen(5000,function(req,res){
    console.log("server is up and running");
})
















// //jshint esversion:6 
// const express=require("express");
// const bodyParser=require("body-parser");
// const mongoose=require("mongoose");
// const session=require("express-session");
// const passport=require("passport");
// const passportLocalMongoose=require("passport-local-mongoose")


// const app=express();
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(session({
//     secret: "our Little Secret.",
//     resave:false,
//     saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());
 

// mongoose.connect("mongodb+srv://ayush:ayush85720@cluster0.up2nh.mongodb.net/userDB",{ useNewUrlParser: true , useUnifiedTopology: true })
// // mongoose.connect("mongodb://localhost:27017/user1DB",{ useNewUrlParser: true , useUnifiedTopology: true })
// mongoose.set("useCreateIndex", true); 


// const userSchema= new mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     email: String,
//     password: String
// })

// userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model("User",userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



// app.get("/", function(req,res){
//     res.send("<h1>hello,world </h1>");
// });  


// app.post("/register",function(req,res){

// try {
//     User.register({
    
//         username:req.body.email},
//         req.body.password,
//         function(err, user){
//             if(err){
//                 console.log(err);
//                 res.redirect("/login");
//             }else{
//                 passport.authenticate("local")(req,res,function(err,user){
//                     res.redirect("/");
//                 });
//             }
//         }
//         );
// } catch (error) {
//     console.log(err);
// }

// // User.register({ 
    
// //     username:req.body.email},
// //     req.body.password,
// //     function(err, user){
// //         if(err){
// //             console.log(err);
// //             res.redirect("/login");
// //         }else{
// //             passport.authenticate("local")(req,res,function(){
// //                 res.redirect("/");
// //             });
// //         }
// //     }
// //     );
// });





// app.listen(5000,function(req,res){
//     console.log("server is up and running")
// })