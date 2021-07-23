const {base64ToBase64URL} = require('./base64');

class JsonEncoder {
  /*
   * Encode json object into base64 string.
   * Param json is the json object to encode into base64 string
   */
  static toBase64(json) {
    return JsonEncoder.toBuffer(json).toString('base64')
  }

  /*
   * Encode json object into base64url string.
   * Param json is the json object to encode into base64url string
   */
  static toBase64URL(json) {
    return base64ToBase64URL(JsonEncoder.toBase64(json))
  }

  /*
   * Decode base64 string into json object. Also supports base64url
   * Param base64 is the base64 or base64url string to decode into json
   */
  static fromBase64(base64) {
    return JsonEncoder.fromBuffer(Buffer.from(base64, 'base64'))
  }

  /*
   * Encode json object into string
   * Param json is the json object to encode into string
   */
  static toString(json) {
    return JSON.stringify(json)
  }

  /*
   * Decode string into json object
   * Param string is the string to decode into json
   */
  static fromString(string) {
    return JSON.parse(string)
  }

  /*
   * Encode json object into buffer
   * Param json is the json object to encode into buffer format
   */
  static toBuffer(json) {
    return Buffer.from(JsonEncoder.toString(json))
  }

  /*
   * Decode buffer into json object
   * Param buffer is the buffer to decode into json
   */
  static fromBuffer(buffer) {
    return JsonEncoder.fromString(Buffer.from(buffer).toString('utf-8'))
  }
}

module.exports = {
  JsonEncoder
}
