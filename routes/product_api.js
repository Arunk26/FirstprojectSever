
var express = require('express');
const router = express.Router();
let product = require('../Models/product');

// get product
router.route('/getProduct').get((req, res, next) => {
    product.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// post product
router.post('/addproduct', async (req, res) => {
    let products = new product({
        productName: req.body.productName == undefined ? '' : req.body.productName,
        quantity: req.body.quantity == undefined ? '' : req.body.quantity,
        price : req.body.price == undefined ? '' : req.body.price,
    });
    productss = await products.save();

    res.send(productss);
});


// PUT product
router.put('/updateproduct/:id', async (req, res) => {
        const ProductDetails = await product.findByIdAndUpdate(req.params.id,
            {
                productName: req.body.productName == undefined ? '' : req.body.productName,
                quantity: req.body.quantity == undefined ? '' : req.body.quantity,
                price : req.body.price == undefined ? '' : req.body.price,
                modifiedOn: (new Date()).getTime()
            },
            {
                useFindAndModify: false
            });

        if (!ProductDetails) {
            return res.status(404).send(' was not found');
        }
        else {
            const ProductDetails = await product.findOne({ "_id": req.params.id })
                .then(result => {
                    return res.send(result);
                }).catch(err => {
                    return res.status(404).send("Not found");
                });
        }
});

// Delete product
router.delete('/deleteProduct/:id', async (req, res) => {
    const model = await product.findByIdAndDelete(req.params.id, {
        useFindAndModify: false
    });
    res.json(model);
});
module.exports = router;