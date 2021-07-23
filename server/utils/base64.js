module.exports.base64ToBase64URL = function(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }