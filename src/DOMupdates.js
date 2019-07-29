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
  displayCurrentCustomer(name) {
    $('.search__list').empty();
    $('.header__search-input').val('');
    $('.header__current-customer').text('Current Customer: ' + name);
    $('.main__panel-container .main__panel-tabs li.active').removeClass('active'); 
    $('.main__panel-container .panel.active').slideUp(200)
    $('.customer-tab').addClass('active');
    $('#customer').slideDown(200, function() {
      $(this).addClass('active')
    });
  }
}

export default DOMupdates;