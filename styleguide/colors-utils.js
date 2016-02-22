// jshint browser:true

'use strict'

var $ = require('jquery')

var colorUtils = {

  parseLine: function (line) {
    var color = {}
    var match = /@([^:]+):\s*(.+?)(?=\s+@|$)/g
    var prop

    line = line.trim()

    while ((prop = match.exec(line))) {
      color[prop[1]] = prop[2]
    }

    return color
  },

  parseColor: function (color) {
    var $color = $('<div/>')
    var $swatch = $('<div/>').appendTo($color)
    var contrastColor = colorUtils.contrast(color.color)

    $color.addClass('color')
    $swatch.addClass('color-swatch').css({
      backgroundColor: color.color,
      color: contrastColor,
      textShadow: '0 0 1px ' + (contrastColor === '#ffffff' ? '#000000' : '#ffffff')
    })

    $swatch.append(color.color)

    Object.keys(color)
      .filter(function (key) {
        return key !== 'color'
      })
      .forEach(function (key) {
        $('<div/>')
          .appendTo($color)
          .addClass('color-property')
          .data('name', key)
          .append(color[key])
      })

    return $color

  },

  hex2rgb: function (hex) {
    var bigint = parseInt(
      hex.slice(1).replace(/^([0-9a-f])([0-9a-f])([0-9a-f])$/i, '$1$1$2$2$3$3'), 16
    )
    var r = (bigint >> 16) & 255
    var g = (bigint >> 8) & 255
    var b = bigint & 255
    return [r, g, b]
  },

  getRGB: function (color) {
    if (/^#/.test(color)) {
      return colorUtils.hex2rgb(color)
    } else {
      return color.replace(/[^\d,]+/g, '').split(/,/).map(function (part) {
        return part * 1
      })
    }
  },

  contrast: function (color) {
    var rgb = colorUtils.getRGB(color)
    var o   = Math.round(
      ((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000
    )
    return o <= 180 ? '#ffffff' : '#000000'
  }

}

module.exports = colorUtils
