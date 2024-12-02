import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BookList, Book } from '../types/BookList';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Lista de Livros'>;

const BooksScreen = () => {
  const [books, setBooks] = useState<BookList>([]);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData: BookList = require('../assets/books.json');
        setBooks(booksData);
      } catch (error) {
        console.error('Erro ao carregar os livros:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleNavigateToDiscipline = (course: string) => {
    const booksByDiscipline = books.filter((book) => book.course === course);
    navigation.navigate('BooksByDiscipline', {
      discipline: course,
      books: booksByDiscipline,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <TouchableOpacity onPress={() => handleNavigateToDiscipline(item.course)}>
              <Text style={styles.bookCourse}>{item.course}</Text>
            </TouchableOpacity>
            <Text>{item.author}</Text>
            <Text>{item.publisher}</Text>
            <Text>{item.year}</Text>
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
  bookCourse: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
});

export default BooksScreen;
