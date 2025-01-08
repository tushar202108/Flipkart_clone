import Product from '../model/product-schema.js';


export const getProducts = async (req,resp) => {
    try{
        const products = await Product.find({});

        resp.status(200).json(products);
    }catch (error) {
        resp.status(500).json({message: error.message})

    }

}