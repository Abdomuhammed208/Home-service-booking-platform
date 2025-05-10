import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { log } from "console";

const app = express();
const port = 3000;
const saltRounds = 10;



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5000000 }, 
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
});

app.use(
  session({
    secret: "GOFIXIT",
    resave: true,
    saveUninitialized: true,
    cookie: { 
      secure: false, 
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 
    }
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:3001", 
  credentials: true, 
}));
app.use(express.json());

app.use('/uploads', express.static('public/uploads'));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "abdo2085",
  port: 5432,
});
db.connect();
app.get("/", (req, res) => {
  res.json({message: "Frontend is connected to backend!!!"});
});

app.get("/user", async function (req, res) {
  const result = await db.query("SELECT * FROM posts");
  const posts = result.rows;
  if (posts && posts.length > 0) {
    res.json({ success: true, posts:posts });
  } else {
    res.json({ Message: "There is no posts" });
  }
});


app.get("/tasker", async function (req, res) {
  const result = await db.query("SELECT * FROM posts");
  const posts = result.rows;
  if (posts && posts.length > 0) {
    res.json({ posts });
  } else {
    res.json({ posts: [], message: "No posts found" });
  }
});

app.post("/transfer",async function (req, res) {
  const amount = parseFloat(req.body.amount);
  const userId = req.user.email;
  const userTransaction  = await db.query("SELECT name, money FROM users WHERE email = $1",
     [userId]);
  const userAmount = userTransaction.rows[0];

  const totalAmount = parseFloat(userAmount.money) - parseFloat(amount) || userAmount.money;

  const userResult = await db.query("UPDATE users SET money = $1 WHERE email = $2",
     [totalAmount, userId]);
  
// <-------------------------------Incompeleted-------------------------------->

});


// <-------------------------------TOP UP-------------------------------->
app.post("/top-up", async function (req, res) {
  try {
      const submittedMoney = parseInt(req.body.amount);
    
      const userResult = await db.query("SELECT money FROM users WHERE email = $1",
        [req.user.email]);
  
      const currentBalance = userResult.rows[0];
      const money = parseInt(currentBalance.money) + parseInt(submittedMoney) || 0;
  
      const topUpResult = await db.query("UPDATE users SET money = $1 WHERE email = $2",
        [money, req.user.email]
      )
      
      res.json({message: "Your balance has been updated successfully"})


  } catch (err) {
    console.log(err)
  }
});

app.post("/top-up-tasker", async function (req, res) {
  try {
    const submittedMoney = parseInt(req.body.amount);    
    const result = await db.query("SELECT money FROM taskers WHERE email = $1",
      [req.user.email]);
    const currentBalance = result.rows[0];
    const money = parseInt(currentBalance.money) + parseInt(submittedMoney);
    const topUpResult = await db.query("UPDATE taskers SET money = $1 WHERE email = $2",
      [money, req.user.email]
    )
  } catch (err) {
    console.log(err)
  }
});


// <-------------------------------SHARE POST-------------------------------->
// app.get("/post/:postId", async function (req, res) {
//   try {
//     const postId = req.params.id;

//     const result = await db.query("SELECT p.id, p.content, t.name AS tasker_name, t.id AS tasker_id FROM posts p JOIN taskers t ON p.tasker_name = t.name WHERE p.id = $1",
//        [postId]);
//     const posts = result.rows[0]; 
//       console.log(postId);
//       res.render("post-page.ejs", { posts: posts });

//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Internal Server Error');
//   }
// });




app.post("/post", async function (req, res) {
  if (!req.user || !req.user.id) {
    return res.status(400).send("User is not logged in.");
  }
  const submittedTitle = req.body.title;
  const submittedPost = req.body.post;
  const submittedPrice = req.body.price;
  const taskerId = req.user.id;
  const taskerName = req.user.name;
  console.log(req.body);
  console.log("This is the price: " + submittedPrice);
  try {
    const result = await db.query("INSERT INTO posts (content, tasker_id, tasker_name, title, price) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [submittedPost, taskerId, taskerName, submittedTitle, submittedPrice]);
    const post = result.rows[0];
  } catch (err) {
    console.log(err)
  }

});

// <-------------------------------VISIT PROFILE-------------------------------->
app.get("/tasker/:postId", async (req, res) => {
  try {
    const id = req.params.postId;
    const postResult = await db.query("SELECT tasker_id FROM posts WHERE tasker_id = $1", [id]);
    const taskerId = postResult.rows[0].tasker_id;
    const taskerResult = await db.query("SELECT * FROM taskers WHERE id = $1", [taskerId]);
    const taskers = taskerResult.rows[0];
    res.json({ taskers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// <---------------------------BOOK SERVICE------------------------------------>

app.post("/book-service", async function (req, res) {
  const date = req.body.date + " " + req.body.time;
  const paymentMethod = req.body.paymentMethod;
  const cardNumber = req.body.cardNumber;
  const cardName = req.body.cardName;
  const expiryDate = req.body.expiryDate;
  const cvv = req.body.cvv;
  const amount = req.body.amount || 0;
  console.log("Booking details: ", req.body);
  if(paymentMethod === "cash"){
    const paymentstatus = "Unpaied";
    await db.query("INSERT INTO bookings (date, payment_status, amount, method) VALUES ($1, $2, $3, $4) RETURNING *",
      [date, paymentstatus, amount, paymentMethod]);
  } else if(paymentMethod === "card"){
    const paymentstatus = "successful";
   await db.query("INSERT INTO bookings (date, payment_status, amount, method) VALUES ($1, $2, $3, $4) RETURNING *",
      [date, paymentstatus, amount, paymentMethod]);
      await db.query("INSERT INTO payments (status, cardnum, cardname, expirydate, cvv, amount, method) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [paymentstatus, cardNumber, cardName, expiryDate, cvv, amount, paymentMethod]);
  }else if(paymentMethod === "wallet"){
    const paymentstatus = "successful";
    await db.query("INSERT INTO bookings (date, payment_status, amount, method) VALUES ($1, $2, $3, $4) RETURNING *",
      [date, paymentstatus, amount, paymentMethod]);
      await db.query("INSERT INTO payments (status, amount, method) VALUES ($1, $2, $3) RETURNING *",
        [ paymentstatus,amount, paymentMethod]);
  }else{
    res.json({ ok: false, message: "Invalid payment method" });
  }
  res.json({ ok: true, message: "Booking submitted successfully" });
});







// <--------------------------------------------------------------->

app.get("/post/:id/edit", async function (req,res) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const id = req.params.id;
    const taskerId = req.user.id;
    
    const result = await db.query(
        "SELECT * FROM posts WHERE id = $1 AND tasker_id = $2", 
        [id, taskerId]
    );
    
    if (result.rows.length === 0) {
        return res.status(403).json({ error: "Not authorized to edit this post" });
    }
    
    const post = result.rows[0];
    res.json({post});
});

app.post("/post/:id/edit", async function (req, res) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const id = req.params.id;
    const submittedPost = req.body.post;
    const taskerId = req.user.id;

    const checkResult = await db.query(
        "SELECT * FROM posts WHERE id = $1 AND tasker_id = $2",
        [id, taskerId]
    );
    
    if (checkResult.rows.length === 0) {
        return res.status(403).json({ error: "Not authorized to edit this post" });
    }
    
    if (submittedPost) {
        await db.query(
            "UPDATE posts SET content = $1 WHERE id = $2 AND tasker_id = $3",
            [submittedPost, id, taskerId]
        );
    }
    });



app.post("/post/:id/delete", async function (req, res) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    const id = req.params.id;
    const taskerId = req.user.id;
        const checkResult = await db.query(
        "SELECT * FROM posts WHERE id = $1 AND tasker_id = $2",
        [id, taskerId]
    );
    
    if (checkResult.rows.length === 0) {
        return res.status(403).json({ error: "Not authorized to delete this post" });
    }
    
    await db.query(
        "DELETE FROM posts WHERE id = $1 AND tasker_id = $2",
        [id, taskerId]
    );
  });





app.post("/delete-account", async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      await db.query("DELETE FROM users WHERE email = $1", [req.user.email]);
      await db.query("DELETE FROM taskers WHERE email = $1", [req.user.email]);

      req.logout(() => {
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
          }
          res.clearCookie("connect.sid");
          return res.json({ success: true, message: "Account deleted successfully" });
        });
      });
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.get("/tasker-profile", async function (req, res) {
  if (req.isAuthenticated()) {    
    const result = await db.query("SELECT * FROM taskers WHERE email = $1",
      [req.user.email]);
    const tasker = result.rows[0];
      res.json({ success: true, tasker });
  } else {
    res.json({ success:false, message: "Not authenticated" });
  }

});



app.post("/tasker-submit", async function (req, res) {
  const submittedName = req.body.name;
  const submittedMobileNum = req.body.mobile;
  const submittedEmail = req.body.email;
  const submittedCity = req.body.city;
  const submittedService = req.body.service;
  console.log(req.body);
  try {
    const result = await db.query("SELECT * FROM taskers WHERE email = $1",
      [req.user.email]);

    const currentData = result.rows[0];

    const nameToUpdate = submittedName || currentData.name;
    const mobileToUpdate = submittedMobileNum || currentData.mobile;
    const emailToUpdate = submittedEmail || currentData.email;
    const cityToUpdate = submittedCity || currentData.city;
    const serviceToUpdate = submittedService || currentData.service;
    console.log("This is the service to be updated: " + serviceToUpdate);

    const updatingResult = await db.query("UPDATE taskers SET name = $1, mobile = $2, email = $3, city = $4, service=$5 WHERE email = $6",
      [nameToUpdate, mobileToUpdate, emailToUpdate, cityToUpdate, serviceToUpdate, req.user.email]
    );
    req.user.email = emailToUpdate;
  } catch (err) {
    console.log(err)
  }

})


app.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }

    req.session.destroy(); 
    res.clearCookie("connect.sid"); 

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  });
});

app.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit.ejs")
  } else {
    res.redirect("/login")
  }
})
app.get("/admin", async function (req, res) {
  if (req.isAuthenticated()) {
    const isAdmin = req.user.role === "admin";
    if (isAdmin) {
      const taskerResult = await db.query("SELECT * FROM taskers");
      const taskers = taskerResult.rows;
      res.render("admin.ejs", { taskers: taskers });
    } else {
      res.redirect("/login-admin");
    }
  } else {
    res.redirect("/login-admin");
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Auth error:", err);
      return res.status(500).json({ success: false, message: "An error occurred during authentication" });
    }
    if (!user) {
      console.log("Authentication failed:", info?.message);
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login session error:", err);
        return res.status(500).json({ success: false, message: "Login failed" });
      }

      const { id, name, email, mobile, money, city } = user;
      const role = req.user.role;
      
      console.log("Login successful: ", name, email, mobile, money, city, role);

      return res.status(200).json({
        success: true,
        loginMessage: "Login successful, Hello !",
        user: { name, email, mobile, money, city, role },
      });
    });
  })(req, res, next);
}); 

app.get("/profile", async function (req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const result = await db.query(
      "SELECT id, name, email, mobile, money, profile_image FROM users WHERE email = $1",
      [req.user.email]
    );
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/upload-profile-image", upload.single('profile_image'), async function (req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    
    await db.query(
      "UPDATE users SET profile_image = $1 WHERE email = $2",
      [imagePath, req.user.email]
    );

    res.json({ 
      success: true, 
      message: "Profile image updated successfully",
      image_url: imagePath 
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

app.post("/tasker-signup", upload.single('profile_image'), async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const mobile = req.body.mobile;
    const service = req.body.service;
    const gender = req.body.gender;
    const city = req.body.city;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const checkResult = await db.query("SELECT * FROM taskers WHERE email = $1", [email]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    
    const result = await db.query(
      "INSERT INTO taskers (email, password, name, mobile, profile_image, money, service, gender, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [email, hash, name, mobile, imagePath, 0, service, gender, city]
    );
    

    res.json({ success: true, message: "Tasker registered successfully" });
  } catch (error) {
    console.error("Error in tasker signup:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/signup", upload.single('profile_image'), async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if user already exists
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password and create user
    const hash = await bcrypt.hash(password, saltRounds);
    const result = await db.query(
      "INSERT INTO users (name, mobile, email, password, money, profile_image) VALUES ($1, $2, $3, $4, DEFAULT, $5) RETURNING *",
      [name, mobile, email, hash, imagePath]
    );

    const user = result.rows[0];
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error during registration" });
  }
});




app.post("/submit", async function (req, res) {
  const submittedName = req.body.name;
  const submittedMobileNum = req.body.mobile;
  const submittedEmail = req.body.email;
  try {

    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [req.user.email]);
    const currentUser = userResult.rows[0];

    const nameToUpdate = submittedName || currentUser.name;
    const mobileToUpdate = submittedMobileNum || currentUser.mobile;
    const emailToUpdate = submittedEmail || currentUser.email;

    await db.query(
      "UPDATE users SET name = $1, mobile = $2, email = $3 WHERE email = $4",
      [nameToUpdate, mobileToUpdate, emailToUpdate, req.user.email]
    );
    req.user.email = emailToUpdate;

    res.json({ ok: true, message: "All data have beebn changed" });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while updating the user data.");
  }
});

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      let result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      let role = "user";

      if (result.rows.length === 0) {
        result = await db.query("SELECT * FROM taskers WHERE email = $1", [email]);
        role = "tasker";
      }
      if (result.rows.length === 0) {
        result = await db.query("SELECT * FROM admin WHERE email = $1", [email]);
        role = "admin";
      }

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;

        const valid = await bcrypt.compare(password, storedHashedPassword);

        if (valid) {
          user.role = role;
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      } else {
        console.log("Step 6: no user found in both tables");
        return done(null, false, { message: "No account found with that email" });
      }
    } catch (err) {
      console.error("Step 7: error in strategy", err);
      return done(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, { 
    id: user.id, 
    email: user.email,
    role: user.role 
  });
});

passport.deserializeUser(async (user, done) => {
  try {
    let result;
    if (user.role === 'user') {
      result = await db.query("SELECT * FROM users WHERE id = $1", [user.id]);
    } else if (user.role === 'tasker') {
      result = await db.query("SELECT * FROM taskers WHERE id = $1", [user.id]);
    }
    
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(new Error("User not found"));
    }
  } catch (err) {
    done(err);
  }
});

// Add tasker profile image upload route
app.post("/upload-tasker-image", upload.single('profile_image'), async function (req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    
    await db.query(
      "UPDATE taskers SET profile_image = $1 WHERE email = $2",
      [imagePath, req.user.email]
    );

    res.json({ 
      success: true, 
      message: "Profile image updated successfully",
      image_url: imagePath 
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});