import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import cors from 'cors';

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(
  session({
    secret: "GOFIXIT",
    resave: true,
    saveUninitialized: true,
    cookie: { 
      secure: false, // true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
 //app.use(cors());
 app.use(cors({
  origin: "http://localhost:3001", // React frontend
  credentials: true,  // Important for cookies or session sharing
}));
app.use(express.json());

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
  if (posts ) {
    res.render("user.ejs", { posts: posts });
  } else {
    res.render("user.ejs", { posts: null });
  }
});
app.get("/tasker", async function (req, res) {
  const result = await db.query("SELECT * FROM posts");
  const posts = result.rows;
  if (posts) {
    res.render("tasker.ejs", { posts: posts, currentUser: req.user.id  });
  } else {
    res.render("tasker.ejs", { posts: null });
  }
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/transfer", (req, res) => {
  res.render("transfer.ejs");
});

app.post("/transfer",async function (req, res) {
  const amount = parseFloat(req.body.amount);
  const userId = req.user.email;
  const userTransaction  = await db.query("SELECT name, money FROM users WHERE email = $1",
     [userId]);
  const userAmount = userTransaction.rows[0];
  console.log("User amount: " + parseFloat(userAmount.money));
  console.log("The amount: " + amount);
  const totalAmount = parseFloat(userAmount.money) - parseFloat(amount) || userAmount.money;
  console.log("Totla amount: " + parseFloat(totalAmount));
  const userResult = await db.query("UPDATE users SET money = $1 WHERE email = $2",
     [totalAmount, userId]);
  
// <-------------------------------Incompeleted-------------------------------->

});


// <-------------------------------TOP UP-------------------------------->

app.get("/top-up", (req, res) => {
  res.render("top-up.ejs");
})
app.get("/top-up-tasker", (req, res) => {
  res.render("top-up-tasker.ejs");
})
app.post("/top-up", async function (req, res) {
  try {
    const submittedMoney = parseInt(req.body.money);
    const userResult = await db.query("SELECT money FROM users WHERE email = $1",
      [req.user.email]);

    const currentBalance = userResult.rows[0];
    const money = parseInt(currentBalance.money) + parseInt(submittedMoney) || 0;

    const topUpResult = await db.query("UPDATE users SET money = $1 WHERE email = $2",
      [money, req.user.email]
    )
    res.redirect("/profile");
  } catch (err) {
    console.log(err)
  }
});
app.post("/top-up-tasker", async function (req, res) {
  try {
    const submittedMoney = parseInt(req.body.money);
    const result = await db.query("SELECT money FROM taskers WHERE email = $1",
      [req.user.email]);

    const currentBalance = result.rows[0];
    const money = parseInt(currentBalance.money) + parseInt(submittedMoney);

    const topUpResult = await db.query("UPDATE taskers SET money = $1 WHERE email = $2",
      [money, req.user.email]
    )
    res.redirect("/tasker-profile");
  } catch (err) {
    console.log(err)
  }
});


// <-------------------------------SHARE POST-------------------------------->
app.get("/post", async function (req, res) {
res.render("post.ejs")
});

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
  const submittedPost = req.body.post;
  const taskerId = req.user.id;
  const taskerName = req.user.name;
  console.log(taskerName)

  if (!taskerId) {
    return res.status(400).send("Tasker ID not found.");
  }
  console.log(submittedPost);
  try {
    const result = await db.query("INSERT INTO posts (content, tasker_id, tasker_name) VALUES ($1, $2, $3) RETURNING id",
      [submittedPost, taskerId, taskerName]);
    const post = result.rows[0];
    res.redirect("/tasker")

  } catch (err) {
    console.log(err)
  }

});

// <-------------------------------VISIT PROFILE-------------------------------->
app.get("/tasker/:postId", async (req, res) => {
  try {
    const id = req.params.postId;
    const postResult = await db.query("SELECT tasker_id FROM posts WHERE tasker_id = $1", [id]);
    console.log("id: "+ id)
    const taskerId = postResult.rows[0];
    console.log("Tasker ID:" + taskerId.tasker_id);
    const taskerResult = await db.query("SELECT * FROM taskers WHERE id = $1", [taskerId.tasker_id]);
    const taskers = taskerResult.rows[0];
    res.render("view-tasker-profile.ejs", { tasker: taskers });

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/post/:id/edit",async function (req,res) {
    const id = req.params.id;
    const result = await db.query("SELECT id FROM posts WHERE id = $1", [id]);
    const post = result.rows;
    console.log(post)
    res.render("edit-post.ejs", {post: post});
});

app.post("/post/:id/edit", async function (req, res) {
  const id = req.params.id;
  const submittedPost = req.body.post;
  const userId = req.user.id;
  console.log(parseInt(id))
  const result = await db.query("SELECT content FROM posts WHERE id = $1 AND tasker_id = $2 ", [id, userId]);
  const currentData = result.rows[0]; 
  console.log("The current post: " + currentData);
  const updatePost = submittedPost || currentData;
  console.log("New post: " + updatePost);
  if (submittedPost) {
      const updateResult = await db.query("UPDATE posts SET content = $1 WHERE id = $2 AND tasker_id = $3", [submittedPost, id, userId]);
  }
  res.redirect("/tasker");
});
app.post("/post/:id/delete", async function (req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  const updateResult = await db.query("DELETE FROM posts WHERE id = $1 AND tasker_id = $2", [id, userId]);
  res.redirect("/tasker");
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

    const taskers = result.rows;
    if (taskers) {
      res.render("tasker-profile.ejs", { taskers: taskers });
    } else {
      res.render("tasker-profile.ejs", { name: "there is name", mobile: mobile, email: email, city: city, type: type });
    }
  } else {
    res.redirect("/login");
  }

});
app.get("/tasker-submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("tasker-submit.ejs")
  } else {
    res.redirect("/login")
  }
});
app.post("/tasker-submit", async function (req, res) {
  const submittedName = req.body.name;
  const submittedMobileNum = req.body.mobile;
  const submittedEmail = req.body.email;
  const submittedCity = req.body.city;
  const submittedType = req.body.type;
  try {
    const result = await db.query("SELECT * FROM taskers WHERE email = $1",
      [req.user.email]);

    const currentData = result.rows[0];

    const nameToUpdate = submittedName || currentData.name;
    const mobileToUpdate = submittedMobileNum || currentData.mobile;
    const emailToUpdate = submittedEmail || currentData.email;
    const cityToUpdate = submittedCity || currentData.city;
    const typeToUpdate = submittedType || currentData.type;

    const updatingResult = await db.query("UPDATE taskers SET name = $1, mobile = $2, email = $3, city = $4, type = $5 WHERE email = $6",
      [nameToUpdate, mobileToUpdate, emailToUpdate, cityToUpdate, typeToUpdate, req.user.email]
    );
    req.user.email = emailToUpdate;
    res.redirect("/tasker-profile");
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
        loginMessage: "Login successful, Hello " + name + "!",
        user: { name, email, mobile, money, city, role },
      });
    });
  })(req, res, next);
}); 

app.get("/profile", async function (req, res) {
  if (req.isAuthenticated()) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [req.user.email]);
    const user = result.rows[0];
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});


app.post("/tasker-signup", async function (req, res) {
  const name = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const city = req.body.city;
  const gender = req.body.gender;
  const service = req.body.service;
  const password = req.body.password;
  console.log(req.body);
  try {
    const checkResult = await db.query("SELECT * FROM taskers WHERE email = $1",
      [email]);

      if (checkResult.rows.length > 0) {
        return res.status(400).json({ message: "Email already in use" });
      } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            return res.status(500).json({ message: "Error hashing password" });
          } else {
            const result = await db.query(
              "INSERT INTO taskers (name, mobile, email, city, gender, service, password, money) VALUES ($1, $2, $3, $4, $5, $6, $7, DEFAULT) RETURNING *",
              [name, mobile, email, city, gender, service,  hash]
            );
            const user = result.rows[0];
            res.status(201).json({ message: "User registered successfully", user });
          }
        });
      }
  } catch (err) {
    console.log(err)
  }
});


app.post("/signup", async (req, res) => {
const {name, mobile, email, password} = req.body;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "Error hashing password" });
        } else {
          const result = await db.query(
            "INSERT INTO users (name, mobile, email, password, money) VALUES ($1, $2, $3, $4, DEFAULT) RETURNING *",
            [name, mobile, email, hash]
          );
          const user = result.rows[0];
          res.status(201).json({ message: "User registered successfully", user });
        }
      });
    }
  } catch (err) {
    console.log(err);
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

    res.redirect("/profile");
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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});