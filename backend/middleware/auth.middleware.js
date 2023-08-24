import jwt from 'jsonwebtoken'

export const auth = async(req,res,next) =>{
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization;
            const decodeToken = jwt.verify(token,'test-pizza-mania')
            if(decodeToken){
                next();
            }
            else{
                res.status(401).json({
                    message:'Invalid token!'
                })
            }
        }
        else{
            res.status(401).json({
                message:'Token not found!'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`Server Error: ${error.message}`
        })
    }
}