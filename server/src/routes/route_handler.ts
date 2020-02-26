import { Request, Response , Router } from "express";
import { AsyncRouter, NextFunction } from "express-async-router";
import { body, query, validationResult} from 'express-validator/check';
import { isEmpty } from 'lodash';
import { ProductModel } from "../models/product";


export const RestApiHandler = () => {

    const router = Router();

    router.get("/health", async (req: Request, res: Response) => {
        const json = {
            "status": "up",
        };
        res.setHeader("Content-Type", "application/json");
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
        res.send(JSON.stringify(json, null, 4));
    });

    /**
     * @api {get} /getAllProducts
     * @apiVersion 0.0.1
     */
    router.get('/getAllProducts', [], async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await ProductModel.find({}, null, { sort: {createdAt: -1 } });
            return res.json(product);
        } catch (err) {
            return next(err);
        }
    });

    /**
     * @api {get} /getProduct
     * @apiError {Object[]} [errors] Input errors
     * @apiError {string} errors.productID_id Error message for product._id
     * @apiError {string} message General error message
     * @apiError {number} statusCode HTTP Status Code
     * @apiParam (query) {string} productID of the product._id
     * @apiSampleRequest /getProduct
     * @apiSuccess {object} product The product doc of a product
     * @apiVersion 0.0.1
     */
    router.get('/getProduct', [
        query('_id').trim().escape().not().isEmpty().withMessage('The product _id field is required'),
    ], async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).mapped();
        if (!isEmpty(errors)) {
            return next({
                errors,
                message: '422 Unprocessable Entity',
                statusCode: 422,
            });
        }
        try {
            const product = await ProductModel.findOne({_id: req.query._id});
            if (!product) {
                return next({
                    message: 'Your given _id is incorrect',
                    statusCode: 403,
                });
            }
            return res.json(product);
        } catch (err) {
            return next(err);
        }
    });

    /**
     * @api {put} /updateProduct
     * @apiError {Object[]} [errors] Input errors
     * @apiError {string} errors.productID_id Error message for product._id
     * @apiParam (query) {string} productID of the product._id
     * @apiSampleRequest /updateProduct
     * @apiSuccess {object} product The updated doc of product
     * @apiVersion 0.0.1
     */
    router.put('/updateProduct', async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).mapped();
        if (!isEmpty(errors)) {
            return next({
                errors,
                message: '422 Unprocessable Entity',
                statusCode: 422,
            });
        }
        try {
            let queryBody;
            // tslint:disable-next-line:prefer-const
            let updateProduct: any;
            updateProduct = {};
            queryBody = req.body;
            const product = await ProductModel.findOne({_id:req.query._id}).then(product=>{
                if(!product){
                     return res.status(400).json({
          error: "Product not found"
        });
                }
if (queryBody.productName) {
                product.productName = queryBody.productName;
            }
            if (queryBody.productPrice) {
                product.productPrice = queryBody.productPrice;
            }
            if (queryBody.productCurrency) {
                product.productCurrency = queryBody.productCurrency;
            }
            if (queryBody.productDesc) {
                product.productDesc = queryBody.productDesc;
            }
            if (queryBody.productImage) {
                product.productImage = queryBody.productImage;
            }
            if (queryBody.enabled === false || queryBody.enabled === 'false') {
                product.enabled = false;
            }
            if (queryBody.enabled && (queryBody.enabled === true || queryBody.enabled === 'true')) {
                product.enabled = true;
            }
            product.save()
                .then(updatedProduct => {
                  return res.json(updatedProduct);
                })
                .catch(err =>
                  res.json({
                    error:
                      "Error in updating Product in database, please try again."
                  })
                );
            }).catch(err=>{
                 return res.status(500).json(err);
            })
            if (!product) {
                return next({
                    message: 'Your given _id is incorrect',
                    statusCode: 403,
                });
            }
            const updatedProductDoc = await ProductModel.findById(req.query._id);
            return res.json(updatedProductDoc);
        } catch (err) {
            return next(err);
        }
    });
    
    /**
     * @api {post} /addProduct
     * @apiError {Object[]} [errors] Input errors
     * @apiError {string} errors.productName Error message for productName
     * @apiError {string} errors.productPrice Error message for productPrice
     * @apiError {string} errors.productCurrency Error message for productCurrency
     * @apiError {string} errors.productDesc Error message for productDesc
     * @apiError {string} message General error message
     * @apiError {number} statusCode HTTP Status Code
     * @apiParam (body) {string} productName of the product
     * @apiParam (body) {string} productPrice of the product
     * @apiParam (body) {string} productCurrency of the product
     * @apiParam (body) {string} productDesc of the product
     * @apiParam (body) {string} productImage of the product
     * @apiSampleRequest /addProduct
     * @apiSuccess {object} product The product doc
     * @apiVersion 0.0.1
     */
    router.post('/addProduct', [
        body('productName').trim().escape().not().isEmpty().withMessage('The productName field is required'),
        body('productPrice').trim().escape().not().isEmpty().withMessage('The productPrice field is required'),
        body('productDesc').trim().escape().not().isEmpty().withMessage('The productDesc field is required'),
        body('productImage').trim().not().isEmpty().withMessage('The productImage field is required'),
    ], async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req).mapped();
        if (!isEmpty(errors)) {
            return next({
                errors,
                message: '422 Unprocessable Entity',
                statusCode: 422,
            });
        }
        try {
            const product = await ProductModel.create(req.body);
            return res.json(product);
        } catch (err) {
            return next(err);
        }
    });

    return router;
};
