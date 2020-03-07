import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('Dota2HeroFavoritor', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('Dota2HeroFavoritor', { rootTag });
}
