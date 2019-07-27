class Bookings {
  constructor(customers, bookings, roomService, rooms, today) {
    this.customers = customers;
    this.bookings = bookings;
    this.roomService = roomService;
    this.rooms = rooms;
    this.today = today;
  }

  findAvailableRooms(day) {
  let occupiedRooms = this.bookings.filter(booking => booking.date === day).map(bookings => bookings.roomNumber)
  return this.rooms.filter(room => {
    return !occupiedRooms.includes(room.number)
    })
  };

  findRoomRevenue(day) {
    let occupiedRoomNums = this.bookings.filter(booking => booking.date === day).map(bookings => bookings.roomNumber)
    let occupiedRooms = this.rooms.filter(room => {
      return occupiedRoomNums.includes(room.number)
    });
    return parseInt(occupiedRooms.reduce((totalAmount, room) => {
      return totalAmount += room.costPerNight
    }, 0))
  }

  findRoomServiceRevenue(day) {
    return this.roomService.filter(order => order.date === day).reduce((totalAmount, order) => {
      return totalAmount += order.totalCost;
    }, 0)
  };

  findDayRevenue(day) {
    return this.findRoomRevenue(day) + this.findRoomServiceRevenue(day);
  }
};

export default Bookings;