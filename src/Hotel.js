class Hotel {
  constructor(users, rooms, bookings, roomService) {
    this.userData = users;
    this.roomData = rooms;
    this.bookingData = bookings;
    this.roomServiceData = roomService;

  }
}

export default Hotel;