$('html, body').animate(
  {
    scrollTop: $(document).height() - $(window).height()

  }, 10000, function() {
    $(this).animate({ scrollTop: 0 }, 1);
}
);