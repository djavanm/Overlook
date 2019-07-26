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
});