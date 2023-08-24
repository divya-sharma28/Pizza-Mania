import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


// ----------------- REGISTER NEW USER (POST) -------------------

export const userRegister = async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      const userExists = await userModel.findOne({ email: email });
  
      if (userExists) {
         return res.status(409).json({
          message: `${email} already exists!`,
        });
      }
  
        const hashPassword = bcrypt.hashSync(password, 10);
        const addUser = new userModel({
          fullName,
          email,
          password: hashPassword,
        });
        await addUser.save();
    

  
      res.status(200).json({
        data: addUser,
        message: `${email} registered successfully!`,
      });
    } catch (error) {
      res.status(500).json({
        message: `Server Error: ${error.message}`,
      });
    }
  };
  

// -------------------------------- USER LOGIN --------------------------

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await userModel.findOne({ email: email });

        // console.log(existUser,"existUser")
        if (existUser) {
            const match = await bcrypt.compare(password, existUser.password);
            // console.log(match,"match")

            if (match) {
                const token = jwt.sign({ _id: existUser._id, email: existUser.email }, 'test-pizza-mania', { expiresIn: '6h' })
                res.status(200).json({
                    data: existUser,
                    token,
                    message: 'Login Successful!'
                })
            }
            else {
              return res.status(400).json({
                    message: 'Password incorrect!'
                });
            }
        }

        else {
            return res.status(400).json({
                message: `${email} is not registered!`
            });
        }



    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}


export const getUsers = async (req, res) => {
    try {
        const getData = await userModel.find()

        if (getData) {
            res.status(200).json({
                data: getData,
                message: "data fetched successfully!"
            })
        }
        else {
            res.status(400).json({
                message: "Error fetching data"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}