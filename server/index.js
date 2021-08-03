require('dotenv').config();
const express = require('express'),
    app = express(),
    port = 4030,
    attachmentUtil = require('./utils/attachment'),
    {MultihashEncoder} = require('./utils/MultihashEncoder'),
    base64Util = require('./utils/base64'),
    {HashlinkEncoder} = require('./utils/HashlinkEncoder'),
    {MultibaseEncoder} = require('./utils/MultibaseEncoder'),
    {JsonEncoder} = require('./utils/JsonEncoder'),
    {BufferEncoder} = require('./utils/BufferEncoder'),
    fetch = require('node-fetch')
  
const {sha256} = require('js-sha256')

let issuanceRequests = [
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
    {
        attachment: {
            id: 'ceffce22-6471-43e4-8945-b604091981c9',
            description: 'A small picture of a cat',
            filename: 'cat.png',
            mimeType: 'text/plain',
            lastmod_time: new Date(),
            byte_count: 9200,
            data: {
              link: 'https://drive.google.com/file/d/1okUGQxNRNZGgHuzNCt6hBzP_KYT-f9MZ/view'
            },
        },
    },
]

const credentials = [
  {
    data: {
      json: {
        values: {
          picture: {
            encoded: ''
          }
        }
      }
    }
  },
  {
    data: {
      json: {
        values: {
          picture: {
            encoded: ''
          }
        }
      }
    }
  },
  {
    data: {
      json: {
        values: {
          picture: {
            encoded: ''
          }
        }
      }
    }
  }
]

app.use(express.json());

app.post('/api/attachment/encode', async (req, res) => {
    for (let i = 0; i < issuanceRequests.length; i++) {
      const issuanceRequest = issuanceRequests[i]
      if(issuanceRequest.attachment){
        const resp = await attachmentUtil.encodeAttachment(issuanceRequest.attachment, 'sha2-256', 'base58btc', {urls: ['example.com'], contentType: 'text/plain'})
        const hash = resp.split(':')
        issuanceRequest.attachment.id = hash[2] ? `${hash[1]}:${hash[2]}` : hash[1]
      }
    }

    for(let i = 0; i < credentials.length; i++){
      
    }

  console.log("ENCODED:", issuanceRequests)
  res.status(200).send(issuanceRequests)
})

app.post('/api/attachment/decode',(req, res) => {
  const {encodedAttachments} = req.body
  const decodedObjects = encodedAttachments.map((hashlink) => {
   return HashlinkEncoder.decode(hashlink)
  });
  const {data} = MultibaseEncoder.decode(decodedObjects[1].checksum)
  const multihash = new TextDecoder().decode(data)
  console.log(multihash.toString())
  res.status(200).send(multihash)
})

app.get('/api/attachment/fetch', async (req, res) => {
  const responseOne = await fetch('https://drive.google.com/file/d/1okUGQxNRNZGgHuzNCt6hBzP_KYT-f9MZ/view');
  const bufferOne = await responseOne.buffer();

  const responseTwo = await fetch('https://drive.google.com/file/d/1TPq5_yi8x3zCbKr8vQxmMsxctPrkFz2j/view');
  const bufferTwo = await responseTwo.buffer();

  const responseThree = await fetch('https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw3eIjJyxdI35eCGfWqzwRSV&ust=1628019569047000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJCy4tKLk_ICFQAAAAAdAAAAABAD');
  const bufferThree = await responseThree.buffer();
  console.log([responseOne, responseTwo, responseThree])
  const hashOne = HashlinkEncoder.encode(bufferOne, 'sha2-256', 'base58btc')
  const hashTwo = HashlinkEncoder.encode(bufferTwo, 'sha2-256', 'base58btc')
  const hashThree = HashlinkEncoder.encode(bufferThree, 'sha2-256', 'base58btc')
  console.log(HashlinkEncoder.encode(bufferTwo, 'sha2-256', 'base58btc') ===  HashlinkEncoder.encode(bufferOne, 'sha2-256', 'base58btc'));

  res.status(200).send({hashOne, hashTwo, hashThree});
})


app.listen(port, () => console.log(`Server is listening on port ${port}`))