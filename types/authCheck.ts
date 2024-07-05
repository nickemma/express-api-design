import bcrypt from 'bcryptjs';

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export const hashedPassword = (password: string) => {
    return bcrypt.hash(password, 10);
}