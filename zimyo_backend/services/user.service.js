import { User } from "../models/index.js";

class UserService {
    constructor() {
        this.userModel = User;
    }

    async createUser(data) {
        return this.userModel.create(data);
    }

    async getUserById(id) {
        return this.userModel.findByPk(id);
    }

    async getAllUsers(filter) {
        return this.userModel.findAll({ where: filter });
    }

    async updateUser(id, data) {
        const user = await this.userModel.findByPk(id);
        if (user) {
            return user.update(data);
        }
        return null;
    }

    async deleteUser(id) {
        const deleted = await this.userModel.destroy({ where: { id } });
        return deleted > 0;
    }

    async getUserByUsername(username) {
        return this.userModel.findOne({ where: { username } });
    }

    async getUserByEmail(email) {
        return this.userModel.findOne({ where: { email } });
    }
}

export default new UserService();