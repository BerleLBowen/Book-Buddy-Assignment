import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books");
        const result = await response.json();
        
        setBooks(result.books || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <h2 style={{ textAlign: 'center' }}>Loading the library...</h2>;

  return (
    <div>
      <h2>Library Catalog</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search for a book..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '300px', padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="books-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img 
                src={book.coverimage} 
                alt={book.title} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} 
              />
              <h3>{book.title}</h3>
              <p><em>by {book.author}</em></p>
              <p style={{ color: book.available ? 'green' : 'red', fontWeight: 'bold' }}>
                {book.available ? "Available" : "Checked Out"}
              </p>
              <button onClick={() => navigate(`/books/${book.id}`)}>
                Show Details
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No books found matching that title.</p>
        )}
      </div>
    </div>
  );
}