import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';

const Viewreply = () => {
  const [complaints, setComplaints] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const uid = sessionStorage.getItem('uid');
                const res = await axios.get("http://localhost:7000/user/viewreply", { params: { uid } });

                console.log("API Response:", res.data);

                if (res.data.data && Array.isArray(res.data.data)) {
                    res.data.data.forEach(complaint => {

                        console.log("Complaint User ID:", res.data);
                        console.log("User Image:", complaint.userid.image); // Debugging image
                    });
    
                    setComplaints(res.data.data);
                } else {
                    setComplaints([]); 
                }
            } catch (error) {
                console.error("Error fetching complaints:", error);
                setComplaints([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Your Complaints & Replies</h2>

            {loading ? (
                <p style={styles.loading}>Loading...</p>
            ) : complaints.length > 0 ? (
                <div style={styles.complaintList}>
                    {complaints.map((complaint, index) => (
                        <div key={index} style={styles.complaintCard}>
                            <div style={styles.userSection}>
                            <img 
    src={complaint.userid?.image 
        ? `http://localhost:7000/${complaint.userid.image}` 
        : "https://dummyimage.com/150x150/cccccc/ffffff.png&text=No+Image"} 
    alt="User" 
    style={styles.userIcon} 
/>
                                <p style={styles.username}>You</p>
                            </div>
                            <p style={styles.complaintText}><strong>Complaint:</strong> {complaint.complaint}</p>

                            {complaint.reply ? (
                                <div style={styles.replySection}>
                                    
                                    <p style={styles.adminText}><strong>Reply:</strong> {complaint.reply}</p>
                                </div>
                            ) : (
                                <p style={styles.pendingReply}>Awaiting response...</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p style={styles.noComplaints}>No complaints found.</p>
            )}
        </div>
    );
};

// ✅ **Styles**
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: '#fff',
        padding: '20px',
    },
    title: {
        fontSize: '26px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    loading: {
        fontSize: '18px',
        color: '#ffcc00',
    },
    complaintList: {
        width: '90%',
        maxWidth: '600px',
    },
    complaintCard: {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '15px',
        marginBottom: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.3s ease-in-out',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    userIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    username: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    complaintText: {
        fontSize: '16px',
        marginBottom: '10px',
    },
    replySection: {
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.3)',
        padding: '10px',
        borderRadius: '8px',
    },
    adminIcon: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    adminText: {
        fontSize: '16px',
    },
    pendingReply: {
        fontSize: '14px',
        fontStyle: 'italic',
        color: '#ffcc00',
    },
    noComplaints: {
        fontSize: '18px',
        color: '#eee',
    },
};



export default Viewreply