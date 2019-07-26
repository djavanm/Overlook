import Customer from '../src/Customer.js';
import Bookings from './Bookings.js';

class Hotel {
  constructor(users, rooms, bookings, roomService) {
    this.userData = users;
    this.roomData = rooms;
    this.bookingData = bookings;
    this.roomServiceData = roomService;
    this.today;
    this.customers = [];
    this.bookings;
  }

  open() {
    this.createDate();
    this.createCustomers();
    this.createBookings();
  };

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
      let userBookings = this.findUserBookings(user.id);
      let userRoomServices = this.findUserRoomService(user.id);
      let userRooms = this.findUserRooms(user.id);
      let customer = new Customer(user.id, user.name, userBookings, userRoomServices, userRooms);
      this.customers.push(customer);
    });
  };

  findCustomerName(name) {
    return this.customers.find(customer => customer.name === name);
  };

  findCustomerId(id) {
    return this.customers.find(customer => customer.id === id);
  };

  addNewCustomer(name) {
    let newId = this.customers.length;
    let newCustomer = new Customer (newId, name)
  };

  findUserBookings(id) {
    return this.bookingData.filter(booking => {
      return id === booking.userID
    });
  };

  findUserRoomService(id) {
    return this.roomServiceData.filter(roomService => {
      return id === roomService.userID
    });
  };

  findUserRooms(id) {
    let bookings = this.findUserBookings(id);
    return this.roomData.filter(room => {
      let roomNumbers = bookings.map(bookings => {
        return bookings.roomNumber
        })
      return roomNumbers.includes(room.number)
    });
  };

  createBookings() {
    this.bookings = new Bookings(this.customers, this.bookingData, this.roomServiceData, this.roomData, this.today)
  }
};

export default Hotel;