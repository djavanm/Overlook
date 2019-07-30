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
  .then(data => console.log(hotel));



$(document).ready(() => {
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
    console.log(this);
    $('.header__add-customer').attr("disabled", true);
    let currentName = this.innerText;
    hotel.currentCustomer = hotel.findCustomerName(currentName);
    DOMupdates.displayCurrentCustomer(hotel.currentCustomer.name, hotel.currentCustomer.calculateBill(hotel.today));
    console.log(hotel.currentCustomer);
    DOMupdates.displayBookings(hotel.currentCustomer);
  })

  $('.header__add-customer').on('click', function(){
    $('.header__add-customer').attr("disabled", true);
    let name = $('.header__search-input').val();
    hotel.addNewCustomer(name);
    DOMupdates.displayCurrentCustomer(name, hotel.currentCustomer.calculateBill(hotel.today));
  });
});


  
