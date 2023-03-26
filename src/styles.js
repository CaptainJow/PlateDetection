import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  container2: {
    padding: 40,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  spinner: {
    width: 50,
    height: 50,
    borderWidth: 10,
    borderColor: '#f3f3f3',
    borderTopColor: '#383636',
    borderRadius: 25
  },
  error: {
    backgroundColor: '#cc0011',
    height: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    padding:3
  },
  imagepreviewcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 400,
    backgroundColor: "#bab5b5",
    marginVertical: 8,
    borderRadius: 8,
  },
  previewText: {
    color: '#592454',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDCDCD',
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
  },
  errorContainer: {
    backgroundColor: '#cc0011',
    height: 25,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  numberPlate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7CA18',
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  numberText: {
    flex: 1,
    textAlign: 'center',
    color: 'black'
  },
  buttonBlack: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    
    backgroundColor: 'black',
  },
  textWhite: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    flex: 1,
    textAlign: 'center',

  },
  });
  
  export default styles;
  