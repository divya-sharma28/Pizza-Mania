import pizzaModel from "../models/pizza.model";


// ===================== ADD PIZZA ======================
export const addPizza = (req,res) =>{
try {
    // img is coming from a url hence no multer
    const {name,size,price,category,image,description} =req.body

    const addData = new pizzaModel({
        name: name,
        size: size,
        price: price,
        category:category,
        image:image,
        description:description
    })
    addData.save()

    if(addData){
        res.status(201).json({
           data:addData,
           message:"Data saved to database" 
        })
   
    }

    else{
        res.status(400).json({
            data:addData,
            message:"Error while saving data" 
         })    
    }
} catch (error) {
    res.status(500).json({
        message:`"Server Error:${error}` 
     })
}

}


// ====================== GET PIZZA =======================

export const getPizza = async(req,res)=>{
    try {
        const getData = await pizzaModel.find()

        if(getData){
            res.status(200).json({
               data:getData,
               message:"Data fetched successfully" 
            })
       
        }
    
        else{
            res.status(400).json({
                data:addData,
                message:"Error while fetching data" 
             })    
        }
    } catch (error) {
        res.status(500).json({
            message:`"Server Error:${error}` 
         })
    }
}

// ====================== UPDATE PIZZA =======================

export const updatePizza = async (req,res) =>{
    try {
        const id = req.params.id;
        // console.log(id)
        const {name,size,price,category,image,description} =req.body

        const updateData = await pizzaModel.updateOne({_id:id},{
            $set:{
                name: name,
                size: size,
                price: price,
                category:category,
                image:image,
                description:description
            }
        })
        if (updateData.acknowledged) {
            res.status(201).json({
                data: updateData,
                message: 'Data updated successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while updating data!'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}