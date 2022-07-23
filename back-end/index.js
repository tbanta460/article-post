const express = require('express');
const db = require('./config/db.js');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const articleRoute = require('./src/routes/article');

// Mengatasi CORS
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Jika Masih Terjadi Error Cors, Aktifkan Dan Matikan Cors Di Atas
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// Konek Sequelize/Menjalankan Sequelize
try {
	db.authenticate().then(() => console.log('berhasil connect')).catch(err => console.log(err, "terjadi error"))
}catch (error){
	console.log("Terjadi Error", error)
}

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/', articleRoute);

// Menjalanakan Server
app.listen(PORT, () => console.log("Server Run", PORT));