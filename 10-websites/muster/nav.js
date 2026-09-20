/* Muster — active nav link helper.
   Sets aria-current="page" on the nav link matching the current page,
   so highlighting can't silently drift out of sync when a page is
   copied, renamed, or added. Runs once on load; the nav itself is
   plain <a href> links throughout, so navigation works identically
   with this script blocked or unavailable. */
(function () {
  var here = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.site-nav ul a[href]');
  for (var i = 0; i < links.length; i++) {
    var target = links[i].getAttribute('href').split('/').pop();
    if (target === here) {
      links[i].setAttribute('aria-current', 'page');
    } else {
      links[i].removeAttribute('aria-current');
    }
  }
})();
