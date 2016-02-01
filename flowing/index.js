(function(){

  'use strict';

  var sizes = {},
      sizeKeys;

  sizes.small1 = sizes.small2 = sizes.small3 = {
    className: 'bubble small',
    slideValue: 30,
    getPositions: function() {
      return {
        top: Math.floor(Math.random() * 200 + 10) + '%',
        left: Math.floor(Math.random() * 100 + 2) + '%'
      };
    }
  };

  sizes.medium1 = sizes.medium2 = {
    className: 'bubble midium',
    slideValue: 50,
    getPositions: function() {
      return {
        top: Math.floor(Math.random() * 200 + 10) + '%',
        left: Math.floor(Math.random() * 100 + 2) + '%'
      };
    }
  };

  sizes.large1 = {
    className: 'bubble large',
    slideValue: 70,
    getPositions: function() {
      return {
        top: Math.floor(Math.random() * 200 + 10) + '%',
        left: Math.floor(Math.random() * 100 + 2) + '%'
      };
    }
  };

  sizeKeys = Object.keys(sizes);

  //----------------------------------------------------------------------------

  function Bubble(props) {
    var className = props.className || '',
        slideValue = props.slideValue || 0,
        positions, top, left;

    if (typeof props.getPositions === 'function') {
      positions = props.getPositions();
    } else {
      positions = {
        top: 0,
        left: 0
      };
    }

    top = positions.top;
    left = positions.left;

    this.element = document.createElement('div');
    this.element.className = className;
    this.element.style.top = top;
    this.element.style.left = left;

    this.baseTop = top;
    this.baseLeft = left;
    this.slideValue = slideValue;
  }

  Bubble.prototype.animate = function() {
    Velocity(this.element, {
      translateY: 150
    }, {
      duration: 1000 * 6,
      easing: 'ease-in-out',
      loop: true
    });
  };

  //----------------------------------------------------------------------------

  var bubbleCount = 30;

  var bubbles = (function(){
    var result = [],
        i, len, sizeKey, size;

    for (i = 0, len = bubbleCount; i < len; ++i) {
      sizeKey = sizeKeys[Math.floor(Math.random() * sizeKeys.length)];
      size = sizes[sizeKey];

      result[i] = new Bubble(size);
    }

    return result;
  }());

  //----------------------------------------------------------------------------

  var db = document.body,
      dd = document.documentElement;

  window.addEventListener('scroll', function(event) {
    var scrollTop = dd.scrollTop || db.scrollTop;

    var tops = [],
        i, len, top;

    for (i = 0, len = bubbles.length; i < len; ++i) {
      top = parseFloat(bubbles[i].baseTop) - (scrollTop / bubbles[i].slideValue);
      tops[i] = top + '%';
    }

    for (i = 0, len = bubbles.length; i < len; ++i) {
      bubbles[i].element.style.top = tops[i];
    }
  }, false);

  //----------------------------------------------------------------------------

  document.addEventListener('DOMContentLoaded', function() {
    var fragment = document.createDocumentFragment(),
        i, len;

    for (i = 0, len = bubbles.length; i < len; ++i) {
      fragment.appendChild(bubbles[i].element);
    }

    document.body.appendChild(fragment);

    for (i = 0, len = bubbles.length; i < len; ++i) {
      bubbles[i].animate();
    }
  }, false);

}());
