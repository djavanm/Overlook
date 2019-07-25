import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel.js';
import data from '../data/data.js'
import spies from 'chai-spies';
import DOMupdates from '../src/DOMupdates.js';
chai.use(spies);
chai.spy.on(DOMupdates, ['sample'], () => {});

describe('Hotel', () => {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(data.users, data.rooms, data.bookings, data.roomService);
    console.log(hotel)
  });

  it('should be a function that instantiates a game', () => {
    expect(Hotel).to.be.a('function');
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should hold all of the fetched data', () => {
    expect(hotel.userData).to.deep.equal(data.users);
    expect(hotel.roomData).to.deep.equal(data.rooms);
    expect(hotel.bookingData).to.deep.equal(data.bookings);
    expect(hotel.roomService).to.deep.equal(data.roomService);
  });
});