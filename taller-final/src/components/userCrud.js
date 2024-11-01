import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        setUsers(userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (newUser.trim() === '') {
      alert('El nombre del usuario no puede estar vacío');
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'users'), { name: newUser });
      setUsers([...users, { id: docRef.id, name: newUser }]);
      setNewUser('');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  const handleUpdateUser = async (id, updatedName) => {
    if (updatedName.trim() === '') {
      alert('El nombre del usuario no puede estar vacío');
      return;
    }
    try {
      const userDoc = doc(db, 'users', id);
      await updateDoc(userDoc, { name: updatedName });
      setUsers(users.map(user => (user.id === id ? { ...user, name: updatedName } : user)));
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const userDoc = doc(db, 'users', id);
      await deleteDoc(userDoc);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <input
        type="text"
        placeholder="Nuevo usuario"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button onClick={handleAddUser}>Agregar Usuario</button>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => {
                const updatedName = prompt('Nuevo nombre:', user.name);
                if (updatedName) handleUpdateUser(user.id, updatedName);
              }}>
                Actualizar
              </button>
              <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserCrud;
