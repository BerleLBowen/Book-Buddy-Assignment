import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SingleBook({ token }) {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // This gets the ID from the URL (/books/:id)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSingleBook() {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        const result = await response.json();
        setBook(result.book);
      } catch (err) {
        setError("Could not find that book.");
      }
    }
    fetchSingleBook();
  }, [id]);

  // Function to reserve the book
  async function handleReserve() {
    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // This tells the API who is logged in
        },
        body: JSON.stringify({
          available: false,
        }),
      });
      const result = await response.json();
      
      if (result.book) {
        // Refresh the book data to show it's now reserved
        setBook(result.book);
        alert("Book reserved successfully!");
      }
    } catch (err) {
      console.error("Reservation failed", err);
    }
  }

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading book details...</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}>
      <button onClick={() => navigate("/")}>← Back to Library</button>
      
      <h2>{book.title}</h2>
      <img src={book.coverimage} alt={book.title} style={{ width: "200px" }} />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      
      <p><strong>Status:</strong> {book.available ? "Available ✅" : "Checked Out ❌"}</p>

      {/* Logic for the Reserve Button */}
      {token && (
        <button 
          disabled={!book.available} 
          onClick={handleReserve}
        >
          {book.available ? "Reserve Book" : "Already Reserved"}
        </button>
      )}

      {!token && <p><em>Please log in to reserve this book.</em></p>}
    </div>
  );
}