exports.sendFullResponse = function(res, code, data, message){
    var result = {
        code: code,
        data: data,
        message: message
    };
    res.send(result);
}
