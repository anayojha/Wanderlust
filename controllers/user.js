const User = require("../models/user.js")

module.exports.signup = async(req,res)=>{
    try{
      let {username,email,password} = req.body
      const newUser = new User({username,email})
      const registeredUser = await User.register(newUser,password)
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err)
        }
       req.flash("success","Welcome To Wanderlust")
       res.redirect("/listings")
      })
    } 
    catch(e){
        req.flash("error","User with Given Username Already Exist")
        res.redirect("/signup")
    }
    
}

module.exports.login = (req,res)=>{
  req.flash("success", "Welcome Back To Wanderlust!")
  res.redirect(res.locals.redirectUrl || "/listings")
}

module.exports.renderSignupForm = (req,res)=>{
  res.render("users/signup.ejs")
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.logout = (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err)
    }
    req.flash("success","You Are Logged Out")
    res.redirect("/listings")
  })
}

