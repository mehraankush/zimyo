export const successHandler = (res,message, data, ...args) => {
    res.status(200).json({
        success: true,
        message,
        data:data,
        ...args
    });
}