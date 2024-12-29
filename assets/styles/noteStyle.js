import { StyleSheet } from 'react-native';

export const noteStyle = StyleSheet.create({
  itemContainer: {
    margin: 10,
    padding: 13,
    backgroundColor: '#36363FFF',
    borderRadius: 10,
  },
  addItemContainer: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#272730',
    padding: 20,
    zIndex: 10,
  },
  input: {
    fontSize: 22,
    marginVertical: 15,
    color: '#fff',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    borderColor: '#ccc',
  },
});
