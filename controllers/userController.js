exports.hello = async (req, res,name) => {

    if(req.body.name===undefined||req.body.name===null) return res.status(400).json({message:'bad request!, name is required'});
    return res.status(200).json({message:'Hello '+req.body.name});
}
