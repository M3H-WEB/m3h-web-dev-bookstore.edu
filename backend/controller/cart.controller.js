import Cart from "../model/cart.model.js";

export const sendItem = async (req, res)=>{
    try {
        
        const {userId, img, name, price, quantity} = req.body;
        const createdCart = new Cart({
            img : img,
            name : name, 
            price: price,
            quantity: quantity,
            userId: userId
         });
         //check if already exist
         const isExist = await Cart.findOne({userId: userId, name: name});
         if(isExist) return res.status(400).json({message : "Item already exists in cart"})
                   
         
        await createdCart.save();
        res.status(201).json({message: "Cart created successfully", createdCart})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})
    }
}



export const getCart = async (req, res)=>{
    try {
        const userId = req.params.userId;
console.log(userId)
        const cart = await Cart.find({userId:userId});
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteCartItem = async (req, res)=>{
    try {
        const itemId = req.params.itemId;
        console.log(itemId)
        const response = await Cart.findByIdAndDelete(itemId)
        if (!response) {
          return res.status(404).json({error : 'Item not found'})
        }
        console.log('item deleted')
        res.status(200).json({msg : 'Deleted'})
      } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Internal server error'})
    
      }
}


export const updateCartItem = async (req, res)=>{
    try {
        const itemId = req.params.itemId;
        const quantity = req.body;
        const response = await Cart.findByIdAndUpdate(itemId, quantity,{
          new : true,
          runValidators : true
        })
        if (!response) {
          return res.status(404).json({error : 'item not found'})
        }
        console.log('Item updated')
        res.status(200).json(response)
      } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Internal server error'})
    
      }
}