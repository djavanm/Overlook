import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel.js';
import Customer from '../src/Customer.js';
import data from '../data/data.js'
import spies from 'chai-spies';
import DOMupdates from '../src/DOMupdates.js';
chai.use(spies);
chai.spy.on(DOMupdates, ['sample'], () => {});

describe('Hotel', () => {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(data.users, data.rooms, data.bookings, data.roomServices);
  });

  it('should be a function that instantiates a game', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should hold all of the fetched data', () => {
    expect(hotel.userData).to.deep.equal(data.users);
    expect(hotel.roomData).to.deep.equal(data.rooms);
    expect(hotel.bookingData).to.deep.equal(data.bookings);
    expect(hotel.roomServiceData).to.deep.equal(data.roomServices);
  });

  it('should be find the date for today', () => {
    hotel.createDate();
    expect(hotel.today).to.deep.equal('2019/07/26'); 
  });

  it('should find user booking data', () => {
    expect(hotel.findUserBookings(4)).to.deep.equal([{
      userID: 4,
      date: "2019/10/19",
      roomNumber: 5
      }]);
  });

  it('should find user room service data', () => {
    expect(hotel.findUserRoomService(14)).to.deep.equal([{
      userID: 14,
      date: "2019/07/29",
      food: "Rustic Concrete Sandwich",
      totalCost: 14.9
      }]);
  });

  it('should find user rooms', () => {
    expect(hotel.findUserRooms(18)).to.deep.equal([{
      number: 36,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 458.41
      }]);
  });

  it('should instantiate all users as customers', () => {
    hotel.createCustomers();
    expect(hotel.userData.length).to.equal(hotel.customers.length); 
  });

  it('should be able to return a specific customer via id', () => {
    hotel.createCustomers();
    expect(hotel.findCustomerName('Matilde Larson')).to.deep.equal(hotel.customers[0]); 
  });

  it('should be able to return a specific customer via id', () => {
    expect(hotel.findCustomerId(1)).to.deep.equal(hotel.customers[0]); 
  });

  it('should be able to add a new customer', () => {
    expect(hotel.addNewCustomer('Djavan Munroe')).to.deep.equal(hotel.customers[hotel.customers.length-1]); 
  });

});