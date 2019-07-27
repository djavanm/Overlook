class Customer {
  constructor(id, name, userBookings = [], userRoomServices = [], userRooms = []) {
    this.id = id;
    this.name = name;
    this.bookings = userBookings;
    this.roomService = userRoomServices;
    this.rooms = userRooms;
  }

  calculateBill(date) {
    let costs = this.calculateRoomCost(date) + this.calculateRoomServiceCost(date);
    return parseFloat(costs.toFixed(2));
  }

  calculateRoomCost(date) {
    if(this.bookings.find(booking => booking.date === date)) {
      let roomNum = this.bookings.find(booking => booking.date === date).roomNumber;
      let costs = this.rooms.find(room => room.number === roomNum).costPerNight;
    return parseFloat(costs.toFixed(2));
    } else {
      return 0;
    }
  };

  calculateRoomServiceCost(date) {
    if(this.roomService.find(order => order.date === date)) {
      let costs = this.roomService.reduce((totalCost, order) => {
        if(order.date === date) {
          totalCost += order.totalCost;
        }
        return totalCost;
      }, 0)
      return parseFloat(costs.toFixed(2));
      } else {
        return 0;
      }
  }
}


export default Customer;