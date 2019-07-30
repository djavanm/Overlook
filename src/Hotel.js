import Customer from '../src/Customer.js';
import Bookings from './Bookings.js';
import DOMupdates from './DOMupdates.js';

class Hotel {
  constructor(users, rooms, bookings, roomService) {
    this.userData = users;
    this.roomData = rooms;
    this.bookingData = bookings;
    this.roomServiceData = roomService;
    this.today;
    this.customers = [];
    this.bookings;
    this.currentCustomer;
    this.menu;
  }

  open() {
    this.createDate();
    this.createMenu();
    this.createCustomers();
    this.createBookings();
    this.displayNewDay();
  };

  displayNewDay() {
    let currentOccupancy = this.bookings.findOccupancyPercent(this.today);
    let currentServiceRevenue = this.bookings.findRoomServiceRevenue(this.today);
    let currentRoomRevenue = this.bookings.findRoomRevenue(this.today);
    let todayDate = this.today;
    let availableRoomCount = this.bookings.findAvailableRooms(this.today).length;
    DOMupdates.displayDailyStats(todayDate, currentOccupancy, currentServiceRevenue, currentRoomRevenue, availableRoomCount);
    let availableRooms = this.bookings.findAvailableRooms(this.today);
    let currentRoomService = this.bookings.findDailyRoomServiceOrders(this.today)
    let bookedRooms = this.bookings.findBookedRooms(this.today);
    console.log(bookedRooms);
    DOMupdates.dailyBookings(availableRooms, this.menu, currentRoomService, bookedRooms);
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
      let userBookings = this.findUserBookings(user.id);
      let userRoomServices = this.findUserRoomService(user.id);
      let userRooms = this.findUserRooms(user.id);
      let userMenu = this.menu;
      let customer = new Customer(user.id, user.name, userBookings, userRoomServices, userRooms, userMenu, this.today);
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
    let newCustomer = new Customer(newId, name, [], [], [], this.menu, this.today)
    this.customers.push(newCustomer);
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
  };

  createMenu() {
    this.menu = this.roomServiceData.reduce((foodOptions, order) => {
      if(!foodOptions.includes(order.food)) {
        foodOptions.push({
          food: order.food,
          totalCost: order.totalCost
        })
      }
      return foodOptions;
    }, [])
  }
  
};

export default Hotel;