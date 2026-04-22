const response = (data, message, status) => {
    return {
        'status': status,
        "message": message,
        "data": data,
        "meta": {
            "timestamp": new Date().toISOString()
        }
    }
}

module.exports = response;