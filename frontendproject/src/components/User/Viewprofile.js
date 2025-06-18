import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Editprofile from './Editprofile';

const Viewprofile = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [gender, setgender] = useState('');
    const [phone, setphone] = useState('');
    const [image, setimage] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const profile = async () => {
        const uid = sessionStorage.getItem('uid');
        const res = await axios.get("http://localhost:7000/user/viewprofile", { params: { uid } });
        setname(res.data.data.name);
        setemail(res.data.data.email);
        setgender(res.data.data.gender);
        setphone(res.data.data.phone);
        setimage(res.data.data.image);
    };

    useEffect(() => {
        profile();
    }, []);

    return (
        <div style={styles.profileContainer}>
            {showEdit ? (
                <Editprofile
                    name={name}
                    email={email}
                    gender={gender}
                    phone={phone}
                    image={image}
                    setname={setname}
                    setemail={setemail}
                    setgender={setgender}
                    setphone={setphone}
                    setimage={setimage}
                    setShowEdit={setShowEdit}
                />
            ) : (
                <div style={styles.profileCard}>
                    <div style={styles.imageContainer}>
                        <img 
                            src={image?.startsWith("http") ? image : `http://localhost:7000/${image}`} 
                            alt="Profile" 
                            style={styles.profileImage} 
                            crossOrigin="anonymous" 
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <h2 style={styles.profileName}>{name}</h2>
                    <p style={styles.profileText}><strong>Email:</strong> {email}</p>
                    <p style={styles.profileText}><strong>Gender:</strong> {gender}</p>
                    <p style={styles.profileText}><strong>Phone:</strong> {phone}</p>
                    <button style={styles.editBtn} onClick={() => setShowEdit(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

// Internal CSS (JS Object)
const styles = {
    profileContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    profileCard: {
        width: '320px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        textAlign: 'center',
        position: 'relative',
        animation: 'fadeIn 1s ease-in-out',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
    },
    profileImage: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid #667eea',
        transition: 'transform 0.3s ease-in-out',
    },
    profileName: {
        margin: '10px 0',
        fontSize: '22px',
        color: '#333',
    },
    profileText: {
        fontSize: '16px',
        color: '#555',
    },
    editBtn: {
        background: '#667eea',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '25px',
        color: 'white',
        cursor: 'pointer',
        transition: 'background 0.3s ease-in-out',
        marginTop: '10px',
    },
};

// Animation (Inject into Global Styles)
const globalStyles = document.createElement('style');
globalStyles.innerHTML = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(globalStyles);

export default Viewprofile;
