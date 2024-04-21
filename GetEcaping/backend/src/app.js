const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn");
const Register = require("./models/register");
const ContactUS = require("./models/contactus");
const {json} = require("express");
const {log} = require("console");

const port = 80;

const static_path = path.join(__dirname, "../public" );
const templates_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res)=> {
    res.render("index");
});

app.get("/register.hbs", (req, res) =>{
    res.render("register");
});

// create a new user in our database
app.post("/register", async (req, res) =>{
   try {
       
        const Password = req.body.Password;
        const ConfirmPassword = req.body.ConfirmPassword;

        if(Password === ConfirmPassword){

            const registerUser = new Register({
                Firstname : req.body.Firstname,
                Middlename : req.body.Middlename,
                Lastname : req.body.Lastname,
                Gender : req.body.Gender,
                Phone : req.body.Phone,
                Address : req.body.Address,
                Email : req.body.Email,
                Password : Password,
                ConfirmPassword : ConfirmPassword

            });



        const registered = await  registerUser.save();
        res.status(201).render("index");

        }else{
            res.send("passwords are not matching");
        }

    } catch (error){
       res.status(400).send(error);
    }
});

app.get("/login", (req, res) =>{
    res.render("login");
});

// login check 

app.post("/login", async(req, res) =>{
    try {
        const Email = req.body.Email;
        const Password = req.body.Password;

        const useremail = await Register.findOne({Email:Email});

        const isMatch = await bcrypt.compare(Password, useremail.Password);
       
        if (isMatch){
            res.status(201).render("index");
        }else{
            res.send("Invalid login details");
        }

    } catch (error) {
        res.status(400).send("Invalid login Details");
        
    }
});

app.get("/agra.hbs", (req, res) =>{
    res.render("agra");
});

app.get("/agrablog.hbs", (req, res) =>{
    res.render("agrablog");
});

app.get("/agraphoto.hbs", (req, res) =>{
    res.render("agraphoto");
});

app.get("/ahmedabad.hbs", (req, res) =>{
    res.render("ahmedabad");
});

app.get("/ahmedabadphoto.hbs", (req, res) =>{
    res.render("ahmedabadphoto");
});

app.get("/ajanta_and_ellora_caves.hbs", (req, res) =>{
    res.render("ajanta_and_ellora_caves");
});

app.get("/ajanta_and_ellora_caves_photo.hbs", (req, res) =>{
    res.render("ajanta_and_ellora_caves_photo");
});

app.get("/amritsar.hbs", (req, res) =>{
    res.render("amritsar");
});

app.get("/amritsarphoto.hbs", (req, res) =>{
    res.render("amritsarphoto");
});

app.get("/basicplan.hbs", (req, res) =>{
    res.render("basicplan");
});

app.get("/darjeeling.hbs", (req, res) =>{
    res.render("darjeeling");
});

app.get("/darjeelingblog.hbs", (req, res) =>{
    res.render("darjeelingblog");
});

app.get("/darjeelingphoto.hbs", (req, res) =>{
    res.render("darjeelingphoto");
});

app.get("/goa.hbs", (req, res) =>{
    res.render("goa");
});

app.get("/goaphoto.hbs", (req, res) =>{
    res.render("goaphoto");
});

app.get("/kerala.hbs", (req, res) =>{
    res.render("kerala");
});

app.get("/keralaphoto.hbs", (req, res) =>{
    res.render("keralaphoto");
});

app.get("/kolkata.hbs", (req, res) =>{
    res.render("kolkata");
});

app.get("/kolkataphoto.hbs", (req, res) =>{
    res.render("kolkataphoto");
});

app.get("/mumbai.hbs", (req, res) =>{
    res.render("mumbai");
});

app.get("/contactus", (req, res) =>{
    res.render("contactus");
});

// create a new user in our database
app.post("/contactus", async (req, res) =>{
    try {
        
             const contactedUser = new ContactUS({
                 Name : req.body.Name,
                 Email : req.body.Email,
                 PhoneNumber : req.body.PhoneNumber,
                 Subject : req.body.Subject,
                 Message : req.body.Message,
             });
         const contacted = await  contactedUser.save();
         res.status(201).render("index");
 
     } catch (error){
        res.status(400).send(error);
     }
 });

app.get("/mumbaiblog.hbs", (req, res) =>{
    res.render("mumbaiblog");
});

app.get("/mumbaiphoto.hbs", (req, res) =>{
    res.render("mumbaiphoto");
});

app.get("/mysore.hbs", (req, res) =>{
    res.render("mysore");
});

app.get("/mysorephoto.hbs", (req, res) =>{
    res.render("mysorephoto");
});

app.get("/new_delhi.hbs", (req, res) =>{
    res.render("new_delhi");
});

app.get("/newdelhiphoto.hbs", (req, res) =>{
    res.render("newdelhiphoto");
});

app.get("/packages.hbs", (req, res) =>{
    res.render("packages");
});

app.get("/premiumplan.hbs", (req, res) =>{
    res.render("premiumplan");
});

app.get("/rajasthan.hbs", (req, res) =>{
    res.render("rajasthan");
});

app.get("/rajasthanphoto.hbs", (req, res) =>{
    res.render("rajasthanphoto");
});

app.get("/shimla.hbs", (req, res) =>{
    res.render("shimla");
});

app.get("/shimlaphoto.hbs", (req, res) =>{
    res.render("shimlaphoto");
});

app.get("/standardplan.hbs", (req, res) =>{
    res.render("standardplan");
});

app.get("/varanasi.hbs", (req, res) =>{
    res.render("varanasi");
});

app.get("/varanasiphoto.hbs", (req, res) =>{
    res.render("varanasiphoto");
});





// START THE SERVER
app.listen(port, ()=>{
    console.log(`Server is running at port no ${port}`);
});