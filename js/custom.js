(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    return $(this).each(function () {
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from: $(this).data('from') || 0,
        to: $(this).data('to'),
        speed: $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval') || 50,
        decimals: $(this).data('decimals') || 0
      }, options);

      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};

      $self.data('countTo', data);

      if (data.interval) {
        clearInterval(data.interval);
      }

      data.interval = setInterval(updateTimer, settings.refreshInterval);

      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;
        render(value);

        if (typeof settings.onUpdate === 'function') {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;

          if (typeof settings.onComplete === 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,
    to: 0,
    speed: 1000,
    refreshInterval: 100,
    decimals: 0,
    formatter: function (value, settings) {
      return value.toFixed(settings.decimals);
    },
    onUpdate: null,
    onComplete: null
  };
}(jQuery));

jQuery(function ($) {
  $('.count-number').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  });

  $('.timer').each(function () {
    var $this = $(this);
    var max = $this.data('to');
    var options = $.extend({}, $this.data('countToOptions'));

    $this.countTo($.extend({}, options, {
      onUpdate: function (value) {
        var percent = (value / max) * 100;
        var dash = (percent > 100 ? 100 : percent).toFixed(2);
        var $circle = $this.closest('.counter').find('.progress');
        $circle.attr('stroke-dasharray', `${dash}, 100`);
      }
    }));
  });
});



document.getElementById('toggleSearch').addEventListener('click', function () {
    const searchForm = document.getElementById('searchForm');
    searchForm.classList.toggle('show');
    if (searchForm.classList.contains('show')) {
        searchForm.querySelector('input').focus();
    }
});

document.getElementById('navbar-toggler').addEventListener('click', function () {
    var icon = document.querySelector('.toggle-icon');
    if (icon.classList.contains('fa-plus')) {
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-minus');
    } else {
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
    }
  });


  

  //dropdown
  const dropdown = document.querySelector('.navbar .dropdown');
  let timeout;

  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    dropdown.classList.add('show');
    dropdown.querySelector('.dropdown-menu').classList.add('show');
  });

  dropdown.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
      dropdown.classList.remove('show');
      dropdown.querySelector('.dropdown-menu').classList.remove('show');
    }, 200);
  });


    
  //logo
  window.addEventListener('load', () => {
    const logo = document.querySelector('.navbar-brand');
    logo.classList.add('animate__animated', 'animate__backInRight');
  });


