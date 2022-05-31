import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import {  matchedData } from 'express-validator'
import { genHashPassword, validatePassword } from '../../middlewares/auth.js'
import { idValidate, loginValidator, userCreateValidate, userUpdateValidate, userValidate } from '../../middlewares/validator.js';
import { deleteUserById, updateuser } from '../../controllers/user.js';

const prisma = new PrismaClient()
const router = Router();

// router.get('/', (req, res, next) => {
//   getAlluser()
//     .then((user) => {
//       if (!user) { return res.error({ status: 404, message: "user not found" }) }
//       res.success({ data: user })
//     })
//     .catch((error) => {
//       console.log(error)
//       res.error(500)
//     })
// })

router.post('/', userCreateValidate,
  (req, res) => {
    let data = matchedData(req, { includeOptionals: true })
    const { password, salt } = genHashPassword(data.password)
    data = { ...data, password, salt, avatar: `https://avatars.dicebear.com/api/initials/${data.username}.svg` }
    prisma.user.create({ data: data })
      .then(user => {
        const { password, salt, ...userNopass } = user
        res.success({ data: userNopass })
      })
      .catch(e => {
        if (e && e.code === "P2002") {
          return res.error({ message: "มีคนใช้ username นี้แล้ว !!", status: 400 })
        }
        console.log(e)
        res.error(e)
      })
  })

router.post('/login', loginValidator,
  (req, res) => {
    let session = req.session;
    prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    }).then(async (user) => {

      if (!user || !validatePassword(req.body.password, user)) {
        return res.error({ status: 404, message: "username หรือ รหัสผ่าน ผิด" })
      }
      const { password, salt, ...resUser } = user
      session.user = resUser
      res.success(resUser)
    }).catch(e => {
      res.error(e)
    })
  })

router.route('/:id')
  .all(idValidate,userValidate)
  .get((req, res) => {
    res.success(req.user)
  })
  .put(userUpdateValidate, (req, res) => {
    const matched = matchedData(req, { includeOptionals: false })
    const { id, token, ...updateData } = matched
    if (updateData && Object.keys(updateData).length === 0) {
      return res.error({ status: 400 })
    }
    updateuser({ id: req.user.id, data: updateData })
      .then(userUpdate => res.success(userUpdate))
      .catch(e => {
        console.log(e);
        res.error(e)
      })
  })
  .delete((req, res) => {
    deleteUserById(req.user.id)
      .then(() => res.success())
      .catch((e) => {
        console.log(e)
        res.error(e)
      })
  })



export default router;