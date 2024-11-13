import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';
import { useNavigate } from 'react-router-dom';  // Import useNavigate


const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // For loading state
    const navigate = useNavigate(); // Hook to navigate between pages

    useEffect(() => {
        if (books.length === 0) {  // Only fetch if books are empty
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
        }
    }, [books.length]);  // Dependency array ensures this effect runs only once

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');  // Clear token from localStorage
        navigate('/login');  // Redirect to Login page
    };

    return (
        <div className="container">
            <h1>Book List</h1>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button> {/* Logout Button */}

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isLoading
                ?
                <p>Loading books...</p>
                :
                <ul>
                    {books.length === 0 ? (
                        <li>No books available</li>
                    ) : (
                        books.map((book) => (
                            <li key={book.id}>
                                {book.title} by {book.author}
                            </li>
                        ))
                    )}
                </ul>}


        </div>
    );
};

export default HomePage;
