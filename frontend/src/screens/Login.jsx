import {Screen} from './_screen.jsx'
import {Link} from 'expo-router'

export function Login(){
  return <Screen>
    <Link href="/" style={{color: "#fff"}}>
      Volver a Welcome
    </Link>
  </Screen>
}