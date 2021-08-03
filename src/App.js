import React, {useState} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [encodedAttachments, setEncodedAttachments] = useState([])

  const handleEncodeAttachment = () => {
    axios.post('/api/attachment/encode')
    .then((res) => {
      console.log(res.data)
      setEncodedAttachments(res.data)
    })
    .catch((err) => console.log(err))
  };

  const decodeAttachments = () => {
    axios.post('/api/attachment/decode', {encodedAttachments})
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
  }

  const fetchUrl = () => {
    axios.get('/api/attachment/fetch')
    .then(res => console.log(res.data))
    .catch(err => console.log(err)) 
  }

  return (
    <div className="App">
      <button onClick={handleEncodeAttachment}>Encode Attachment</button>
      {encodedAttachments.length !== 0 ? <button onClick={decodeAttachments}>Decode Attachments</button> : null}
      <button onClick={fetchUrl} >Fetch URL</button>
    </div>
  );
}

export default App;
