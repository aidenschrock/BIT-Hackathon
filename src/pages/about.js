import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Images from '../images/story-roomate.jpg'

function About() {
  return (
    <div style={style.container}>
      <h2>About</h2>
      <section>
        <p>
          This project was drawn from data collected on problems people face
          living in shared spaces.
        </p>
        <h3>Team</h3>
        <ul>
          <li>Morgan</li>
          <li>Meera</li>
          <li>Aiden</li>
          <li>Joe</li>
        </ul>
        <img
          style={style.image}
          src={Image}
          alt='man exiting portal spooks alien'
        />
      </section>
    </div>
  )
}

const style = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '400px',
    margin: '2%',
  },
  link: {
    textDecoration: 'none',
  },
}

export default About
