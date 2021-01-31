import jwt from 'jsonwebtoken';
import { fetchAccount } from '../../dao/AccountDAO';
import bcrypt from 'bcrypt';

export class AuthenticationService {

    private refreshTokens: Array<any> = []

    public login = async (email: string, password: string) => {
        const account = await fetchAccount(email);

        if (account.length == 0) {

            throw { status: 404, message: "Email not found" };
        }

        /*try {
            if (await bcrypt.compare(password, account[0].password)) {*/
        const accessToken = this.generateAccessToken(email);
        const refreshToken = jwt.sign(email, process.env.REFRESH_TOKEN_SECRET)
        this.refreshTokens.push(refreshToken);
        return { accessToken: accessToken, refreshToken: refreshToken };
        /*}
        else {
            throw { status: 401, message: "Incorrect password" }
        }
    }
    catch {
        throw { status: 500, message: "Oups! Unexpected error" }
    }*/
    }

    public logout = (userToken) => {
        this.refreshTokens = this.refreshTokens.filter(token => token !== userToken)
        return { status: 204, message: "Logout successful" }
    }

    public generateAccessToken = (email: string) => {
        return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
    }

    public generateNewAccessToken = async (refreshToken) => {

        if (refreshToken == null) {
            throw { status: 401, message: "No refresh token provided" }
        }

        if (!this.refreshTokens.includes(refreshToken)) {
            throw { status: 403, message: "Invalid refresh token" }
        }

        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return reject({ status: 403, message: "Invalid refresh token" });
                }

                const accessToken = this.generateAccessToken(user);

                resolve({ accessToken: accessToken });
            })
        })
    }
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user
        next()
    })
}