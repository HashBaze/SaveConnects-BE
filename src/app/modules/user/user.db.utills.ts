import { IUser } from "./user.interface";
import { User } from "./user.model";

const findOne = async (key: Partial<IUser>): Promise<IUser | null> => {
    try {
        const user = (await User.findOne(key)) as IUser | null;
        return user;
    } catch (error) {
        console.error("Error finding user:", error);
        return null;
    }
};

const updateUser = async (
    key: Partial<IUser>,
    update: Partial<IUser>
): Promise<IUser | null> => {
    try {
        const user = (await User.findOneAndUpdate(key, update, {
            new: true,
        })) as IUser | null;
        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
};

export { findOne, updateUser }