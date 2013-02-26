/*
 * range-paginator
 * https://github.com/danielemoraschi/range-paginator
 *
 * Copyright (c) 2013 Daniele Moraschi
 * Licensed under the MIT license.
 */

/**
 * Helper functions to build a numeric range of pagination links.
 *
 * @module Paginator
 */
var Paginator = (function() {
    'use strict';

    var __o = {
        current: 1,
        page_size: 25,
        total: 0,
        mid_range: 5,
        limit: 10,
        draw_nextprev: true,
        draw_firstlast: true,
        url: '/page/%n',

        ul_class: 'range-paginator',
        li_class: '',
        a_class: '',
        prev_class: 'prev',
        next_class: 'next',
        first_class: 'first',
        last_class: 'last',
        active_class: 'active',
        empty_class: 'empty',
        prev_text: '&laquo; Previous',
        next_text: 'Next &raquo;',
        first_text: 'First',
        last_text: 'Last',
        empty_text: '&nbsp;...&nbsp;'
    };

    /**
     * Extends object options
     *
     * @param  {object}  target object to exdend
     * @param  {object}  source with the new properties
     * @private
     */
    var _extend = function (target, other) {
        target = target || {};
        for (var prop in other) {
            if (typeof other[prop] === 'object') {
                target[prop] = _extend(target[prop], other[prop]);
            } else {
                target[prop] = other[prop];
            }
        }
        return target;
    };

    /**
     * A JavaScript equivalent of PHP’s range
     *
     * @private
     */
    var _calc_range = function(low, high, step) {
        // http://kevin.vanzonneveld.net
        // +   original by: Waldo Malqui Silva
        // *     example 1: range ( 0, 12 );
        // *     returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        // *     example 2: range( 0, 100, 10 );
        // *     returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        // *     example 3: range( 'a', 'i' );
        // *     returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
        // *     example 4: range( 'c', 'a' );
        // *     returns 4: ['c', 'b', 'a']
        var matrix = [],
            inival, endval, plus,
            walker = step || 1,
            chars = false;

        if (!isNaN(low) && !isNaN(high)) {
            inival = low;
            endval = high;
        } else if (isNaN(low) && isNaN(high)) {
            chars = true;
            inival = low.charCodeAt(0);
            endval = high.charCodeAt(0);
        } else {
            inival = (isNaN(low) ? 0 : low);
            endval = (isNaN(high) ? 0 : high);
        }

        plus = ((inival > endval) ? false : true);
        if (plus) {
            while (inival <= endval) {
                matrix.push(((chars) ? String.fromCharCode(inival) : inival));
                inival += walker;
            }
        } else {
            while (inival >= endval) {
                matrix.push(((chars) ? String.fromCharCode(inival) : inival));
                inival -= walker;
            }
        }

        return matrix;
    };

    /**
     * A JavaScript equivalent of PHP’s in_array
     *
     * @private
     */
    var _in_array = function(needle, haystack, argStrict) {
        // http://kevin.vanzonneveld.net
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: vlado houba
        // +   input by: Billy
        // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
        // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
        // *     returns 1: true
        // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
        // *     returns 2: false
        // *     example 3: in_array(1, ['1', '2', '3']);
        // *     returns 3: true
        // *     example 3: in_array(1, ['1', '2', '3'], false);
        // *     returns 3: true
        // *     example 4: in_array(1, ['1', '2', '3'], true);
        // *     returns 4: false
        var key = '',
            strict = !! argStrict;

        if (strict) {
            for (key in haystack) {
                if (haystack[key] === needle) {
                    return true;
                }
            }
        } else {
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
        }

        return false;
    };

    /**
     * The total number of pages
     *
     * @private
     */
    var _num_pages = function() {
        return Math.ceil(__o.total / __o.page_size);
    };

    /**
     * Check if the index is current page
     *
     * @param  {integer}  index page to check
     * @private
     */
    var _is_active = function(index) {
        return __o.current == (index+1);
    };

    /**
     * Get the url of the page at the index
     *
     * @param  {integer}  index page to get the url
     * @private
     */
    var _to_page = function(index) {
        return __o.url.replace('%n', index);
    };

    /**
     * The current page url
     *
     * @private
     */
    var _actual_page = function() {
        return __o.url.replace('%n', (__o.current));
    };

    /**
     * The previous page url
     *
     * @private
     */
    var _previous_page = function() {
        return __o.url.replace('%n', (__o.current-1));
    };

    /**
     * The next page url
     *
     * @private
     */
    var _next_page = function() {
        return __o.url.replace('%n', (__o.current+1));
    };

    /**
     * Check whenever to show the Next link
     *
     * @private
     */
    var _show_next = function() {
        return (__o.draw_nextprev) && (__o.current < this.max_current);
    };

    /**
     * Check whenever to show the Previous link
     *
     * @private
     */
    var _show_previous = function() {
        return (__o.draw_nextprev) && (__o.current > this.max_current);
    };

    /**
     * Create a HTML of the link page
     *
     * @param  {string}  url of the link
     * @param  {string}  content of the element <li>
     * @param  {boolean}  if this is the current page
     * @param  {boolean}  if this is a range empty element
     * @private
     */
    var _create_li = function(url, content, liclass) {
        return "<li class=\"" + __o.li_class + (liclass || '') + "\">" + (url ? "<a class=\"" + __o.a_class + "\" href=\"" + url + "\">" : '') + '<span>' + content + '</span>' + (url ? '</a>' : '') + '</li>';
    };

    
    /**
     * Create the HTML pagination links
     *
     * @param  {object}  options
     */
    var _render = function(options) {
        _extend(__o, options);

        var out = '<ul class="' + __o.ul_class + '">',
            range, start_range,
            end_range, i, 
            num_pages = _num_pages();

        if(__o.current > num_pages) {
            __o.current = num_pages;
        }

        if(__o.current <= 0) {
            __o.current = 1;
        }

        if(__o.mid_range < 3) {
            __o.mid_range = 3;
        }

        if(num_pages>1) out += _create_li(_to_page(1), __o.first_text, __o.first_class);

        if(num_pages > __o.limit) {
            (__o.current != 1 && num_pages >= __o.limit) && (out += _create_li(_previous_page(), __o.prev_text));

            start_range = __o.current - (~~(__o.mid_range / 2));
            end_range = __o.current + (~~(__o.mid_range / 2));

            if(start_range <= 0) {
                end_range += Math.abs(start_range) + 1;
                start_range = 1;
            }

            if(end_range > num_pages) {
                start_range -= end_range - num_pages;
                end_range = num_pages;
            }

            range = _calc_range(start_range, end_range);

            for(i = 1; i <= num_pages; i++) {
                (range[0] > 2 && i == range[0]) && (out += _create_li(false, __o.empty_text, ' ' + __o.empty_class));

                console.log(range);
                //loop through all pages. if first, last, or in range, display
                if(i == 1 || i == num_pages || _in_array(i, range)) {
                    out += _create_li(_to_page(i), i, ((i == __o.current) ? ' ' + __o.active_class : ''));
                }

                (range[__o.mid_range - 1] < num_pages && i == range[__o.mid_range - 1]) && (out += _create_li(false, __o.empty_text, ' ' + __o.empty_class));
            }

            (__o.current != num_pages && num_pages >= __o.limit) && (out += _create_li(_next_page(), __o.next_text));
        }
        else {
            for(i = 1; i <= num_pages; i++) {
                out += _create_li(_to_page(i), i, ((i == __o.current) ? ' ' + __o.active_class : ''));
            }
        }

        if(num_pages>1) out += _create_li(_to_page(num_pages), __o.last_text, __o.last_class);

        return (num_pages > 0 ? out + '</ul>' : '');
    };


    //
    return {
        render: _render
    };
})();

if (typeof module !== 'undefined') {
    module.exports = Paginator;
}
