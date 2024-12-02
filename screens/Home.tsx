import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Book, BookList } from '../types/BookList';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [totalDisciplines, setTotalDisciplines] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [oldestBook, setOldestBook] = useState<Book | null>(null);
  const [newestBook, setNewestBook] = useState<Book | null>(null);

  useEffect(() => {
    // Carregando o arquivo JSON
    const fetchBooks = async () => {
      try {
        const booksData: BookList = require('../assets/books.json');

        // Total de disciplinas (únicas)
        const uniqueCourses = new Set(booksData.map((book) => book.course));
        setTotalDisciplines(uniqueCourses.size);

        // Total de livros
        setTotalBooks(booksData.length);

        // Livro mais velho
        const oldest = booksData.reduce((prev, current) =>
          prev.year < current.year ? prev : current
        );
        setOldestBook(oldest);

        // Livro mais novo
        const newest = booksData.reduce((prev, current) =>
          prev.year > current.year ? prev : current
        );
        setNewestBook(newest);
      } catch (error) {
        console.error('Erro ao carregar os livros:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bibliografia</Text>
      <View style={styles.card}>
        <Text style={styles.info}>Total de disciplinas: {totalDisciplines}</Text>
        <Text style={styles.info}>Total de livros: {totalBooks}</Text>
        {oldestBook && (
          <Text style={styles.info}>
            Livro mais velho: {oldestBook.title} ({oldestBook.year})
          </Text>
        )}
        {newestBook && (
          <Text style={styles.info}>
            Livro mais novo: {newestBook.title} ({newestBook.year})
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lista de Livros')}
      >
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;