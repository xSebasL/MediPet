import {Text, View} from 'react-native';
import {Button} from '../components/Button';
import {Screen} from './_screen';
import {Link} from 'expo-router';

export function Home(){
  return <Screen>
    <Link href='/main/pets' asChild>
      <Button>Mis mascotas</Button>
    </Link>
  </Screen>
}
