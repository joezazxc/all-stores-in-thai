import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { validationResult, param, matchedData } from 'express-validator';
import { storeCreateValidator, validateErrors, storeUpdateValidator, idValidate, storeValidate } from '../../middlewares/validator.js';

const prisma = new PrismaClient()
const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const stores = await prisma.store.findMany({ take: 500 })
        res.success(stores)
    } catch (error) {
        console.log(error)
        res.error(error)
    }
});

router.post('/', storeCreateValidator, storeValidate,
    (req, res, next) => {
        let data = matchedData(req, { includeOptionals: false })
        prisma.store.create({
            data: {
                ...data,
                users: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        })
            .then(store => res.success(store))
            .catch(e => {
                if (e && e.meta) {
                    return res.error({ message: e.meta.cause })
                }
                console.log(e)
                res.error(e)
            })
    });

router.route('/:id')
    .get((req, res) => {
        prisma.store.findFirst({
            where: { id: Number(req.params.id) }
        })
            .then(store => {
                if (!store) { return res.error({ status: 404, message: "store not found" }) }
                res.success(store)
            })
            .catch(e => {
                console.log(e)
                res.error({ message: e.meta.cause })
            })
    })
    .all(idValidate, storeValidate)
    .put(storeUpdateValidator, (req, res) => {
        let store = matchedData(req, { includeOptionals: false })
        const { id, token, ...data } = store
        if (data && Object.keys(data).length === 0) {
            return res.error({ message: "no content update", status: 400 })
        }
        prisma.store.update({
            where: { id: Number(req.params.id) },
            data: data
        })
            .then(() => res.success())
            .catch(e => {
                if (e && e.meta) { return res.error({ message: e.meta.cause }) }
                console.log(e)
                res.error(e)
            })
    })
    .delete((req, res) => {
        prisma.store.delete({
            where: { id: Number(req.params.id) }
        })
            .then(() => res.success())
            .catch(e => {
                console.log(e)
                res.error(e)
            })
    })


export default router;