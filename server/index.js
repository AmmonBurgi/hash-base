require('dotenv').config();
const express = require('express'),
    app = express(),
    port = 4030,
    attachmentUtil = require('./utils/attachment'),
    {MultihashEncoder} = require('./utils/MultihashEncoder'),
    base64Util = require('./utils/base64'),
    {HashlinkEncoder} = require('./utils/HashlinkEncoder'),
    MultibaseEncoderUtil = require('./utils/MultibaseEncoder'),
    JsonEncoderUtil = require('./utils/JsonEncoder'),
    BufferEncoderUtil = require('./utils/BufferEncoder')

const issuanceRequests = [
    {
        attachment: {
            id: 'ceffce22-6471-43e4-8945-b604091981c9',
            description: 'A small picture of a cat',
            filename: 'cat.png',
            mimeType: 'text/plain',
            lastmod_time: new Date(),
            byte_count: 9200,
            data: {
              json: {
                hello: 'world!',
              },
              sha256: 'zQmceRkZFodTmWAFUafpuhgQbgRyyCcuJVw8aCiYPTftu3G',
            },
        },
    },
    {
        attachment: {
            id: 'ceffce22-6471-43e4-8945-b604091981c9',
            description: 'A small picture of a cat',
            filename: 'cat.png',
            mimeType: 'text/plain',
            lastmod_time: new Date(),
            byte_count: 9200,
            data: {
              json: {
                hello: 'world!',
              },
              base64: 'aHR0cHM6Ly9oaXBzLmhlYXJzdGFwcHMuY29tL2htZy1wcm9kLnMzLmFtYXpvbmF3cy5jb20vaW1hZ2VzL2RvZy1wdXBweS1vbi1nYXJkZW4tcm95YWx0eS1mcmVlLWltYWdlLTE1ODY5NjYxOTEuanBnP2Nyb3A9MS4wMHh3OjAuNjY5eGg7MCwwLjE5MHhoJnJlc2l6ZT0xMjAwOio='
            },
        },
    },
    // {
    //     attachment: {
    //         id: 'ceffce22-6471-43e4-8945-b604091981c9',
    //         description: 'A small picture of a cat',
    //         filename: 'cat.png',
    //         mimeType: 'text/plain',
    //         lastmod_time: new Date(),
    //         byte_count: 9200,
    //         data: {
    //           json: {
    //             hello: 'world!',
    //           },
    //           sha256: '00d7b2068a0b237f14a7979bbfc01ad62f60792e459467bfc4a7d3b9a6dbbe3e',
    //         },
    //     },
    // },
]

app.use(express.json());

app.post('/api/attachment/encode', (req, res) => {
    let encodedAttachments = []

    issuanceRequests.forEach(async (issuanceRequest) => {
        if(issuanceRequest.attachment){
           encodedAttachments.push(attachmentUtil.encodeAttachment(issuanceRequest.attachment, 'sha2-256', 'base58btc', {urls: ['example.com'], contentType: 'text/plain'}))
        }
    })
    console.log(encodedAttachments)
    res.status(200).send(encodedAttachments)
})

app.post('/api/attachment/decode', (req, res) => {
  const {encodedAttachments} = req.body
  console.log(encodedAttachments)
  encodedAttachments.forEach((hashlink) => {
    console.log(HashlinkEncoder.decode(hashlink))
  })
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));