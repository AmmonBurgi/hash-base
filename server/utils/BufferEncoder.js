const {base64ToBase64URL} = require('./base64');

class BufferEncoder {
  /*
   * Encode buffer into base64 string.
   * Param buffer is the buffer to encode into base64 string
   */
  static toBase64(Buffer) {
    return Buffer.from(buffer).toString('base64')
  }

  /*
   * Encode buffer into base64url string.
   * Param buffer is the buffer to encode into base64url string
   */
  static toBase64URL(buffer) {
    return base64ToBase64URL(BufferEncoder.toBase64(buffer))
  }

  /*
   * Decode base64 string into buffer. Also supports base64url
   * Param base64 is the base64 or base64url string to decode into buffer format
   */
  static fromBase64(base64) {
    return Buffer.from(base64, 'base64')
  }

  /*
   * Decode string into buffer.
   * Param str is the string to decode into buffer format
   */
  static fromString(str) {
    return Buffer.from(str)
  }

  static toUtf8String(Buffer) {
    return Buffer.from(buffer).toString()
  }
}

module.exports = {
  BufferEncoder
}