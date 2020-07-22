const mongoose = require("mongoose");
const shortId = require("shortid");

const Category = require("../models/category.model");
const Product = require("../models/product.model");
const Session = require("../models/session.model");

module.exports.addCart = async function (req, res) {
  let id = req.params.id;
  let allProduct = await Product.find({}).sort({ time: -1 });
  let product = await Product.find({
    _id: id,
    size: { $elemMatch: { name: "Nhỏ" } },
  });

  // if (!req.signedCookies.sessionId) {
  //   let shortid = shortId.generate();
  //   res.cookie('sessionid', shortid, {
  //     signed: true,
  //   });
  //   console.log("cookie:"+ req.signedCookies.sessionid);
  //   var session = new Session({
  //     id: shortid,
  //     products: [{
  //       product:id,
  //       amount:1,
  //       sum:product[0].price
  //     }],
  //   });
  //   session.save(function (err) {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  // }
  // else{
  //   console.log("def");
  let idSession = req.signedCookies.sessionid;
  //kiểm tra giỏ hàng có sản phẩm nào chưa
  let productInSession1 = await Session.find({ id: idSession });
  console.log(productInSession1.length);
  if (productInSession1.length === 0) {
    let session = new Session({
      _id: new mongoose.mongo.ObjectId(),
      id: idSession,
      products: [
        {
          id: id,
          name: product[0].name,
          price: product[0].price,
          typeProduct: product[0].typeProduct,
          size: {
            name: product[0].size[0].name,
            priceBonus: product[0].size[0].priceBonus,
          },
          sale: {
            hasSale: product[0].sale.hasSale,
            name: product[0].sale.name,
            percentSale: product[0].sale.percentSale,
            priceSale: product[0].sale.priceSale,
          },
          hot: product[0].hot,
          time: product[0].time,
          image: product[0].image,
          description: product[0].description,
          amount: 1,
          sum: product[0].price,
        },
      ],
    });
    session.save(function (err) {
      console.log(err);
    });
  }
  //tìm sản phẩm đã tồn tại trong giỏ hàng hay chưa
  else {
    let productInSession = await Session.find({
      id: idSession,
    }).where({ products: { $elemMatch: { id: id } } });
    if (productInSession.length === 0) {
      // không tồn tại sản phẩm
      let x = await Session.find({ id: idSession });
      x[0].products.push({
        id: id,
        name: product[0].name,
        price: product[0].price,
        typeProduct: product[0].typeProduct,
        size: {
          name: product[0].size[0].name,
          priceBonus: product[0].size[0].priceBonus,
        },
        sale: {
          hasSale: product[0].sale.hasSale,
          name: product[0].sale.name,
          percentSale: product[0].sale.percentSale,
          priceSale: product[0].sale.priceSale,
        },
        hot: product[0].hot,
        time: product[0].time,
        image: product[0].image,
        description: product[0].description,
        amount: 1,
        sum: product[0].price,
      });
      await x[0].save();
    }
  }

  let category = await Category.find({});
  let listProductInSession = await Session.find({ id: idSession });
  console.log(listProductInSession[0].products[0]);
  res.render("order/cart", {
    category: category,
    listCart: listProductInSession,
    allProduct: allProduct,
  });
};
