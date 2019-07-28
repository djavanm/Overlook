import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel.js';
import Customer from '../src/Customer.js';
import data from '../data/data.js'
import spies from 'chai-spies';
import DOMupdates from '../src/DOMupdates.js';
import Bookings from '../src/Bookings.js';
chai.use(spies);
chai.spy.on(DOMupdates, ['customerSample'], () => {});


  describe('Customer', () => {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(data.users, data.rooms, data.bookings, data.roomServices);
    hotel.open();
  });

  it('should be a function that will create an instance of customer', () => {
    expect(Customer).to.be.a('function');
    expect(hotel.customers[0]).to.be.an.instanceof(Customer);
  });

  it('should be able to return total costs, given a date', () => {
    hotel.currentCustomer = hotel.customers[4];
    hotel.bookings.bookRoom(40, '2019/09/08', hotel.currentCustomer);
    expect(hotel.customers[4].calculateBill('2019/09/08')).to.equal(359.21);
  });

  it('should be able to calculate all room costs for all time', () => {
    hotel.currentCustomer = hotel.customers[4];
    hotel.bookings.bookRoom(40, '2019/09/08', hotel.currentCustomer);
    let costs = hotel.customers[4].calculateAllBookings();
    expect(costs).to.equal(702.75);
  })

  it('should be able to calculate all room service orders for all time', () => {
    hotel.currentCustomer = hotel.customers[11];
    let costs = hotel.currentCustomer.calculateAllRoomService();
    expect(costs).to.equal(12.32)
  })

  it('should be able to calculate all charges for all time', () => {
    hotel.currentCustomer = hotel.customers[12];
    hotel.bookings.bookRoom(45, '2019/09/09', hotel.currentCustomer);
    hotel.bookings.bookRoom(2, '2019/09/10', hotel.currentCustomer);
    let costs = hotel.currentCustomer.calculateAllCosts();
    expect(costs).to.equal(894.7)
  })

  it('should be able to order room service', () => {
    hotel.currentCustomer = hotel.customers[15];  
    hotel.currentCustomer.orderRoomService('Generic Wooden Sandwich');
    let newOrder = hotel.currentCustomer.roomService[1];
    expect(newOrder.food).to.equal('Generic Wooden Sandwich');
  })

});