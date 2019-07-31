import $ from 'jquery';
import './css/base.scss';
import Hotel from '../src/Hotel.js';
import Bookings from '../src/Bookings.js';
import Customer from '../src/Customer.js';
import DOMupdates from './DOMupdates';

let hotel;
Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices').then(response => response.json()),
]).then(data => hotel = new Hotel(data[0].users, data[1].rooms, data[2].bookings, data[3].roomServices))
  .then(data => hotel.open())



$(document).ready(() => {
  $('.room__booking-box').hide();
  $('.customer__unbook-box').hide();
  $('.orders__food-box').hide();
  $('.room__upgrade-box').hide();
  $('.main__panel-container .main__panel-tabs li').on('click', function() {
    $('.main__panel-container .main__panel-tabs li.active').removeClass('active'); 
    $(this).addClass('active')
    // figure out which panel to show
    let panelToShow = $(this).attr('rel');
    // hide current panel 
    $('.main__panel-container .panel.active').slideUp(300, showNextPanel) 
    // show new panel
    function showNextPanel() {
      $(this).removeClass('active');
      $('#'+panelToShow).slideDown(200, function() {
        $(this).addClass('active');
      });
    };
  });

  $('.header__search-input').on('keydown', customerSearch);

  function customerSearch() {
      let searchText = $('.header__search-input').val().toLowerCase();
      $('.header__add-customer').attr("disabled", false);
      let matches = hotel.customers.filter(customer => {
        return customer.name.toLowerCase().includes(searchText);
      })
      if(searchText.length === 0) {
        $('.header__add-customer').attr("disabled", true);
        matches = [];
        $('.search__list').empty();
      }
      DOMupdates.displaySearchResults(matches);
  }

  $('.search__list').on('click', '.search__customer', function() {
    $('.header__add-customer').attr("disabled", true);
    let currentName = this.innerText;
    hotel.currentCustomer = hotel.findCustomerName(currentName);
    let booking = hotel.currentCustomer.findTodayBooking(hotel.today);
    if(booking) {
      hotel.currentRoom = hotel.bookings.findRoom(booking.roomNumber);
    }
    DOMupdates.displayCurrentCustomer(hotel.currentCustomer.name, hotel.currentCustomer.calculateBill(hotel.today), hotel.currentCustomer.calculateRoomServiceCost(hotel.today), hotel.currentCustomer.calculateAllRoomService());
    DOMupdates.displayBookings(hotel.currentCustomer, booking);
  })

  $('.header__add-customer').on('click', function(){
    $('.header__add-customer').attr("disabled", true);
    let name = $('.header__search-input').val();
    hotel.currentCustomer = hotel.addNewCustomer(name);
    DOMupdates.displayNewCustomer(name);
    DOMupdates.displayNewCustomerShowHide();
  });

  $('.customer__book-room').on('click', function() {
    DOMupdates.jumpToCustomerBooking();
  });

  $(".room_header").on('click', function() {
    let prop = $(this).attr('data-sort');
    let newTable = hotel.bookings.sortByType(prop, hotel.today);
    DOMupdates.appendSortedRooms(newTable);
  });

  $('.available-rooms-table').on('click', '.table__room-number', function() {
    let roomNumber = parseInt($(this).attr('data-room'));
    hotel.currentRoom = hotel.bookings.findRoom(roomNumber);
    let currentRoom = hotel.currentCustomer.findTodayBooking(hotel.today);
    currentRoom ? DOMupdates.showUpgradeRoomPrompt(hotel.currentRoom) : DOMupdates.showBookRoomPrompt(hotel.currentRoom);
  });

  $('.room_booking-button').on('click', function() {
    hotel.bookings.bookRoom(hotel.currentRoom.number, hotel.today, hotel.currentCustomer);
    DOMupdates.displayCurrentCustomer(hotel.currentCustomer.name, hotel.currentCustomer.calculateBill(hotel.today), hotel.currentCustomer.calculateRoomServiceCost(hotel.today), hotel.currentCustomer.calculateAllRoomService());
    let booking = hotel.currentCustomer.findTodayBooking(hotel.today);
    DOMupdates.displayBookings(hotel.currentCustomer, booking);
    $('.room__booking-box').hide();
    hotel.displayNewDay();
  });

  $('.customer-bookings-table').on('click', '.table__room-number', function() {
    let roomNumber = parseInt($(this).attr('data-room'));
    hotel.currentDate = parseInt($(this).attr('data-date'))
    hotel.currentRoom = hotel.bookings.findRoom(roomNumber);
    DOMupdates.showUnbookWarning(hotel.currentRoom);
  });

  $('.customer__unbook-room').on('click', function() {
    hotel.bookings.unbookRoom(hotel.currentRoom.number, hotel.currentDate, hotel.currentCustomer);
    DOMupdates.displayCurrentCustomer(hotel.currentCustomer.name, hotel.currentCustomer.calculateBill(hotel.today), hotel.currentCustomer.calculateRoomServiceCost(hotel.today), hotel.currentCustomer.calculateAllRoomService());
    let booking = hotel.currentCustomer.findTodayBooking(hotel.today);
    DOMupdates.displayBookings(hotel.currentCustomer, booking);
    $('.customer__unbook-box').hide();
    hotel.displayNewDay();
  });

  $('.customer__order-room-service').on('click', function() {
    DOMupdates.jumpToOrders();
  })

  $('.today-menu-table').on('click', '.table__menu-row', function() {
    hotel.currentCustomer.currentDish = $(this).attr('data-dish');
    hotel.currentCustomer.currentPrice = $(this).attr('data-price');
    DOMupdates.showFoodLabel(hotel.currentCustomer.currentDish, hotel.currentCustomer.currentPrice)
  })

  $('.orders__food-button').on('click', function(){
    hotel.currentCustomer.orderRoomService(hotel.currentCustomer.currentDish, hotel.today);
    DOMupdates.displayCurrentCustomer(hotel.currentCustomer.name, hotel.currentCustomer.calculateBill(hotel.today), hotel.currentCustomer.calculateRoomServiceCost(hotel.today), hotel.currentCustomer.calculateAllRoomService());
    let booking = hotel.currentCustomer.findTodayBooking(hotel.today);
    DOMupdates.displayBookings(hotel.currentCustomer, booking);
    $('.customer__unbook-box').hide();
    $('.orders__food-box').hide();
    hotel.displayNewDay();
  })

  $('.customer__upgrade-room').on('click', function() {
    DOMupdates.jumpToCustomerBooking();
  })

  $('.room_upgrade-button').on('click', function() {
    let oldRoom = hotel.currentCustomer.findTodayBooking(hotel.today).roomNumber;
    hotel.bookings.upgradeRoom(oldRoom, hotel.currentRoom.number, hotel.today, hotel.currentCustomer);
    DOMupdates.displayCurrentCustomer(hotel.currentCustomer.name, hotel.currentCustomer.calculateBill(hotel.today), hotel.currentCustomer.calculateRoomServiceCost(hotel.today), hotel.currentCustomer.calculateAllRoomService());
    let booking = hotel.currentCustomer.findTodayBooking(hotel.today);
    DOMupdates.displayBookings(hotel.currentCustomer, booking);
    $('.room__upgrade-box').hide();
  })
  $('.customer__search-input').on('keypress', function(e){
    var key = e.which;
    if(key === 13) {
      let day = $('.customer__search-input').val();
      let orders = hotel.bookings.findDailyRoomServiceOrders(day);
      DOMupdates.updateOrderTable(orders);
    }
  })

  $('.customer__search-button').on('click', function () {
    let day = $('.customer__search-input').val();
      let orders = hotel.bookings.findDailyRoomServiceOrders(day);
      DOMupdates.updateOrderTable(orders);
  })
});


  
