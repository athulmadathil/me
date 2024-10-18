    // script.js
const seats = [
    { id: 'A1', taken: false },
    { id: 'A2', taken: false },
    { id: 'A3', taken: true },
    { id: 'A4', taken: false },
    { id: 'A5', taken: true },
    
    { id: 'B1', taken: false },
    { id: 'B2', taken: false },
    { id: 'B3', taken: false },
    { id: 'B4', taken: true },
    { id: 'B5', taken: false },
 ];
 
 const seatMap = document.getElementById('seatMap');
 
 function renderSeats() {
    seats.forEach(seat => {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat');
        seatDiv.textContent = seat.id;
 
        if (seat.taken) {
            seatDiv.classList.add('taken');
            seatDiv.style.cursor = 'not-allowed';
        } else {
            seatDiv.addEventListener('click', () => toggleSeatSelection(seatDiv));
        }
 
        seatMap.appendChild(seatDiv);
    });
 }
 
 let selectedSeats = [];
 
 function toggleSeatSelection(seatDiv) {
    if (seatDiv.classList.contains('selected')) {
        seatDiv.classList.remove('selected');
        selectedSeats = selectedSeats.filter(seat => seat !== seatDiv.textContent);
    } else if (selectedSeats.length < parseInt(document.getElementById('seats').value)) {
        seatDiv.classList.add('selected');
        selectedSeats.push(seatDiv.textContent);
    } else {
        alert("You can only select " + document.getElementById('seats').value + " seats.");
    }
 }
 
 document.getElementById('bookButton').addEventListener('click', function() {
    const movie = document.getElementById('movie').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
 
    if (!date || selectedSeats.length === 0 || !paymentMethod) {
        alert("Please select a date, at least one seat, and a payment method.");
        return;
    }
 
    const confirmationMessage = `
        You have successfully booked the following seats for "${movie}" on ${date} at ${time}:
        ${selectedSeats.join(', ')}
        Payment Method Selected: ${paymentMethod}
    `;
 
    const confirmationDiv = document.getElementById('confirmation');
    confirmationDiv.textContent = confirmationMessage;
    confirmationDiv.classList.remove('hidden');
 
    // Reset selections
    selectedSeats.forEach(seat => {
        const seatDiv = Array.from(seatMap.children).find(div => div.textContent === seat);
        if (seatDiv) seatDiv.classList.remove('selected');
    });
    
    // Mark selected seats as taken
    selectedSeats.forEach(seat => {
        const index = seats.findIndex(s => s.id === seat);
        if (index !== -1) seats[index].taken = true; // Mark as taken
        const seatDiv = Array.from(seatMap.children).find(div => div.textContent === seat);
        if (seatDiv) seatDiv.classList.add('taken'); // Update UI
        if (seatDiv) seatDiv.style.cursor = 'not-allowed'; // Disable further clicks
    });
 
    selectedSeats = [];
 });
 
 renderSeats();
 