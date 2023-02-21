/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR, WHITE_COLOR} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollview: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logoContainer: {
    width: 100,
    height: 100,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  form_container: {
    width: '80%',
  },
  button: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: PRIMARY_COLOR,
    color: WHITE_COLOR,
  },
  footer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 10,
    flex: 1,
  },
  footer_text: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#ccc',
    marginTop: 20,
  },
});

export default styles;
