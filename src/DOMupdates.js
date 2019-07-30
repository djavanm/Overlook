import $ from 'jquery';
import Hotel from './Hotel';

const DOMupdates = {
  
  displaySearchResults(matches) {
    $('.search__list').empty();
    if(matches.length > 0 && matches.length < 100) {
      let searchHtml = matches.slice(0, 10).map(match => `
      <article  class="search__customer">
      <h4>${match.name}</h4>
      </article>
      `).join('');
      $('.search__list').append(searchHtml);
    }
  },
  displayCurrentCustomer(name, bill, todayRoomService, allTimeRoomService) {
    $('.search__list').empty();
    $('.header__search-input').val('');
    $('.header__current-customer').text(`Current Customer:  ${name}`);
    $('.main__panel-container .main__panel-tabs li.active').removeClass('active'); 
    $('.main__panel-container .panel.active').hide();
    $('.customer-tab').addClass('active');
    $('#customer').slideDown(300, function() {
      $('.main__customer-total-bill').text(`Today's charges: $${bill}`);
      $('.today-room-service').text(`Today's Room Service: $${todayRoomService}`);
      $('.all-time-room-service').text(`Room Service All Time: $${allTimeRoomService}`)
      $(this).addClass('active');
    });
  },

  displayDailyStats(today, occupancy, serviceRevenue, roomRevenue, roomsAvailable) {
    $('.header__date').text(`Date: ${today}`);
    $('.main__article-day').text(`Date: ${today}`);
    $('.main__article-occupancy').text(`Occupancy: ${occupancy}%`);
    $('.main__article-service-charges').text(`Service Charges: $${serviceRevenue}`);
    $('.main__article-room-charges').text(`Room Charges: $${roomRevenue}`);
    $('.main__article-rooms-available').text(`Rooms Available: ${roomsAvailable}`);
  },
  displayBookings(customer, booking) {
    if(!booking) {
      $('.customer__book-room').attr('disabled', false);
    }
    customer.bookings.forEach(booking => {
      $('.customer-bookings-body').append(`
      <tr>
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
      </tr>
      `)
    })
    customer.roomService.forEach(order => {
      $('.current-customer-orders').append(`
      <tr>
      <td>${customer.name}</td>
      <td>${order.date}</td>
      <td>${order.food}</td>
      <td>${order.totalCost}</td>
      </tr>
      `)
    })
  },
  dailyBookings(availableRooms, menu, roomService, bookedRooms) {
    availableRooms.forEach(room => {
      $('.available-rooms-body').append(`
      <tr>
        <td>${room.number}</td>
        <td>${room.roomType}</td>
        <td>${room.bidet}</td>
        <td>${room.bedSize}</td>
        <td>${room.numBeds}</td>
        <td>${room.costPerNight}</td>
      </tr>
      `)
    })
    menu.forEach(dish => {
      $('.today-menu-body').append(`
      <tr>
        <td>${dish.food}</td>
        <td>${dish.totalCost}</td>
      </tr>
      `)
    })
    roomService.forEach(order => {
      $('.customer-orders-body').append(`
      <tr>
        <td>${order.userID}</td>
        <td>${order.date}</td>
        <td>${order.food}</td>
        <td>${order.totalCost}</td>
      </tr>
      `)
    })
    bookedRooms.forEach(booking => {
      $('.all-bookings-body').append(`
      <tr>
        <td>${booking.roomNumber}</td>
        <td>${booking.date}</td>
      </tr>
      `)
    })
  }
}

export default DOMupdates;