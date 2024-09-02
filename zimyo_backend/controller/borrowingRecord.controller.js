import BookService from '../services/book.service.js';
import borrowingRecordService from '../services/borrowingRecord.service.js'
import UserService from '../services/user.service.js';

const createBorrowingRecord = async (req, res) => {
    const { bookId, userId, borrowDate } = req.body;
    if (!bookId || !userId || !borrowDate) {
        return res.status(400).json({
            message: 'Book ID, user ID, and borrow date are required'
        });
    }

    try {

        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const book = await BookService.getBookById(bookId);
        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        const borrowingRecord = await borrowingRecordService.createBorrowingRecord(req.body);
        return res.status(201).json(borrowingRecord);
    } catch (error) {
        console.error('Error creating borrowing record:', error.message);
        return res.status(500).json({ message: 'Error creating borrowing record' });
    }
}

const getBorrowingRecordById = async (req, res) => {
    // Expecting ID in request parameters
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const borrowingRecord = await borrowingRecordService.getBorrowingRecordById(id);
        if (!borrowingRecord) {
            return res.status(404).json({ message: 'Borrowing record not found' });
        }
        return res.json(borrowingRecord);
    } catch (error) {
        console.error('Error getting borrowing record:', error.message);
        return res.status(500).json({ message: 'Error getting borrowing record' });
    }
}

const getAllBorrowingRecords = async (req, res) => {
    // Optional query parameters: bookId, userId, isReturned
    const { bookId, userId, isReturned } = req.query;
    try {
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await BookService.getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const borrowingRecords = await borrowingRecordService.getAllBorrowingRecords(req.query);
        return res.json(borrowingRecords);
    } catch (error) {
        console.error('Error getting borrowing records:', error.message);
        return res.status(500).json({ message: 'Error getting borrowing records' });
    }
}

const updateBorrowingRecord = async (req, res) => {
    // Expecting ID in request parameters and bookId, userId, borrowDate, returnDate in request body
    const { id } = req.params;
    const { bookId, userId, borrowDate, returnDate } = req.body;
    if (!id || (!bookId && !userId && !borrowDate && !returnDate)) {
        return res.status(400).json({ message: 'ID and at least one of book ID, user ID, borrow date, return date are required' });
    }

    try {
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await BookService.getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const borrowingRecord = await borrowingRecordService.updateBorrowingRecord(id, req.body);
        if (!borrowingRecord) {
            return res.status(404).json({ message: 'Borrowing record not found' });
        }
        return res.json(borrowingRecord);
    } catch (error) {
        console.error('Error updating borrowing record:', error.message);
        return res.status(500).json({ message: 'Error updating borrowing record' });
    }
}

const deleteBorrowingRecord = async (req, res) => {
    // Expecting ID in request parameters
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const deleted = await borrowingRecordService.deleteBorrowingRecord(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Borrowing record not found' });
        }
        return res.json({ message: 'Borrowing record deleted successfully' });
    } catch (error) {
        console.error('Error deleting borrowing record:', error.message);
        return res.status(500).json({ message: 'Error deleting borrowing record' });
    }
}

const getBorrowingRecordsByBookId = async (req, res) => {
    // Expecting bookId in request parameters
    const { bookId } = req.params;
    if (!bookId) {
        return res.status(400).json({ message: 'Book ID is required' });
    }

    try {
        const book = await BookService.getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const borrowingRecords = await borrowingRecordService.getBorrowingRecordsByBookId(bookId);
        return res.json(borrowingRecords);
    } catch (error) {
        console.error('Error getting borrowing records by book ID:', error.message);
        return res.status(500).json({ message: 'Error getting borrowing records by book ID' });
    }
}

const getBorrowingRecordsByUserId = async (req, res) => {
    // Expecting userId in request parameters
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const borrowingRecords = await borrowingRecordService.getBorrowingRecordsByUserId(userId);
        return res.json(borrowingRecords);
    } catch (error) {
        console.error('Error getting borrowing records by user ID:', error.message);
        return res.status(500).json({ message: 'Error getting borrowing records by user ID' });
    }
}

const returnBook = async (req, res) => {
    // Expecting ID in request parameters and returnDate in request body
    const { id } = req.params;
    const { returnDate } = req.body;
    if (!id || !returnDate) {
        return res.status(400).json({ message: 'ID and return date are required' });
    }

    try {
        const borrowingRecord = await borrowingRecordService.updateBorrowingRecord(id, { returnDate, isReturned: true });
        if (!borrowingRecord) {
            return res.status(404).json({ message: 'Borrowing record not found' });
        }
        return res.json({ message: 'Book returned successfully' });
    } catch (error) {
        console.error('Error returning book:', error.message);
        return res.status(500).json({ message: 'Error returning book' });
    }
}

const getOverdueBorrowingRecords = async (req, res) => {
    try {
        const borrowingRecords = await borrowingRecordService.getAllBorrowingRecords({ isReturned: false });
        const overdueRecords = borrowingRecords.filter(record => new Date(record.borrowDate) < new Date());
        return res.json(overdueRecords);
    } catch (error) {
        console.error('Error getting overdue borrowing records:', error.message);
        return res.status(500).json({ message: 'Error getting overdue borrowing records' });
    }
}