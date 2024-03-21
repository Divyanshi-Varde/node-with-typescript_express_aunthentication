import fs from "fs";
import path from "path";
import jwt, { Secret } from "jsonwebtoken";
import { promisify } from "util";
import { User } from "../types/user-data.types";

const SECRET_KEY = process.env.JWT_SECRET_KEY as Secret;

const users: User[] = require("../assets/users-data.json");
const filePath = path.join(__dirname, "../assets", "users-data.json");

const writeFileAsync = promisify(fs.writeFile);

function generateAccessToken(user: any) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: "10m" });
}

export const signupServices = async (errors: any, username: string, password: string, role: string): Promise<any> => {
    if (!errors.isEmpty()) {
        return { message: "Provide proper credentials", code: 400 };
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return { message: "Username already exists", code: 400 };
    }

    const newUser = { id: users.length + 1, username, password, role };
    users.push(newUser);

    try {
        await writeFileAsync(filePath, JSON.stringify(users));
        return { message: "User created successfully", code: 201, user: newUser };
    } catch (error) {
        console.error(error);
        return { message: "Failed to add user data", code: 500 };
    }
};

export const loginServices = async (username: string, password: string): Promise<any> => {
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return { message: "Invalid username or password", code: 401 };
    }

    try {
        const accessToken = generateAccessToken({
            username: user.username,
            role: user.role,
        });
        return { token: accessToken, code: 200 };
    } catch (error) {
        console.error(error);
        return { message: "Error generating access token", code: 500 };
    }
};
