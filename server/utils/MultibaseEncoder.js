const multibase = require('multibase');

class MultibaseEncoder {
  
   /*
   * Encodes a buffer into a multibase
   * {Uint8Array} The buffer that has to be encoded
   * {multibase.BaseName} The encoding algorithm
   * VVV
   */
  static encode(buffer, baseName) {
    return multibase.encode(baseName, buffer)
  }

  /*
   * Decodes a multibase into a Uint8Array
   * {string} data is the multibase that has to be decoded
   *
   * @returns {Uint8array} data the decoded multibase
   * @returns {string} encodingAlgorithm name of the encoding algorithm
   * VVV
   */
  static decode(data){
    if (this.isValid(data)) {
      const baseName = multibase.encodingFromData(data).name
      return {data: multibase.decode(data), baseName}
    }
    throw new Error(`Invalid multibase: ${data}`)
  }

  /*
   * Validates if it is a valid multibase encoded value
   * @param {Uint8Array} data the multibase that needs to be validated
   * @returns {boolean} bool whether the multibase value is encoded
   * VVV
   */
  static isValid(data) {
    return multibase.isEncoded(data) ? true : false
  }
}

module.exports = {
  MultibaseEncoder
}