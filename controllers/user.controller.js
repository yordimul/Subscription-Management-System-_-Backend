import User from "../model/user.model.js";

const FindAllUsers = async (req, res, next) => {
  const users = await User.find();

  if (users.length === 0) {
    return res.status(404).json({
      message: "Users not found"
    });
  }

  res.status(200).json({
    users
  });
};


const FindUser = async(req,res,next)=>{
  
    try {

        const user =  await User.findById (req.params.id).select("-password")

if (!user){
    res.status(404).json({
    message:'user not found '
});
    
}

res.status(200).json({
    user
});


    }
    catch(error){
        next(error);

    }


}
export   {FindAllUsers , FindUser};