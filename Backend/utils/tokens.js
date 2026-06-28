import jwt from 'jsonwebtoken'

//access token
export const generateAccessToken = (tokenObj)=>{
    return jwt.sign(
    tokenObj,
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:"1d"
    }
)
}


//refresh token
export const generateRefreshToken = (tokenobjaccesstoken)=>{
    return jwt.sign(
    tokenobjaccesstoken,
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:"7d"
    }
)
}