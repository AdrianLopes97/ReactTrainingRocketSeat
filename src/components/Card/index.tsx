import './styles.css'

export type CardProps = {
  name:  string;
  school?:  string;
  time:  string;
}

export function Card(props: CardProps){
  return(
    <div className='card'>
      <strong> { props.name } - { props.school } </strong>
      <small> { props.time } </small>
    </div>
  )
}