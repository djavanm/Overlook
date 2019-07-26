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
    expect(hotel.bookings.findRoomServiceRevenue('2019/07/26')).to.deep.equal(495);
  });

  it('should find the percentage occupancy, given a day', () => {
    let percentage = hotel.bookings.findOccupancyPercent(hotel.today);
    expect(hotel.bookings.findOccupancyPercent(hotel.today)).to.deep.equal(percentage);
  });

  it('should find all the room service orders for a given day', () => {
    let roomService = hotel.bookings.findRoomService(hotel.today);
    expect(hotel.bookings.findRoomService(hotel.today)).to.deep.equal(roomService);
  });

  it('should find all the room service orders for all time', () => {
    let roomServiceAllTime = hotel.bookings.findTotalRoomService();
    expect(hotel.bookings.findTotalRoomService()).to.deep.equal(roomServiceAllTime);
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
  
});