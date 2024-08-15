import { IUser } from "./user.interface";
import { User } from "./user.model";

const findOne = async (email: string): Promise<IUser | null> => {
    try {
        const user = (await User.findOne({ email })) as IUser | null;
        return user;
    } catch (error) {
        console.error("Error finding user:", error);
        return null;
    }
};

export { findOne }