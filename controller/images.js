const connection = require("../model/dbConnect");


const uploadImage = async (req, res) => {

 
    let userData = [
        req.file.location,
        req.query.id
    ];
    console.log(userData);
   
    let sqlQuery = `insert into multerS3 values(?,?)`;
  
    await connection.query(sqlQuery, userData, function (error, result) {
      if (error) {
        console.log("error", error.sqlMessage);
      } else {
        res.json(result);
      }
    });
  };

  module.exports = {uploadImage}