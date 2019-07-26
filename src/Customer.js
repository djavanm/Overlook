class Customer {
  constructor(id, name, userBookings = [], userRoomServices = [], userRooms = []) {
    this.id = id;
    this.name = name;
    this.bookings = userBookings;
    this.roomService = userRoomServices;
    this.rooms = userRooms;
  }
}

export default Customer;