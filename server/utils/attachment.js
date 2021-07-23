const {BufferEncoder} = require('./BufferEncoder')
const {HashlinkEncoder} = require('./HashlinkEncoder')
const {JsonEncoder} = require('./JsonEncoder')

/*
 * Encodes an attachment based on the `data` property
 * Param attachment is the attachment that needs to be encoded
 * Param hashAlgorithm is the hashing algorithm that is going to be used
 * Param baseName is the base encoding name that is going to be used
 * encodeAttachment returns a hashlink based on the attachment data
 * VVV
 */

// Example of attachment/data being passed into encodeAttachment function VVV
// const attachmentObject = {
//   id: 'ceffce22-6471-43e4-8945-b604091981c9',
//   description: 'A small picture of a cat',
//   filename: 'cat.png',
//   mimeType: 'text/plain',
//   lastmod_time: new Date(),
//   byte_count: 9200,
//   data: {
//     json: {
//       hello: 'world!',
//     },
//     sha256: '00d7b2068a0b237f14a7979bbfc01ad62f60792e459467bfc4a7d3b9a6dbbe3e',
//   },
// }

const encodeAttachment = (attachment = attachmentObject, hashAlgorithm, baseName) => {
  console.log('This is encodeAttachment.')
  if (attachment.data.sha256) {
    console.log(`hl:${attachment.data.sha256}`)
    return `hl:${attachment.data.sha256}`
  } else if (attachment.data.base64) {
    console.log(HashlinkEncoder.encode(BufferEncoder.fromBase64(attachment.data.base64),
    hashAlgorithm,
    baseName,))
    return HashlinkEncoder.encode(
      BufferEncoder.fromBase64(attachment.data.base64),
      hashAlgorithm,
      baseName,
    )
  } else if (attachment.data.json) {
    return HashlinkEncoder.encode(
      JsonEncoder.toBuffer(attachment.data.json),
      hashAlgorithm,
      baseName,
    )
  } else {
    throw new Error(`Attachment: (${attachment.id}) has no data to create a link with`)
  }
}

/*
 * Checks if an attachment is a linked Attachment
 * Param attachment is the attachment that has to be validated
 * isLinkedAttachment returns a boolean whether the attachment is a linkedAttachment
 * VVV
 */
function isLinkedAttachment(attachment) {
  return HashlinkEncoder.isValid(`hl:${attachment.id}`)
}
module.exports = {
  encodeAttachment,
  isLinkedAttachment
}