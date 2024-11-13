import React, { useEffect, useState } from 'react';
import { getBooks, addBook, updateBook, deleteBook } from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';  // For Bootstrap Modal and Form components

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [bookToEdit, setBookToEdit] = useState(null);
    const [newBook, setNewBook] = useState({ title: '', author: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to fetch books");
                setIsLoading(false);
                console.error("Error fetching books:", err);
            }
        };

        fetchBooks();
    }, []);

    // Logout Handler
    const handleLogout = () => {
        localStorage.removeItem('token');  // Clear token from localStorage
        navigate('/');  // Navigate to Login page
    };

    // Handle adding a new book
    const handleAddBook = async () => {
        try {
            await addBook(newBook);
            setBooks([...books, newBook]);  // Update the list of books
            setNewBook({ title: '', author: '' });  // Clear input fields
            setShowModal(false);  // Close the modal
        } catch (err) {
            console.error("Error adding book:", err);
        }
    };

    // Handle updating a book
    const handleUpdateBook = async () => {
        try {
            console.log("+++", bookToEdit);
            await updateBook(bookToEdit._id, bookToEdit);
            setBooks(books.map(book => (book._id === bookToEdit._id ? bookToEdit : book)));
            setBookToEdit(null);
            setShowModal(false);  // Close the modal
        } catch (err) {
            console.error("Error updating book:", err);
        }
    };

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id);
            setBooks(books.filter(book => book.id !== id));  // Remove the book from the list
        } catch (err) {
            console.error("Error deleting book:", err);
        }
    };

    return (
        <div className="container">
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Book Manager</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add Book</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary ms-2" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <h1 className="text-center my-4">Book List</h1>

            {/* Books Table */}
            {isLoading ? (
                <p>Loading books...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={() => { setBookToEdit(book); setShowModal(true); }}>Edit</button>
                                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteBook(book.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal for Add/Edit Book */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{bookToEdit ? 'Edit Book' : 'Add Book'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="bookTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={bookToEdit ? bookToEdit.title : newBook.title}
                                onChange={(e) => (bookToEdit ? setBookToEdit({ ...bookToEdit, title: e.target.value }) : setNewBook({ ...newBook, title: e.target.value }))}
                                placeholder="Enter book title"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="bookAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                value={bookToEdit ? bookToEdit.author : newBook.author}
                                onChange={(e) => (bookToEdit ? setBookToEdit({ ...bookToEdit, author: e.target.value }) : setNewBook({ ...newBook, author: e.target.value }))}
                                placeholder="Enter author's name"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={bookToEdit ? handleUpdateBook : handleAddBook}>
                        {bookToEdit ? 'Update Book' : 'Add Book'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HomePage;
