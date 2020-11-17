import bcrypt from 'bcrypt'

export const GeneratePassword = async (password) => {
    return await bcrypt.hash(password, 10);
}