const Product = require('../models/product.model');
const Category = require('../models/category.model');

module.exports.index = async function(req,res){
    var product =await Product.find({}).limit(7).sort({time:-1});
    res.render('home/index',{product:product});
}
module.exports.detailProduct = async function(req,res,next){
    let id = req.params.id;
    try{
        let product = await Product.find({_id:id});
        res.render('product/detail',{product:product});
    }
    catch(err){
        next(err)
    }
    // let xx= abc();
    // let product = await Product.find({_id:id});
    // res.render('product/detail',{product:product});
}
module.exports.menuProduct = async function(req,res){
    let typeProduct = await Category.find({});
    let product = await Product.find({});
    let listSale = await Product.find({'sale.hasSale':1}).sort({time:-1});
    res.render('product/menu',{typeProduct:typeProduct,product:product,
                                listSale:listSale});
}