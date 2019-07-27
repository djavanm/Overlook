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

  findOccupancyPercent(day) {
    return 100 - (this.findAvailableRooms(day).length * 2);
  }

  findDailyRoomServiceOrders(day) {
    return this.roomService.filter(order => order.date === day);
  } 

  findTotalRoomServiceRevenue() {
    return parseInt(this.roomService.reduce((total, order) => {
      return total += order.totalCost;
    }, 0));
  }

  findMostBooked() {
    let bookingTotals = this.bookings.reduce((dayTotal, order) => {
      if(!dayTotal[order.date]) {
        dayTotal[order.date] = 0;
      } 
      dayTotal[order.date]++;
      return dayTotal;
    }, {})
    return Object.keys(bookingTotals).reduce((highestBooking, date)=> {
      if(bookingTotals[date] > highestBooking.count) {
        highestBooking = {
          'date': date,
          'count': bookingTotals[date]
        }
      }
      return highestBooking;
    }, {date: '', count: 0})
  }

  findMostBooked() {
    let bookingTotals = this.bookings.reduce((dayTotal, order) => {
      if(!dayTotal[order.date]) {
        dayTotal[order.date] = 0;
      } 
      dayTotal[order.date]++;
      return dayTotal;
    }, {})
    return Object.keys(bookingTotals).reduce((highestBooking, date)=> {
      if(bookingTotals[date] > highestBooking.count) {
        highestBooking = {
          'date': date,
          'count': bookingTotals[date]
        }
      }
      return highestBooking;
    }, {date: '', count: 0})
  };

  findLeastBooked() {
    let bookingTotals = this.bookings.reduce((dayTotal, order) => {
      if(!dayTotal[order.date]) {
        dayTotal[order.date] = 0;
      } 
      dayTotal[order.date]++;
      return dayTotal;
    }, {})
    return Object.keys(bookingTotals).reduce((highestBooking, date)=> {
      if(bookingTotals[date] < highestBooking.count) {
        highestBooking = {
          'date': date,
          'count': bookingTotals[date]
        }
      }
      return highestBooking;
    }, {date: '', count: 50})
  };

  findFoodOptions() {
    return this.roomService.reduce((foodOptions, order) => {
      if(!foodOptions.includes(order.food)) {
        foodOptions.push(order.food)
      }
      return foodOptions;
    }, [])
  }

  bookRoom(roomNum, date, customer) {
    let availableRooms = this.findAvailableRooms(date).map(room => room.number);
    if(availableRooms.includes(roomNum)) {
      let newBooking = {
        'userID': customer.id,
        'date': date,
        'roomNumber': roomNum
      };
      customer.rooms.push(this.rooms.find(room => room.number === roomNum))
      customer.bookings.push(newBooking);
      this.bookings.push(newBooking);
    };
  }

  unbookRoom(roomNum, date, customer) {
    console.log(customer)
  }
  
};

export default Bookings;