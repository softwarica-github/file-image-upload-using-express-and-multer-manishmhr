const express = require('express');
const connection = require('express')
const app = express();
const path = require('path');
const multer = require('multer');
const ejs = require('ejs');

app.use(connection.static(path.join(__dirname,'resources')))
app.set('views',__dirname+'/views')
app.set('view engine','ejs');

//defining storage
  const storage = multer.diskStorage({


//defining destination
destination:'./resources/uploads/' ,
      //location of image upload



filename: function(req, file, cb)
{
	cb(null,file.originalname + '-' + Date.now() +
		path.extname(file.originalname)); 
}

  });

  const uploadImage = multer({
  	storage: storage,
  	limits:{fileSize: 400000},
  	fileFilter: function(req,file,cb){
  		checkFileType(file,cb);
  	}

      //initial-upload

  }).single('image');



  function checkFileType(file,cb){
  	const filetypes = /png|jpg|jpeg|gif/;
  	const extname = filetypes.test(path.extname(file.originalname)
  		.toLowerCase());
  	const mimetype = filetypes.test(file.mimetype);
  	  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
  }
app.get('/',(req,res)=>{


res.render("index");

});


  //validation
app.post('/imageupload',(req,res)=>
{
	uploadImage(req, res, (err) =>{
if(err) {
    res.render('index', {
        msg: err
    });
}else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }


	});
});

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log('Server Is Running'));