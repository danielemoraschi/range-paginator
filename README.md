# range-paginator
Helper functions to build a numeric range of pagination links.

## API
### render
Returns the html given the following `options`:

* `current` [1]: The current page.
* `page_size` [25]: Number of elements per page.
* `total` [0]: Number of total elements.
* `mid_range` [5]: How many page to show in the middle range.
* `limit` [10]: Minimum pages to show the range view.
* `draw_nextprev` [true]: Show/hide the Next and Previous links.
* `draw_firstlast` [true]: Show/hide the First and Last links.
* `url` [/page/%n]: Url to paginate.

* `prev_text` [&laquo; Previous]: Text for the Previous link.
* `next_text` [Next &raquo;]: Text for the Next link.
* `first_text` [First]: Text for the First link.
* `last_text` [Last]: Text for the Last link.
* `empty_text` [&nbsp;...&nbsp;]: Text for the empty element.

* `ul_class` [range-paginator]: Css class for the UL.
* `li_class`: Default css class for the LI element.
* `a_class`: Default css class for the A element.
* `prev_class` [prev]: Css class for the Previous page link.
* `next_class` [next]: Css class for the Next page link.
* `first_class` [first]: Css class for the First page link.
* `last_class` [last]: Css class for the Last page link.
* `active_class` [active]: Css class for the current page link.
* `empty_class` [empty]: Css class for the empty element.


## Examples

```javascript
var html = paginator.render({
	current: 10,
	page_size: 25,
	total: 500,
	mid_range: 5,
	limit: 10
});
```
<ul class="range-paginator"><li class="first"><a class="" href="/page/1"><span>First</span></a></li><li class=""><a class="" href="/page/9"><span>« Previous</span></a></li><li class=""><a class="" href="/page/1"><span>1</span></a></li><li class=" empty"><span>&nbsp;...&nbsp;</span></li><li class=""><a class="" href="/page/8"><span>8</span></a></li><li class=""><a class="" href="/page/9"><span>9</span></a></li><li class=" active"><a class="" href="/page/10"><span>10</span></a></li><li class=""><a class="" href="/page/11"><span>11</span></a></li><li class=""><a class="" href="/page/12"><span>12</span></a></li><li class=" empty"><span>&nbsp;...&nbsp;</span></li><li class=""><a class="" href="/page/20"><span>20</span></a></li><li class=""><a class="" href="/page/11"><span>Next »</span></a></li><li class="last"><a class="" href="/page/20"><span>Last</span></a></li></ul>

<br/>

```javascript
var html = paginator.render({
	current: 1,
	page_size: 50,
	total: 500,
	mid_range: 5,
	limit: 10
});
```

<ul class="range-paginator"><li class="first"><a class="" href="/page/1"><span>First</span></a></li><li class=""><a class="" href="/page/1"><span>1</span></a></li><li class=""><a class="" href="/page/2"><span>2</span></a></li><li class=""><a class="" href="/page/3"><span>3</span></a></li><li class=""><a class="" href="/page/4"><span>4</span></a></li><li class=""><a class="" href="/page/5"><span>5</span></a></li><li class=""><a class="" href="/page/6"><span>6</span></a></li><li class=""><a class="" href="/page/7"><span>7</span></a></li><li class=""><a class="" href="/page/8"><span>8</span></a></li><li class=""><a class="" href="/page/9"><span>9</span></a></li><li class=" active"><a class="" href="/page/10"><span>10</span></a></li><li class="last"><a class="" href="/page/10"><span>Last</span></a></li></ul>

<br/>

```javascript
var html = paginator.render({
	current: 2,
	page_size: 1,
	total: 3,
	mid_range: 9,
	limit: 1
});
```

<ul class="range-paginator"><li class="first"><a class="" href="/page/1"><span>First</span></a></li><li class=""><a class="" href="/page/1"><span>« Previous</span></a></li><li class=""><a class="" href="/page/1"><span>1</span></a></li><li class=" active"><a class="" href="/page/2"><span>2</span></a></li><li class=""><a class="" href="/page/3"><span>3</span></a></li><li class=""><a class="" href="/page/3"><span>Next »</span></a></li><li class="last"><a class="" href="/page/3"><span>Last</span></a></li></ul>

## License
2013 Daniele Moraschi
Licensed under the MIT license.