import { param, body, checkSchema, validationResult, header } from "express-validator";
import { PrismaClient } from '@prisma/client'
import { getUserByid } from "../controllers/user.js";
const prisma = new PrismaClient()

export const validateErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error({ message: errors.array(), status: 400 });
    }
    next()
}

export const storeCreateValidator = [
    body("latitude").isFloat().optional(),
    body("contact_location").isString().optional(),
    body("more").isString().optional(),
    body("province").isString().notEmpty(),
    body("email").isString().optional(),
    body("website_url").isString().optional(),
    body("line_id").isString().optional(),
    body("travel").isString().optional(),
    body("map_picture").isString().optional(),
    body("product").isString().optional(),
    body("video").isString().optional(),
    body("thumbnail").isString().optional(),
    body("details").isString().optional(),
    body("mobile_phone").isString().optional(),
    body("facebook").isString().optional(),
    body("store_name").isString().notEmpty(),
    body("contact_name").isString().optional(),
    body("soy").isString().optional(),
    body("moo").isString().optional(),
    body("fax_number").isString().optional(),
    body("road").isString().optional(),
    body("aumper").isString().optional(),
    body("longitude").isFloat().optional(),
    body("address").isString().optional(),
    body("tumbon").isString().optional(),
    body("store_id").isInt().optional(),
    body("contact_number").isString().optional(),
    body("twitter").isString().optional(),
    body("full_text").isString().optional(),
    body("zip_code").isInt().optional(),
    validateErrors
]
export const storeUpdateValidator = [
    body("latitude").isFloat().optional(),
    body("contact_location").isString().optional(),
    body("more").isString().optional(),
    body("province").isString().optional(),
    body("email").isString().optional(),
    body("website_url").isString().optional(),
    body("line_id").isString().optional(),
    body("travel").isString().optional(),
    body("map_picture").isString().optional(),
    body("product").isString().optional(),
    body("video").isString().optional(),
    body("thumbnail").isString().optional(),
    body("details").isString().optional(),
    body("mobile_phone").isString().optional(),
    body("facebook").isString().optional(),
    body("store_name").isString().optional(),
    body("contact_name").isString().optional(),
    body("soy").isString().optional(),
    body("moo").isString().optional(),
    body("fax_number").isString().optional(),
    body("road").isString().optional(),
    body("aumper").isString().optional(),
    body("longitude").isFloat().optional(),
    body("address").isString().optional(),
    body("tumbon").isString().optional(),
    body("store_id").isInt().optional(),
    body("contact_number").isString().optional(),
    body("twitter").isString().optional(),
    body("full_text").isString().optional(),
    body("zip_code").isInt().optional(),
    validateErrors
]

export const loginValidator = [
    body('username').isString(),
    body('password').isString(),
    validateErrors
]

export const userCreateValidate = [
    body("username").isString(),
    body("password").isString().withMessage('pasword is null').isLength({ min: 8 }).withMessage(`password can't be less 8 character`),
    body("email").isEmail().optional(),
    validateErrors
]

export const userUpdateValidate = [
    body('password').isString().optional(),
    body('email').isEmail().optional(),
    body('avatar').isString().optional(),
    validateErrors
]

export const idValidate = [
    param('id').isInt().notEmpty(),
    header('token').isString().withMessage("token not found"),
    validateErrors
]


export const userValidate = async (req, res, next) => {
    const token = req.get('token')
    const user = await getUserByid(req.params.id)
    if (!user) { return res.error({ status: 404, message: "user not found" }) }
    if (token != user.token_api) {
        console.log({ message: "Forbidden" })
        return res.error({ message: "Forbidden", status: 403 })
    }
    req.user = user
    next()
}



export const storeValidate = (req, res, next) => {
    const token = req.get('token')
    prisma.user.findUnique({
        where: {
            token_api: token
        }
    })
        .then((user) => {
            if (!user) { return res.error({ status: 404, message: "token not found" }) }
            req.user = user
            next()
        })
        .catch((e) => {
            res.error({ message: "Forbidden", status: 403 })
        })
}