import Customer from '../src/Customer.js';

class Hotel {
  constructor(users, rooms, bookings, roomService) {
    this.userData = users;
    this.roomData = rooms;
    this.bookingData = bookings;
    this.roomServiceData = roomService;
    this.today;
    this.customers = [];
  }

  createDate() {
    let date = new Date(),
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    this.today = [year, month, day].join('/');
  };

  createCustomers() {
    this.userData.forEach(user => {
      let userBookings = this.bookingData.filter(booking => {
        return user.id === booking.userID
      });
      let userRoomServices = this.roomServiceData.filter(roomService => {
        return user.id === roomService.userID
      });
      let userRooms = this.roomData.filter(room => {
        let roomNumbers = userBookings.map(bookings => {
          return bookings.roomNumber
          })
        return roomNumbers.includes(room.number)
      })
      let customer = new Customer(user.id, user.name, userBookings, userRoomServices, userRooms);

      this.customers.push(customer);
    })
  };
};

  export default Hotel;