const resFormat = (res, statusCode, data, message) => {
    res.status(statusCode).send(
        {
            payload : {
            data: data,
            statusCode: statusCode,
            }, 
            message : message,
            pagination : {
                length: (typeof data === 'object' ? data.length : "")
            }
        }
    )
    
}

module.exports = resFormat

