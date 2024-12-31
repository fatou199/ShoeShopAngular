import bcrypt from 'bcrypt';

// Fonction pour hacher le mot de passe
async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Fonction pour vérifier le mot de passe
async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}

export {hashPassword, verifyPassword}
