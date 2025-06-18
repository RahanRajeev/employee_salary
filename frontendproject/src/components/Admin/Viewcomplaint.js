import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


// const complaints = [
//     {
//       id: 1,
//       name: "John Doe",
//       date: "February 17, 2025",
//       image: "https://via.placeholder.com/50",
//       text: "I am facing an issue with the service provided. The response time is slow, and the quality is below expectations. Kindly look into this matter."
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       date: "February 16, 2025",
//       image: "https://via.placeholder.com/50",
//       text: "The app keeps crashing whenever I try to submit my complaint. Please fix this as soon as possible."
//     },
//     {
//       id: 3,
//       name: "Michael Johnson",
//       date: "February 15, 2025",
//       image: "https://via.placeholder.com/50",
//       text: "The service provider did not arrive on time. I had to wait for hours. This is unacceptable."
//     }
//   ];

const Viewcomplaint = () => {
  
  const [replyInputs, setReplyInputs] = useState({});

  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };




  const [viewcom, setviewcom] = useState([])

  const getdata = async () => {
    const res = await axios.get("http://localhost:7000/admin/viewcomplaint")
    console.log(res.data.data);
    setviewcom(res.data.data)
  }

  useEffect(() => {
    getdata();
  }, [])

  // const naveditpro = useNavigate()
  // const replycom =(id)=>{
  //   sessionStorage.setItem("cid",id)
  // }


  // reply


  //get
  // const [reply, setreply] = useState('')

  // const getreply=async()=>{

  //     const cid=sessionStorage.getItem('cid')
  //     const res=await axios.get("http://localhost:7000/admin/reply",{params:{cid}})
  //     console.log(res.data.reply);
  //     setreply(res.data.reply)

  // }


  // useEffect(()=>{
  //     getreply();
  // },[])



  const navcom = useNavigate()
  const sendreply = async (e, id) => {
   

    if (!replyInputs[id]) return;
    const res = await axios.post("http://localhost:7000/admin/reply_post", {
      reply: replyInputs[id],
      pid: id,
    });

    console.log(res.data.status);

    alert('replied')
    navcom('/viewcomplaint');
  };


  return (
    <>
      <style>
        {`
          body {
            background-color: #f4f7fc;
            font-family: Arial, sans-serif;
          }

          .complaints-container {
            width: 60%;
            margin: 50px auto;
          }

          .complaint-container {
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            background: #ffffff;
            margin-bottom: 20px;
          }

          .complaint-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
          }

          .user-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 15px;
          }

          .user-info {
            font-size: 16px;
            color: #333;
          }

          .complaint-text {
            font-size: 16px;
            color: #555;
            margin-bottom: 15px;
          }

          .reply-container {
            display: flex;
            align-items: center;
          }

          .reply-input {
            flex: 1;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 10px;
          }

          .reply-button {
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
          }

          .reply-button:hover {
            background: #0056b3;
          }
        `}
      </style>
      <div className="complaints-container">
        {viewcom.map((i) => (
          <div key={i._id} className="complaint-container">
            <div className="complaint-header">
              <img className="user-image" src={`http://localhost:7000/${i.userid.image}`} alt="User" />
              <div className="user-info">
                <strong>{i.userid.name}</strong><br />
                <small>{i.date}</small>
              </div>
            </div>
            <p className="complaint-text">{i.complaint}</p>
            {/* <p className="complaint-text">Reply:{i.reply}</p> */}
            {/* <div className="reply-container">
              <input type="text" className="reply-input" placeholder="Write a reply..." value={replyInputs[i._id] || ""} onChange={(e) => handleReplyChange(i._id,e.target.value)} />
              <button className="reply-button" onClick={(e) => sendreply(e,i._id)}>Reply</button>
            </div> */}


            <div className="reply-container">
              {i.reply==='pending' ?  (
                <>
                  <input
                    type="text"
                    className="reply-input"
                    placeholder="Write a reply..."
                    value={replyInputs[i._id] || ""}
                    onChange={(e) => handleReplyChange(i._id, e.target.value)}
                  />
                  <button
                    className="reply-button"
                    onClick={(e) => sendreply(e, i._id)}
                  >
                    Reply
                  </button>
                </>
              ):(
                <span className="pending-reply">Reply: {i.reply}</span>
              )}
            </div>


          </div>

        ))}
      </div>

    </>
  )
}

export default Viewcomplaint