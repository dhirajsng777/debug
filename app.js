var express = require("express");
var app = express();
var debug = require('debug');
//Creating Router() object
var router = express.Router();

debugError = debug('error');
// Tell express to use this router with /api before.
// You can put just '/' if you don't want any sub path before routes.
app.use("/api",router);

// Router middleware, mentioned it before defining routes.
router.use(function(req,res,next) {
  console.log("/" + req.method);
  next();
});

router.use("/user/:id",function(req,res,next){
  console.log(req.params.id)
  debugError('error happened');
  if(req.params.id == 0) {
    res.json({"message" : "You must pass ID other than 0"});    
  }
  else next();
});


// Provide all routes here, this is for Home page.
router.get("/",function(req,res){
  res.json({"message" : "Hello World"});
});

router.get("/user",function(req,res){
  res.json(req.query);
});
router.get("/user/:id",function(req,res){
  res.json({"message" : "Hello "+req.params.id});
 // res.json(req.query);
});


// Handle 404 error.
// The last middleware.
app.use("*",function(req,res){
  res.status(404).send('Nothing Found Dude');
});


// Listen to this Port
app.listen(3000,function(){
  console.log("Live at Port 3000");
});