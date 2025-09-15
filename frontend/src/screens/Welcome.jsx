import {Screen} from './_screen.jsx'
import { Button } from '../components/Button.jsx'
import {Link} from 'expo-router'

export function Welcome(){
  return <Screen>
    <Link href="/auth/login" asChild>
      <Button>Login</Button>
    </Link>
    <Link href="/auth/register" asChild>
      <Button>Register</Button>
    </Link>
  </Screen>
}