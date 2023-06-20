import './styles.css'
import { useState, useEffect, Fragment } from 'react';
import { Card } from '../../components/Card';

function fetchSchoolDegree(){
  let degreeMap = [
    {
      shift: "Manhã",
      degressAvailables:["Ensino Fundamental"]
    },
    {
      shift: "Tarde",
      degressAvailables:["Ensino Fundamental"]
    },
    {
      shift: "Noite",
      degressAvailables:["Ensino Médio","Ensino Fundamental"]
    }
  ];

  let schoolMap = {
    schoolName: "E.E.E.M. MARGOT",
    schedule: degreeMap
  }

  return schoolMap;
}

export const Home = () => {

  const [studentName,setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const {schoolName, schedule } = fetchSchoolDegree();
  const [shifts] = useState(["Manhã","Tarde","Noite"]);
  const [degrees, setDegrees] = useState([]);
  const [degreeSelected, setDegreeSelected] = useState("");

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

  function handleUpdateDegree(value) {
    let scheduleByShift = schedule.find(item => item.shift === value);
    let degreesAvailables = scheduleByShift ? scheduleByShift.degressAvailables : [];

    setDegrees([...degreesAvailables]);
  }

  useEffect(() => {
    console.log("clear students and students input");
    setStudentName('');
    setStudents([]);
  },[degrees,degreeSelected]);

  useEffect(() => {
    console.log("students updated");
  },[students]);

  return (
    <div className='qodeless'>

      <header>
        <h1>Qodeless - the 3 patetas</h1>
        <div>
          <strong>Adrian Lopes</strong>
          <img src='https://github.com/AdrianLopes97.png' alt='Foto de perfil'></img>
        </div>
      </header>

      <select onChange={e => handleUpdateDegree(e.target.value)}>
        <option>Selecione</option>
        {
          shifts.map((shift,index) => (
            <option key={index} value={shift}>{shift}</option>
          ))
        };
      </select>

      <select onChange={e => setDegreeSelected(e.target.value)}>
        {degrees.length > 0 ? 
          (
            degrees.map((degree,index) => (
              <option key={index} value={degree}>{degree}</option>
            ))
          ) :
          <option>Não possui opções</option>
        };
      </select>

      <input 
        type="text" 
        placeholder="Digite o nome ..."
        value={studentName}
        onChange={e => setStudentName(e.target.value)}
      />
      
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map((student,index) => (
          <Fragment key={index}>
            <Card
              name={student.name} 
              time={student.time}
              school={schoolName}    
            />
          </Fragment>
        ))
      }

    </div>
  )
}