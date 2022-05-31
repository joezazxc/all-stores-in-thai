import crypto from 'crypto'
export const genHashPassword = (painPassword) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const password = crypto.pbkdf2Sync(painPassword, salt,
        16, 32, `sha512`).toString(`hex`);
    return ({ salt, password })
}

export const validatePassword = (password, user) => {
    const hash = crypto.pbkdf2Sync(password,
        user.salt, 16, 32, `sha512`).toString(`hex`);
    return user.password === hash;
}
