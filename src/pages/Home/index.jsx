import './styles.css'
import { useState, useEffect, Fragment } from 'react';
import { Card } from '../../components/Card';
import { getUserByUserName } from '../../api/github';

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
  const [user,setUser] = useState({name:'', avatar: ''});

  function handleAddStudent() {
    const newStudent = {
      name: studentName.toLocaleUpperCase(),
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    if(students.find(element => element.name === newStudent.name.toLocaleUpperCase())){
      alert("student exists");
      return;
    }

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

  useEffect(() => {
    async function getUserByUserNameAsync() {
      const user =  await getUserByUserName({username:'AdrianLopes97'});
      console.log("user ===>",user);
      setUser({
        name: user.name,
        avatar: user.avatar
      });
    }

    getUserByUserNameAsync();
  },[]);

  return (
    <div className='qodeless'>
      <header>
        <h1>Qodeless - the 3 patetas</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='Foto de perfil'></img>
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