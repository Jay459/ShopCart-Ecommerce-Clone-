
exports.getAllProuducts = (req,res,next) =>{
    res.status(200).json({
        success:"true",
        message:"This will show the products in the database."
    })
}