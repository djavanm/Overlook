import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel.js';
import Customer from '../src/Customer.js';
import data from '../data/data.js'
import spies from 'chai-spies';
import DOMupdates from '../src/DOMupdates.js';
import Bookings from '../src/Bookings.js';
chai.use(spies);

chai.spy.on(DOMupdates, ['bookingsSample'], () => {});


  describe('Bookings', () => {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(data.users, data.rooms, data.bookings, data.roomServices);
    hotel.open();
  });

  it('should be a function that instantiates hotel bookings', () => {
    expect(Bookings).to.be.a('function');
    expect(hotel.bookings).to.be.an.instanceof(Bookings);
  });

  it('should find all available rooms for today', () => {
    let rooms = hotel.bookings.findAvailableRooms('2019/07/26');
    expect(hotel.bookings.findAvailableRooms('2019/07/26')).to.deep.equal(rooms);
  });

  it('should find the room revenue for a given day', () => {
    expect(hotel.bookings.findRoomRevenue('2019/07/26')).to.deep.equal(495);
  });

  it('should find the room service revenue for a given day', () => {
    expect(hotel.bookings.findRoomServiceRevenue('2019/07/29')).to.deep.equal(32.23);
  });

  it('should find the total revenue for a given day', () => {
    expect(hotel.bookings.findDayRevenue('2019/07/26')).to.deep.equal(495);
  });

  it('should find the percentage occupancy, given a day', () => {
    expect(hotel.bookings.findOccupancyPercent('2019/07/26')).to.deep.equal(4);
  });

  it('should find all the room service orders for a given day', () => {
    let roomService = hotel.bookings.findDailyRoomServiceOrders('2019/07/29');
    expect(hotel.bookings.findDailyRoomServiceOrders('2019/07/29')).to.deep.equal(roomService);
  });

  it('should find all the room service orders for all time', () => {
    expect(hotel.bookings.findTotalRoomServiceRevenue()).to.deep.equal(781);
  });

  it('should find the most popular day', () => {
    let mostBookings = hotel.bookings.findMostBooked();
    expect(hotel.bookings.findMostBooked()).to.deep.equal(mostBookings);
  });
  
  it('should find the least popular day', () => {
    let leastBookings = hotel.bookings.findLeastBooked();
    expect(hotel.bookings.findLeastBooked()).to.deep.equal(leastBookings);
  });

  it('should find all of the hotel food options', () => {
    let foodOptions = hotel.bookings.findFoodOptions();
    expect(hotel.bookings.findFoodOptions()).to.deep.equal(foodOptions);
  });

  it('should be able to book a new room', () => {
    hotel.currentCustomer = hotel.customers[0];
    expect(hotel.customers[0].rooms.length).to.equal(0);
    expect(hotel.currentCustomer.rooms.length).to.equal(0);
    hotel.bookings.bookRoom(25, '2019/07/29', hotel.currentCustomer);
    expect(hotel.customers[0].rooms.length).to.equal(1);
    expect(hotel.customers[0].bookings.length).to.deep.equal(1)
  });

  it('should be able cancel a booking', () => {
    hotel.currentCustomer = hotel.customers[3];
    expect(hotel.customers[3].rooms.length).to.equal(1);
    expect(hotel.customers[3].bookings.length).to.equal(1);
    hotel.bookings.unbookRoom(5, '2019/10/19', hotel.currentCustomer);
    expect(hotel.customers[3].rooms.length).to.equal(0);
    expect(hotel.customers[3].bookings.length).to.equal(0);
  });

  it('should be able to upgrade a booking', () => {
    hotel.currentCustomer = hotel.customers[8];
    expect(hotel.customers[8].rooms.length).to.equal(1);
    expect(hotel.customers[8].bookings.length).to.equal(1);
    hotel.bookings.upgradeRoom(7, 40, '2019/09/01', hotel.currentCustomer);
    expect(hotel.customers[8].rooms.length).to.equal(1);
    expect(hotel.customers[8].bookings.length).to.equal(1);
    expect(hotel.currentCustomer.rooms[0].number).to.equal(40);
  });
});