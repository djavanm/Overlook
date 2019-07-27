class Customer {
  constructor(id, name, userBookings = [], userRoomServices = [], userRooms = []) {
    this.id = id;
    this.name = name;
    this.bookings = userBookings;
    this.roomService = userRoomServices;
    this.rooms = userRooms;
  }

  calculateBill(date) {
    var costs = 0;
    if(this.bookings.find(booking => booking.date === date)) {
    var roomNum = this.bookings.find(booking => booking.date === date).roomNumber;
    var roomCost = this.rooms.find(room => room.number === roomNum).costPerNight;
    costs += roomCost;
    }
    if(this.roomService.find(order => order.date === date)) {
      var roomServiceCost = this.roomService.reduce((totalCost, order) => {
        if(order.date === date) {
          totalCost += order.totalCost;
        }
        return totalCost;
      }, 0)
      costs += roomServiceCost
    }
    return parseFloat(costs.toFixed(2));
  }

}

export default Customer;