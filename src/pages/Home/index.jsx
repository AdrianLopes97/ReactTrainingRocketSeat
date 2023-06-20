import './styles.css'
import React, { useState } from 'react';
import { Card } from '../../components/Card';

export const Home = () => {

  const [studentName,setStudentName] = useState('');
  const [students, setStudents] = useState([]);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  return (
    <div className='qodeless'>
      <header>
        <h1>Qodeless - the 3 patetas</h1>
        <div>
          <strong>Adrian Lopes</strong>
          <img src='https://github.com/AdrianLopes97.png' alt='Foto de perfil'></img>
        </div>
      </header>
      <input 
        type="text" 
        placeholder="Digite o nome ..."
        onChange={e => setStudentName(e.target.value)}
      />
      
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student,index) => (
        <Card
          key={index}
          name={student.name} 
          time={student.time}           
        />
      ))}
    </div>
  )
}