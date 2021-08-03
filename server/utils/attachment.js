const {BufferEncoder} = require('./BufferEncoder')
const {HashlinkEncoder} = require('./HashlinkEncoder')
const fetch = require('node-fetch');
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

const encodeAttachment = (attachment, hashAlgorithm, baseName, metadata) => {
  if (attachment.data.sha256) {
    return `hl:${attachment.data.sha256}`
  } else if (attachment.data.base64) {
    return HashlinkEncoder.encode(
      BufferEncoder.fromBase64(attachment.data.base64),
      hashAlgorithm,
      baseName,
      metadata
    )
  } else if (attachment.data.link) {
    //@hashURL Fetch a url attachment and encode it into a hashlink.
    const {link} = attachment.data
    async function hashURL(){
      const response = await fetch(link);
      const buffer = await response.buffer();
      return HashlinkEncoder.encode(buffer, 'sha2-256', 'base58btc', metadata);
    }
    // async function hashMultipleURL(){
    //   const buffers = await Promise.all(urls.map(async url => {
    //     const resp = await fetch(url);
    //     return await resp.buffer();
    //   }));
    //   const buffersMap = buffers.map(buffs => {
    //     return HashlinkEncoder.encode(buffs, 'sha2-256', 'base58btc')
    //   })
    //   return buffersMap
    // }
    return hashURL();
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