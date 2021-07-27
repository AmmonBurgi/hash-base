const cbor = require('borc')
const {sha256} = require('js-sha256')

const {BufferEncoder} = require('./BufferEncoder');
const {MultibaseEncoder} = require('./MultibaseEncoder');
const {MultihashEncoder} = require('./MultihashEncoder');

const hexTable = {
  urls: 0x0f,
  contentType: 0x0e,
}

class HashlinkEncoder {

  /*
   * Encodes a buffer, with optional metadata, into a hashlink
   * Param buffer is the buffer to encode into a hashlink
   * Param hashAlgorithm is the name of the hashing algorithm 'sha2-256'
   * Param baseEncoding is the name of the base encoding algorithm 'base58btc'
   * Param metadata is the optional metadata in the hashlink
   * encode returns a hashlink with optional metadata
   * VVV
   */
  static encode(buffer, hashAlgorithm, baseEncoding, metadata) {
    const checksum = this.encodeMultihashEncoder(
      buffer,
      hashAlgorithm,
      baseEncoding,
    )
    const mbMetadata = metadata
      ? this.encodeMetadata(metadata, baseEncoding)
      : null
    return mbMetadata ? `hl:${checksum}:${mbMetadata}` : `hl:${checksum}`
  }

  /*
   * Decodes a hashlink into HashlinkData object
   * Params hashlink is the hashlink that needs decoding
   * decode returns an object the decoded hashlink
   * VVV
   */
  static decode(hashlink) {
    if (this.isValid(hashlink)) {
      const hashlinkList = hashlink.split(':')

      // The value of index 0 is "h1", and is not needed below. VVV
      const [, checksum, encodedMetadata] = hashlinkList
      return encodedMetadata
        ? {checksum, metadata: this.decodeMetadata(encodedMetadata)}
        : {checksum}
    } else {
      throw new Error(`Invalid hashlink: ${hashlink}`)
    }
  }

  /*
   * Validates a hashlink
   * Param hashlink is the hashlink that needs validating
   * isValid returns a boolean whether the hashlink is valid
   * VVV
   * */

  static isValid(hashlink) {
    const hashlinkList = hashlink.split(':')
    const validMultibase = MultibaseEncoder.isValid(hashlinkList[1])
    if (!validMultibase) {
      return false
    }
    const {data} = MultibaseEncoder.decode(hashlinkList[1])
    const validMultihash = MultihashEncoder.isValid(data)
    return validMultibase && validMultihash ? true : false
  }

  static encodeMultihashEncoder(buffer, hashName, baseEncoding) {
    // TODO: Support more hashing algorithms
    const hash = new Uint8Array(sha256.array(buffer))
    const mh = MultihashEncoder.encode(hash, hashName)
    const mb = MultibaseEncoder.encode(mh, baseEncoding)
    return BufferEncoder.toUtf8String(mb)
  }

  static encodeMetadata(metadata, baseEncoding) {
    const metadataMap = new Map()

    for (const key of Object.keys(metadata)) {
      if (key === 'urls' || key === 'contentType') {
        metadataMap.set(hexTable[key], metadata[key])
      } else {
        throw new Error(`Invalid metadata: ${metadata}`)
      }
    }

    const cborData = cbor.encode(metadataMap)

    const multibaseMetadata = MultibaseEncoder.encode(cborData, baseEncoding)

    return BufferEncoder.toUtf8String(multibaseMetadata)
  }

  static decodeMetadata(mb) {
    const obj = {urls: [], contentType: ''}
    const {data} = MultibaseEncoder.decode(mb)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cborData = cbor.decode(data)
      cborData.forEach((value, key) => {
        if (key === hexTable.urls) {
          obj.urls = value
        } else if (key === hexTable.contentType) {
          obj.contentType = value
        } else {
          throw new Error(`Invalid metadata property: ${key}:${value}`)
        }
      })
      return obj
    } catch (error) {
      throw new Error(`Invalid metadata: ${mb}, ${error}`)
    }
  }
}

module.exports = {
  HashlinkEncoder
}