(function(){

  'use strict';

  var sizes = {},
      sizeKeys;

  sizes.small1 = sizes.small2 = sizes.small3 = {
    className: 'bubble small',
    flowSpeed: 2,
    getPositions: function() {
      return {
        top: Math.floor(Math.random() * 80 + 101) + '%',
        left: Math.floor(Math.random() * 100 + 2) + '%'
      };
    }
  };

  sizes.medium1 = sizes.medium2 = {
    className: 'bubble midium',
    flowSpeed: 3,
    getPositions: function() {
      return {
        top: Math.floor(Math.random() * 50 + 101) + '%',
        left: Math.floor(Math.random() * 100 + 2) + '%'
      };
    }
  };

  sizes.large1 = {
    className: 'bubble large',
    flowSpeed: 5,
    getPositions: function() {
      return {
        top: Math.floor(Math.random() * 50 + 101) + '%',
        left: Math.floor(Math.random() * 100 + 2) + '%'
      };
    }
  };

  sizeKeys = Object.keys(sizes);

  //----------------------------------------------------------------------------

  function Bubble(props) {
    var className = props.className || '',
        flowSpeed = props.flowSpeed || 0,
        positions;

    this.element = document.createElement('div');
    this.element.className = className;

    if (typeof props.getPositions === 'function') {
      this.getPositions = props.getPositions;
    } else {
      this.getPositions = function() {
        return {
          top: 0,
          left: 0
        };
      };
    }

    this.resetPosition();

    this.flowSpeed = flowSpeed;
  }

  Bubble.prototype.animate = function() {
    var that = this,
        offsetTop, scrollHeight;

    offsetTop = that.element.offsetTop;
    scrollHeight = that.element.scrollHeight;

    Velocity(that.element, {
      opacity: [1, 'easeOutExpo'],
      translateY: - (offsetTop + scrollHeight)
    }, {
      complete: function() {
        that.complete();
        that = null;
      },
      duration: (offsetTop + scrollHeight) * that.flowSpeed,
      display: 'none',
      easing: 'linear',
      queue: false,
    });
  };

  Bubble.prototype.complete = function() {
    var that = this;

    Velocity(that.element, {
      opacity: 0,
      translateY: 0
    }, {
      complete: function() {
        that.resetPosition();
        that.animate();
        that = null;
      },
      duration: 0,
      display: '',
      queue: false
    });
  };

  Bubble.prototype.resetPosition = function() {
    var positions = this.getPositions();

    this.element.style.top  = positions.top  || 0;
    this.element.style.left = positions.left || 0;
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
