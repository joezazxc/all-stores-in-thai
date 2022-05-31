import { PrismaClient } from '@prisma/client'
import { matchedData } from 'express-validator'
const prisma = new PrismaClient()

export const getAlluser = () => {
    return prisma.user.findMany({
        select: {
            avatar: true,
            createdAt: true,
            email: true,
            token_api: true,
            username: true,
            id: true
        }
    })
}

export const getUserByid = (id) => {
    return prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
            avatar: true,
            createdAt: true,
            email: true,
            token_api: true,
            username: true,
            id: true
        }
    })
}

export const updateuser = ({ id, data }) => {
    return prisma.user.update({
        where: {
            id: id
        },
        data: data,
        select: {
            avatar: true,
            createdAt: true,
            email: true,
            token_api: true,
            username: true,
            id: true
        }
    })
}

export const deleteUserById = (id) => {
    return prisma.user.delete({
        where: {
            id: id
        }
    })
}