import BorrowingRecord from "../models/index.js";

class BorrowingRecordService {
    constructor() {
        this.borrowingRecordModel = BorrowingRecord;
    }

    async createBorrowingRecord(data) {
        return this.borrowingRecordModel.create(data);
    }

    async getBorrowingRecordById(id) {
        return this.borrowingRecordModel.findByPk(id);
    }

    async getAllBorrowingRecords(filter) {
        return this.borrowingRecordModel.findAll({ where: filter });
    }

    async updateBorrowingRecord(id, data) {
        const borrowingRecord = await this.borrowingRecordModel.findByPk(id);
        if (borrowingRecord) {
            return borrowingRecord.update(data);
        }
        return null;
    }

    async deleteBorrowingRecord(id) {
        const deleted = await this.borrowingRecordModel.destroy({ where: { id } });
        return deleted > 0;
    }

    async getBorrowingRecordsByBookId(bookId) {
        return this.borrowingRecordModel.findAll({ where: { bookId } });
    }

    async getBorrowingRecordsByUserId(userId) {
        return this.borrowingRecordModel.findAll({ where: { userId } });
    }
}

export default new BorrowingRecordService();