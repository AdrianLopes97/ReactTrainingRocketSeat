import './styles.css'
import { useState, useEffect, Fragment } from 'react';
import { Card, CardProps } from '../../components/Card';
import { getUserByUserName, GitHubUser } from '../../api/github';


type SchoolMap = {
  schoolName: string;
  schedule: DegreMap[];
}
type DegreMap = {
  shift: string;
  degressAvailables: string[];
}

function fetchSchoolDegree() : SchoolMap{
  const degreeMap: DegreMap[] = [
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

  const schoolMap: SchoolMap = {
    schoolName: "E.E.E.M. MARGOT",
    schedule: degreeMap
  }

  return schoolMap;
}

export const Home = () => {

  const [studentName,setStudentName] = useState<string>('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const {schoolName, schedule } = fetchSchoolDegree();
  const [shifts] = useState<string[]>(["Manhã","Tarde","Noite"]);
  const [degrees, setDegrees] = useState<string[]>([]);
  const [degreeSelected, setDegreeSelected] = useState<string>('');
  const [user,setUser] = useState<GitHubUser>({} as GitHubUser);

  function handleAddStudent() {
    const newStudent:CardProps = {
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

  function handleUpdateDegree(value:string) {
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