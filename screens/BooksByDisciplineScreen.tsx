import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const booksByDiscipline = ({ route }: { route: any }) => {
  const { discipline, books } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livros da disciplina: {discipline}</Text>
      <FlatList
        data={books}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text>Autor: {item.author}</Text>
            <Text>Editora: {item.publisher}</Text>
            <Text>Ano: {item.year}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default booksByDiscipline;
