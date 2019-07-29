import $ from 'jquery';

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
  displayCurrentCustomer(name, bill) {
    $('.search__list').empty();
    $('.header__search-input').val('');
    $('.header__current-customer').text(`Current Customer:  ${name}`);
    $('.main__panel-container .main__panel-tabs li.active').removeClass('active'); 
    $('.main__panel-container .panel.active').hide();
    $('.customer-tab').addClass('active');
    $('#customer').slideDown(300, function() {
      $('.main__customer-total-bill').text(`Today's charges: $${bill}`)
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
  }
}

export default DOMupdates;