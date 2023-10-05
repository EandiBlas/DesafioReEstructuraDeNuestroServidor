export const publicAcces = (req,res,next) =>{
    if(req.session.username) return res.redirect('/profile');
    next();
}

export const privateAcces = (req,res,next)=>{
    if(!req.session.username) return res.redirect('/login');
    next();
}