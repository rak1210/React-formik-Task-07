import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Dashboard.css';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [editAuthor, setEditAuthor] = useState(null);


  const bookValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    publicationDate: Yup.date().required('Publication date is required').nullable(),
  });

  const authorValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    birthDate: Yup.date().required('Birth date is required').nullable(),
    biography: Yup.string().required('Biography is required'),
  });

  const handleBookSubmit = (values, { setSubmitting, resetForm }) => {

    if (editBook) {
      const updatedBooks = books.map(book => (book.id === editBook.id ? { ...editBook, ...values } : book));
      setBooks(updatedBooks);
      setEditBook(null);
    } else {
      const newBook = { ...values, id: Date.now().toString() };
      setBooks([...books, newBook]);
    }
    resetForm();
    setSubmitting(false);
  };

  const handleAuthorSubmit = (values, { setSubmitting, resetForm }) => {

    if (editAuthor) {
      const updatedAuthors = authors.map(author => (author.id === editAuthor.id ? { ...editAuthor, ...values } : author));
      setAuthors(updatedAuthors);
      setEditAuthor(null); 
    } else {
      const newAuthor = { ...values, id: Date.now().toString() };
      setAuthors([...authors, newAuthor]);
    }
    resetForm();
    setSubmitting(false);
  };

  const handleEditBook = (book) => {
    setEditBook(book);
  };

  const handleEditAuthor = (author) => {
    setEditAuthor(author);
  };

  const handleDeleteBook = (bookId) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
  };

  const handleDeleteAuthor = (authorId) => {
    const updatedAuthors = authors.filter(author => author.id !== authorId);
    setAuthors(updatedAuthors);
  };

  return (
    <div className="dashboard-container">
      <div className="books-section">
        <h2>Books</h2>
        <Formik
          initialValues={{
            title: editBook ? editBook.title : '',
            author: editBook ? editBook.author : '',
            isbn: editBook ? editBook.isbn : '',
            publicationDate: editBook ? editBook.publicationDate : undefined
          }}
          validationSchema={bookValidationSchema}
          onSubmit={handleBookSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label>Title:</label>
                <Field type="text" name="title" className="form-control" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Author:</label>
                <Field type="text" name="author" className="form-control" />
                <ErrorMessage name="author" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>ISBN:</label>
                <Field type="text" name="isbn" className="form-control" />
                <ErrorMessage name="isbn" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Publication Date:</label>
                <Field type="date" name="publicationDate" className="form-control" />
                <ErrorMessage name="publicationDate" component="div" className="error" />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {editBook ? 'Update Book' : 'Add Book'}
              </button>
            </Form>
          )}
        </Formik>
  
      {books.map(book => (
        <div key={book.id} className="individual-details">
          <h3>Book Details</h3>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Publication Date:</strong> {book.publicationDate}</p>
          <button onClick={() => handleEditBook(book)} className="btn btn-sm btn-primary">Edit</button>
          <button onClick={() => handleDeleteBook(book.id)} className="btn btn-sm btn-danger">Delete</button>
        </div>
      ))}
      </div>



      <div className="authors-section">
        <h2>Authors</h2>
        <Formik
          initialValues={{
            name: editAuthor ? editAuthor.name : '',
            birthDate: editAuthor ? editAuthor.birthDate : undefined,
            biography: editAuthor ? editAuthor.biography : ''
          }}
          validationSchema={authorValidationSchema}
          onSubmit={handleAuthorSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label>Name:</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Birth Date:</label>
                <Field type="date" name="birthDate" className="form-control" />
                <ErrorMessage name="birthDate" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Biography:</label>
                <Field as="textarea" name="biography" className="form-control" />
                <ErrorMessage name="biography" component="div" className="error" />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {editAuthor ? 'Update Author' : 'Add Author'}
              </button>
            </Form>
          )}
        </Formik>
      {authors.map(author => (
        <div key={author.id} className="individual-details">
          <h3>Author Details</h3>
          <p><strong>Name:</strong> {author.name}</p>
          <p><strong>Birth Date:</strong> {author.birthDate}</p>
          <p><strong>Biography:</strong> {author.biography}</p>
          <button onClick={() => handleEditAuthor(author)} className="btn btn-sm btn-primary">Edit</button>
          <button onClick={() => handleDeleteAuthor(author.id)} className="btn btn-sm btn-danger">Delete</button>
        </div>
      ))}
      </div>


    </div>
  );
};

export default Dashboard;