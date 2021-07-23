const multihash = require('multihashes');

class MultihashEncoder {
    /*
     * Encodes a buffer into a hash
     * Param buffer is the buffer that has to be encoded
     * Param hashName is the hashing algorithm, 'sha2-256'
     * Encode should return a multihash
     * VVV
     */
    static encode(buffer, hashName) {
      return multihash.encode(buffer, hashName)
    }
  
    /*
     * Decodes the multihash
     * Param data is the multihash that has to be decoded
     * decode should return an object with the data and the hashing algorithm
     * VVV
     */
    static decode(data) {
      if (this.isValid(data)) {
        const decodedHash = multihash.decode(data)
        return {data: decodedHash.digest, hashName: decodedHash.name}
      }
      throw new Error(`Invalid multihash: ${data}`)
    }
  
    /*
     * Validates if it is a valid mulithash
     * Param data is the multihash that needs to be validated
     * isValid returns a boolean whether the multihash is valid
     * VVV
     */
    static isValid(data) {
      try {
        multihash.validate(data)
        return true
      } catch (e) {
        return false
      }
    }
  }
  
  module.exports = {
    MultihashEncoder
  }