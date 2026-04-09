import { useState, useEffect } from "react";

export default function Account({ token }) {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function fetchUserData() {
      try {
        const userResponse = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const userData = await userResponse.json();
        setUser(userData);

        const reserveResponse = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const reserveData = await reserveResponse.json();
        setReservations(reserveData.reservation || []);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching account data:", error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, [token]);

  const handleReturn = async (reservationId) => {
    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        setReservations(reservations.filter((res) => res.id !== reservationId));
        alert("Book returned successfully!");
      }
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  if (!token) return <p>Please log in to view your account.</p>;
  if (loading) return <p>Loading your profile...</p>;

  return (
    <div>
      <h2>My Account</h2>
      <div style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "20px" }}>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Account Status:</strong> Active Member</p>
      </div>

      <h3>Your Reserved Books</h3>
      {reservations.length === 0 ? (
        <p>You have no books checked out.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res.id} style={{ marginBottom: "10px" }}>
              <strong>{res.title}</strong> by {res.author} 
              <button 
                onClick={() => handleReturn(res.id)} 
                style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
              >
                Return Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}