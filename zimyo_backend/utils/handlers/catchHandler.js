export const catchHandler = (err, res,...args) => {
    res.status(500).json({
        success: false,
        error: err.message,
        ...args
    });
}