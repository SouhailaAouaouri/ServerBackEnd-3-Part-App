module.exports=function (req,res,next){
    if(req.person.role!=="ADMIN") return res.status(403).send('Access denied... You can not access this API.');
    next();
}
//check admin role