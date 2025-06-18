import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit } from 'lucide-react';

const Viewcategory = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editedName, setEditedName] = useState('');

    // Fetch categories on component load
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('https://employee-salary-1.onrender.com/admin/viewcategory');
            setCategories(res.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Delete category
    const deleteCategory = async (id) => {
       
            const res=await axios.get(`https://employee-salary-1.onrender.com/admin/deletecat/${id}`);
        

        if(res.data.status==='ok'){
            fetchCategories();
            
        }
    };

    // Start editing
    const startEdit = (category) => {
        setEditingCategory(category);
        setEditedName(category.category);
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingCategory(null);
        setEditedName('');
    };

    // Update category
    const updateCategory = async () => {
        try {
            const res = await axios.post('http://localhost:7000/admin/editcategory', {
                uid: editingCategory._id,
                editname: editedName
            });
    
            if (res.data.status === 'edit') {
                setEditingCategory(null);
                setEditedName('');
                fetchCategories();
            } else {
                console.error('Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };
    
    
    // Internal CSS styles
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '30px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center'
        },
        list: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        },
        item: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '5px',
            border: '1px solid #ddd'
        },
        actions: {
            display: 'flex',
            gap: '8px'
        },
        editInput: {
            flex: 1,
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px'
        },
        button: {
            padding: '6px 12px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px'
        },
        saveButton: {
            backgroundColor: '#4CAF50',
            color: 'white'
        },
        cancelButton: {
            backgroundColor: '#f44336',
            color: 'white'
        },
        iconButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#555'
        }
    };
  return (
    <>
         <div style={styles.container}>
            <h2 style={styles.title}>Manage Categories</h2>

            <div style={styles.list}>
                {categories.map((cat) => (
                    <div key={cat._id} style={styles.item}>
                        {editingCategory && editingCategory._id === cat._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    style={styles.editInput}
                                />
                                <div style={styles.actions}>
                                    <button onClick={updateCategory} style={{ ...styles.button, ...styles.saveButton }}>Save</button>
                                    <button onClick={cancelEdit} style={{ ...styles.button, ...styles.cancelButton }}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span>{cat.category}</span>
                                <div style={styles.actions}>
                                    <button onClick={() => startEdit(cat)} style={styles.iconButton}>
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => deleteCategory(cat._id)} style={styles.iconButton}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Viewcategory