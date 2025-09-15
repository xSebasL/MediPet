import {Screen} from './_screen.jsx'
import { Button } from '../components/Button.jsx'
import {Link} from 'expo-router'

export function Register(){
  return <Screen>
    <Link href="/" style={{color: "#fff"}}>
      Volver a Welcome
    </Link>
  </Screen>
}