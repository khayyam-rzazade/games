/* worldmap.js: a simple world map as inline SVG, for any Logicers game (first used by the word-origin game).
   Nothing here knows about a game: it draws the land, turns a latitude and longitude into a place on the map,
   frames a set of places, and animates a move between two frames. The game draws its own dots, arrows and
   labels in an overlay that is laid out in plain pixels (the map's own "design pixels", 360 wide by default).

   Land: Natural Earth 1:110m land (naturalearthdata.com, public domain), taken from the world-atlas package,
   drawn in the Natural Earth projection, cut at the date line, Antarctica left out, simplified to about 10 KB.
   Latitudes shown: 84 N to 58 S.

   Use:
     var map = WorldMap.mount(box, { w: 360, h: 250, label: "World map" });
     var p = map.px(41.0, 29.0);                      // a place, in design pixels of the current view
     map.over.appendChild(...)                        // draw in design pixels
     map.show(WorldMap.frame([[41, 29], [30, 31]], { aspect: 360 / 250 }), 700).then(...);
     map.resize(360, 300);                            // the box changed shape: a new design height
     WorldMap.draw(ctx, box, { x: 0, y: 0, w: 1080, h: 750 }, { fill: "#cdd", stroke: "#99a" });   // the same map on a canvas

   Colours come from CSS custom properties, with light and dark defaults below, so the page's own look can
   override them: --wm-land (fill), --wm-coast (outline), --wm-sea (background, none by default). */
(function (root) {
  "use strict";

  var W = 1000, H = 437.7;                       // the whole map, in map units
  var S = 182.7896, Y0 = 252.678;                    // the projection's scale and the top edge, in map units
  var D = Math.PI / 180;
  var LAND = "M339 425l7 3 0 1-4-1-2 3-3-1-8-3-8-5 10 4 1-4 2-1 2 0zM358 417l3 1-1 1-3 1-1-1-2 1-1-1 2-2 2 1zM671 412l-3 1 1-4 4 1zM871 384l2 1 5-1-5 8 0-1-3 2-2 0 1-8 1-1zM942 385l-1 1 3-1 0 1-8 6 0 2-5 1-6 6-5 2-6-2 4-3 13-7 8-6 3-2zM955 369l0 4 1-2 1 0-1 3 1 1 5-1-4 5-2 0-8 7-2 1-1-1 3-3 0-2-2-1 4-2 3-5-1-9 1 0 1 2 1 0zM954 324l-2 1-2-3-3-5 2 2zM989 308l0 1-1 2-3 0 2-2zM638 296l0 7 0 1-1-2-1 1 0 4-7 22-2 4-5 2-3-2-2-7 1-5 1 0 2-6-1-6 2-4 5-2 4-3 1-3 1 0 3-6zM895 297l1 2 2-1 2 3 0 13 5 4 1 7 1-1 1 1 1 0-1 3 4 6 0 3-2 4 1 2-7 12-12 13-3 5-5 2-8 4-2-2 1-2-5 3-7-3 0-2 0-4 0-1-3 0 2-2 0-2-2 2-3 0 5-5 1-2-7 6-2-1 1-2-2-3 1-1-6-4-15 3-6 2-2 3-10 0-6 4-4 0-3-3 0-2 2-1 2-3 0-9-1-11 1 1-1-3 2 2-1-6 4-8 0 2 1-2 7-4 12-3 4-5 1-3 2-3 1 3 1 0 0-2 1-1 1 0 1-2 4-5 1 1 3-2 3 4 3 0 0-2 4-6 6-1 0-2-2-1 2-1 7 4 4-1 1 1-3 4-3 5 12 9 2-1 3-8 1-4 3-9 1-1 0 2zM834 286l-5-3 3 0 2 2zM844 285l-3 1 2-3 3-2 7-1-7 3zM827 279l2 0 1 2-7 1zM840 279l0 1-8 1 0-1 2-1 2 1zM801 274l5 1 1-2 5 2 1 2 4 1 3 2-3 1-3-1-14-2-8-3 2-3 3 0 4 1zM932 275l-2-1-1-5 4 5zM922 270l-5 3-6-2 1-1 4 0 1-1 0 1 1 0 3-2 0-2 2 1zM862 263l1 2-2-1-6 0 1-2zM925 267l-1 1-1-3-5-4 1 0 4 2zM873 256l0 6 3 1 2-3 4-2 2 0 17 7 4 3 0 2 4 2 1 2-3 0 1 2 2 3 2 3 1 0 0 1 4 3-1 1-7-2-5-6-3-2-4 2 0 3-2 1-5-1-2-3-3 0 0 1-4 0 1-3 2-1-1-6-8-3-4-3-2 2 0-3-2-1 5-1-1-1-4 0-1-2-2-1-1-1 5-2 4 1zM848 248l-2 3-2 1-10 0-1 2 3 3 1-1 6-1-1 1-1 0-4 3 3 4-1 1 3 4 0 2-2 1-1-1 2-3-3 1-1-1 1-1-2-2 0-3-2 1 0 8-2 1-1-1 1-6-1 0-1-2 3-11 3-3 5 2 4 0 2-3zM857 249l0 3-1 0-1 1 2 2-1 1-2-7 0-2 1-1 1 1 1 1zM793 271l-3 1-5-6-9-14-2-5-9-10-1-2 6 1 10 10 2 0 6 6-1 3 3 1 1 4 2 0 2 3zM827 247l4 3-4 0-1 5-2 2-2 9 0-2-3 2-1-2-4-1-3 1-1-2-4 0 0-4-3-4 0-6 2-2 2 1 2 0 0-3 5-1 10-13 1 0 1 3 5 2-1 2-1 0 0 1-2 1-1 3 2 3zM850 226l1 4-1 3-1-4-2 2 2 2-1 2-4-2 0-2 0-2-2-2-4 4 0-1 1-3 3-2 1 1 2-1 0-1 2 0 0-3 2 2zM725 233l-2 0-2-2 0-5 1-5 5 8-1 3zM843 220l-3 4-2-3 2-3 1 0 0 2 2-3zM828 223l-4 3 6-10 1 3zM836 214l4 1 0 2-3 2zM846 214l1 3-2-1 1 3-1 1-2-4 2 0 0-1-2-3 2 0zM835 211l0 2-4-4 3 0zM832 193l1 1 1-1 2 5-1 2-1 1 1 6 3 0 3 1 1 4-3-3-1 1-2-2-4 0 1-2-1-1 0 1-2-1-1-5 1 1 0-8zM321 194l-5 1 1-2zM290 195l-1 1-3-2 1-1 3 0 1 2zM302 189l7 0 4 4-1 1-3-1-2 1 0-1-2 3-3-2-4 1-2-1 1-1 4 0 1 0-1-3-1-1zM802 193l-3 1-2-1-1-3 2-1 4-1 1 1zM75 191l-1 0 1-4 3 3zM284 179l1 2 3-1 4 4 2 1 0 1 4 1 0 1-10 1 2-2-3-1-1-3-8-2-1 0 1-1-2 0-4 2-3 0 4-3 4-1zM290 176l-2-2 1-3 1 1zM828 179l0 3-3-5 2-6 2 1zM853 143l1 1-1 2-1-1-1 0 0 2-2-1 0-3 1 0 1-1zM590 138l-1 1 0 1-3 1-2-2zM562 138l1 1 6 0-1 1-3 0-4-1zM540 129l-1 6-7-4 0-1zM523 120l2 2 0 4-2 1-1-1-1-5zM866 133l1 4 0 2-3 2-5 0-2 4-2-1-1-3-10 2 3 3 1 5-2 2-1-2-1-3-4-3 3-1 3-6 5-1 3 1 0-6 3 2 3-5 0-4-2-3 0-2 2-1 4 5 1 2-1 4zM524 117l0 2-2-3 2-2zM862 110l2 1 1-1 2 3-3 1 0 3-6-2 1 4-3 0-2-4 0-2 3 0-3-7zM342 103l4 0-3 2-2-2-1-1 2-1zM349 95l-6-3 4 1zM197 97l-2 0-3-1-2-3-2-1 0-2 1 0 5 1zM364 90l-2 3 1-1 2 0-1 1 5 1-1 3 2-1 0 4-2 2-2 0 0-3-3 3-2 0 2-2-2-1-7 0 1-2 6-7 4-3 1 0zM185 80l3-1-4 4 1 2-1 0-1-4 1-2zM848 90l6 5-4-1 1 5 5 3 1 2-3-2 0 3-10-16-6-7 1-2-2-1 1 0zM484 85l-5 2-3-1 2-3-1-3 5-4 2 0 3 2-2 2 1 2zM530 75l-1 2-3-3 3-1zM144 70l-3 1 1-2 4-1 2 1zM493 66l-2 3 4 0-2 5 2 0 2 4 2 0 2 5 3 1-1 2 0 2-2 2-8 0-2 1-2 0-2 1-1 0 6-4-4-1-1-1 3-1-1-2 0-2 4 1 0-2-2-2-2-1-1-3-1 2-1-5 2-5zM318 54l-5 1 2-2zM121 51l5 1-3 1-1-1-2 0zM315 46l0 1 1-1 5 3-1 1 3 1-2 1-3-1-1-1-7 3 0-2-3 0 3-1 3-5zM469 43l-1 2 2 2-3 2-8 3-9-2 2-1-4-1 4-1 0-1-5 0 2-2 3-1 3 2 4-1 2 1 4-2zM337 41l-2 0 2-2 3 0zM625 120l4 3-2 0-1 4 1 4 5 3 4 0 4-1-1-6-3-1 1-2-2 0 0-3 3 1 2-1-4-4-2 1 1 2-2-5-3-1-4-5 3 0-1-2 5 0-2-5-4-1-5 2-1 2-2 1-2 3 3 3 0 2zM893 47l-1 2-3-1 10 5 1 2-4-1-6 3-3 4 1 1-5-2-4 2-2-1-1 2-4-1 1 5 5 2 3 4-2 0 2 3 2 1-3 2 2 3-3 1 2 3-2 3-13-14-3-4 1-1-2-2 3-1 2-6 2-3-2-4-3 1 1 2-2 3-6-3-4 1-2 4 4 2-8 1-1-2-4 0-2 1-14 1-7 12 4 1 5 2 1-1 3 0 6 3 6 15-1 7-3 9-2 2-4-2-4 4 1 4-4 3 1 2 3 2 5 6 1 6-6 2-3-8 1 0-3-3-1-1-1 1-2-1 1-2-1-3-3-1-7 3 0-1-1-2 1-2-2-1-3 3-1 2-2 0-1 2 7 5 2-2 5 1 1 2-3 0-3 6 3 2 7 8 1 3-1 1 3 2 0 6-1 0-4 12-6 5-3 1-1 1-1-1-2 2-6 2 0 3-2 0 0-3-4-1-5 3-1 3 0 2 10 13 2 6 0 5-2 2-8 8-1-2 1-2-5-3-3-5-3-1-2 0 0-2-2 0-1 13 1 0 2 6 8 6 4 14-2 0-6-5-4-8-1-4-4-6-1 2 1-12-7-18-4 4-3-1 0-4-1-3-3-5-4-3-3-7-3 0 0 3-3 0-1 1-5 0 1 3-1 2-4 2-7 8 0 1-4 3 0 17-2 1-1 2 1 1-2 1-2 3-3-3-7-18-3-5-5-17-3 2-2-1-4-3 1-2-1-1-6-3-3-5-13 1-12-2-1-4-2-1-4 2-3-1-6-3-5-8-1 1-2-1-1 1-1 0 1 5 2 2 4 4 0 2 2 4 0-4 2 1 0 3 1 2 6 0 5-7 1 4 2 3 5 2 3 4-3 6-1 1 0 4-3 1-1 2-3 1 0 1-7 3-1 3-7 2-2 3-8 2-2 2-4 0-3-8 0-5-5-9-6-6 0-4-2-4-3-2-7-12-1 0 0-4-2 6-5-8 6 12 4 8 0 2 4 4 2 11 3 2 3 6 11 12 0 1-1 1 4 4 1 0 18-5 0 4-4 13-4 8-4 5-9 8-4 6-4 3-3 7-2 4 1 1 1 2-1 5 4 7 0 13-1 2-3 4-6 3-7 7 0 3 2 5-1 5-1 3-7 4 0 1-2 8-12 13-6 4-9 0-8 3-3-2-1-5 1-3-7-15-2-16-7-13 0-8 2-7 4-5 0-4-2-5 1-2-4-11-9-13 3-13-3-6-8 2-4-6-5 0-12 5-8-2-9 3-12-10-7-11-5-4 0-5-2-4 3-4 1-7 0-6-2-3 0-3 3-6 2-2 2-6 5-6 3 0 6-6-1-4 1-4 7-5 3-6 9 2 10-4 10-1 2-1 6 1 3-2 1 1 0 1 3 0-1 1 1 3-1 2-1 2 0 2 2 0 1 2 10 3 2 3 9 3 2-2-1-3 1-1 4-2 3 0 1 2 5 1 1 1 3 0 7 2 5-2 2 0 1 2 0-1 5 1 1-2 3-10 0-4-1-1 1-2-4 0-1 2-4 0-3-2-2 0-1 2-2 0-2-2-3 0-4-5 1-2-2-2 3-3 4 0 1-2 4 0 6-3 4 0 9 4 5-1 3-1-1-4-13-8 1-1 2-2-2-1 4-2-10 3 0 2 4 0 0 1-6 3-1-1 0-1-3-1 3-2-1-1-4 0 0-2-3 1-2 5-2 0 0 4-2 3 2 3 2 2-1 0-3 0-3 3 0-2-3 0-3 0 2 2-2 1-1 0-2-2 0 1 2 3-1 1 3 2 0 2-2-1 1 2-2 0 1 3-4-1-1-5-5-6-1-5-9-6-3-5-1 0-1 1-1-1 1-1-2-1-2 2 1 4 6 6 2 0 0 2 7 4 0 1-4-2-1 2 2 2 0 1-1 0-1 3-1 0 0-3-2-3-8-6-4-4-1-3-4-1-6 4-5-1-3 1 0 4-3 2-3 0-3 6 1 2-2 3-2 1-2 2-5 0-3 3-1-1-2-2-6 0 0-5-2-1 3-7-1-6-1-1 4-2 15 1 2-2 0-6-4-5-4-2 0-2 3-1 4 1-1-3 3 1 5-2 1-3 5-2 2-5 6-1 2 0 2-1-2-5 1-5 4-2 0 3 1 1-2 3 0 3 3 1 0 1 4-2 4 2 8-3 5 1 0-1 3-1-1-5 1-2 2-1 2 3 2 0 0-4-2-1-1-2 6-1 5 0 2-1-2-2-12 2-4-2 0-3-1-3 1-2 7-5 0-1-3-1-4 0-2 2 1 2-7 5-1 4 4 4-2 3-2 1-2 7-3 0-1 2-3 1-6-13-5 4-3 0-3-1-2-10 12-7 8-9 9-6 8-1 3-2 7-1 7 2-2 1 2 2 2-1 19 5 3 3-2 2-4 1-11-2 4 2 1 4 5 2 0-2-2-1 1-1 6 2 2-1-2-2 4-3 4 1 1-2-2-1 0-2-2-2 6 1 2 2-3 0 1 2 2 1 3-1 0-2 11-3 1 0-1 1 2 1 8-2 3 1 2-2-3-1 1-1 6 1 13 4 1-2-4-2-2 0 0-1-3-3 4-6 6 1 1 2-1 2 4 2 1 4 3 2-2 6 3 0 2-2 1-2-2-2 0-2-2 0-2-1 1-3-4-2 2-2-1-2 3 1 0 3 3 0-2-1 3-2 4 0 5 2-5-5 12-1-3-1 1-2 11-2 7 0 3-1 4 0 0-2 4-1 8 3 7-1 8 2 1 2-6 2 7 1 3 2 3-1 17 2-1-2 8 0 4 1 3 2 0 1 9 3-1-2 4 1 12 0-4-3 2-1 20 2 11 3 13 0 5 3 3 1 14 0 7 2 1-1-4-3 20 2 4 1zM120 36l5 5-2 2 0 1 2-2 5 0 2 3-8 1-4 3-5-1 1-2-5 0 2-2-3 1-3 2zM298 36l-2 1-6-2 5-2zM129 29l4 1-6 1zM310 35l-2 3 4-2 2 1-2 2 1 2 6-4 2-3 6 0 2 2-3 3 0 1-1 1-5 2-5 0-6 5-4 2-3 0-4 3-7 3-6 5-2 4 3 0 0 5 3 0 11 6 6 0-2 6 0 3 3 3 2-1 3-3 0-5-1-1 5-2 5-4 1-5-2-2 4-3 2-7 9 0 4 3 4 1-2 6 2 0 1 2 4-2 5-4 4 10-1 2 4 3 4 2 1 2 2 2-1 3-12 6-15 0-7 4-8 7 2-1 5-4 6-2 4-1 2 2-3 2 0 6 3 1 4 0 3-4 0 3 1 1-16 7-2 0 1-3 5-2-7 0 0 1-9 4-2 2-1 2 1 2 1 0 0-1 0 1-10 3 4 0-5 0-4 6-1-2 0 4-3 4 1-3-1-1 1-3-1 4-2-1 2 1-1 8-2 2-8 5-7 6-1 5 1 10-2 5-2 0-1-2-2-6 1-4-3-3-3 1-2-2-8 0-1 0 0 3-2 1-2 0-2-2-6 0-10 6-5 17 2 10 5 4 10-3 2-6 9-2 1 3-3 3-1 5-1-1-1 6-2 3 2 0 9-1 4 3 0 3-2 10 3 7 4 0 4-2 7 3 4-3 0-3 2-2 4 0 5-4 2 1-1 2-2 0 1 3-1 2 1 3 1-1 1-2-1-4 3-1 1-2 1 2 2 0 2 3 5-1 4 2 1-2 7 0-2 1 0 2 5 2 0 2 4 2 2 4 4 2 8 1 3 1 4 4 1 0 2 8 1 0 0 2-2 3 1 1 5 0 0 4 2-2 8 3 2 2-1 1 3-1 6 2 4 0 8 6 5 2 2 6-1 6-10 13 0 15-4 13-2 2-1 2-7 1-7 5-2 3-1 9-3 8-4 4-3 7-3 1-3 0-4-1-2-2 0 2 4 3 0 2 1 1-1 6-4 2-8 0 2 6-4 1-2-1-1 1 1 3 2 1 1-1 1 2-3 3 0 5-2 0-2 1 0 3 6 3 0 3-3 1 0 4-3 3 5 5-4-1-2 2 0 3-1 0-10-5-5-11 0-3 1-2-4-1 2-3-1-5 3 1 0-7-2-1 0 4-2 0-1-11 1-2-3-6 1-1 2-15-3-11 1-4-1-20-1-10-17-12-1-4-11-20-4-4 1-1-2-3 4-7 0-1-1 1-2-1 0-4 1 0 2-6 3-2 1-4 2 0 2-4-1 0 1-6-3-7 1-1-3-2-1 0-3 3 1 1-2 1-1-1-1 0 0-1-3 0-2-1 0-2-4-4 0 2-2-1 0-4-5-6 1 0 0-1-3 0-7-2-5-6-4-1-5 1-18-8-5-6 0-1 2-3-1-3-5-9-2-2 0-3-5-8-1-7-1-1-2-1-2 5 5 12 1 7 1 1 2 3-2 1 0-2-5-4 1-4-6-6 1 0 2-2-3-4-1-11-2-3-5-2-1-10-1-4 0-4 3-8 6-9 2-8 4 0 0 3 2-6-4-4-4-2 1-2 1-2-2-2 1-2-1-2 1-2-2-2 1-2-1-3 1-3-6 0-2-1-2-3-5-2-3 1-5-3-3 1-2 2-10 2 4-4 4-2-13 6 0 1-4 2-15 7-19 4 25-9 5-4-6 1 0-1-2 1 1-2-5 2 3-3-1-1-3 0-2-2 2-1-1-2 3-1 6-3 3 0 7-2 1-1-1-1 3-1-6 1-4 0-3-1 0-3 10-2 2 0-2 1 5 0 0-2-1-1-1-2-2-1 11-3 5-2 15-3 2 0 0 2 21 1 12 4 17-4 0 1 4-2 3 3 4-2-1 2 7-1 6 2 5 0 1 2-4 1 12 0 1 2 3-2-1-1 2-1 5 0 2 2 5 1 7 0 1-2 2-1 3 1-2 3 3-2 1 0 3-3-3-3 3-3 3-2 4 2 1 3-3 1zM268 25l-2 1 5 0 2 1 4-1 1 1-1 2 2-1 1-3 4 0 1 1-1 5 5 2-1 2-4 0 1 1-2 1-6-1-17 2 0-2-5 0 0-2 11-1-11-1-1-1 6-1-6-1 6-3 7-1zM289 24l-4 2-1-2zM345 25l-7 1-2-1 2-1 4 0zM324 25l1 2 3-2 6-1 2 2-2 2 7-2 6 3 0 1 4-1 1 2 6 2 1 3-5 1 8 2 2 3 3 0-7 5-4-4-3 1-1 1 4 4 1 3-2 2-7-3 4 5-10-3-2-1 1-1-5-3 0 1-7 1-1-1 2-3 9 0 0-1 5-4 0-1-3-3-3 0 1-1-4-3-5 1-15-2-1-1 3-1-3 0 1-2 6-4 6-1zM298 23l6 1-3 2 2 1-2 2-6 1-4-3 0-1 4 0-1-1zM791 25l-8 0 3-2zM310 26l-3 2-3 0 1-2 3-3 2 0 8 0zM251 30l-6 1 0-1-4-1 9-5-1-2 15 0 2 2-9 3zM800 20l-1 1-4 0-5-2zM314 20l-2 1-5 0 5-2zM787 19l1 2-10 0-6-1-1-2 7 0zM308 16l0 1-3 3-4 1-2-1 2-1-4 0 2-2zM287 17l0 1 4 0-3 2-16 2 6-2-12 0 8-3 10 2-1-2 3-1 2 0zM620 32l-9-1-1-1-4 0 0-2 1 0 0-2 3-2-2 0 4-3-1-1 9-3 13-1 2 1-13 3-5 2-4 5 2 2zM316 15l5 1 1 1-1 1 3 1 13-1 4 2 0 1-5 1-16 0-4-1 1-3-1-1-6-1 2-1zM275 14l-4 3-11 1-2 0 11-4zM287 14l-4 0-2 0 5-1 2 0zM548 13l-4 1-4 0 1-1-1-1 4 0zM316 13l-4 0-1-1 1-1 3 0 2 1zM308 12l0 1-10-1 3-1-2 0 1-1 8 1zM702 12l-10 1 0-3 1 0 8 1zM534 9l7 2-5 1-3 4-2 0-4-2 1 0-7-3-1-2 12-1zM548 7l3 1-2 1-5 1-12-2zM595 7l-6 1-2 0 1-1-4 0 7 0 2-1zM690 11l-9-1-10-2 6-2 12 3zM336 9l1 1-11 2-4 0-1-1 3-1-4 0-1-2 6-2 4 0 1 1 6 1zM377 2l8 0 3 1-13 2 4 0-13 4-12 1 3 0-2 1 1 1-11 3 3 1-6 1-17 0 0-2 4 0 1-2 5 1-1-1-3-1 8-2-2-1 0-1 10-1-10 0-3-1-2-1 0-1 13-1 4 0 9-1zM452 1l10 1-19 2 15 0 2 0-3 2 14-2 6 1-15 3 5 0-5 3 0 3 2 1-6 1 3 2 0 2-2 0 2 2-4 0 2 1-1 1-6 1 2 2 0 1-4-1-1 0 5 3 1 2-4 0-4-2 1 1-3 2 8 0-12 5-9 1-6 4-13 3-2 2-2 4-4 2 0 2-4 5-3 1-3-3-4 0-5-8 0-4-2-3 1-2-1-1 4-3 3-1 3-3-7 1-2 0 2-4 6 1-4-3-4 0 3-2-2-6-3-1 1-1-5-1-14 0-4-3 9-1-11-1 1-1 16-2 1-1-5-1 13-3 0-1 11 0 7 0 6-1 9 2-3-1 0-1 7-2z";

  /* Natural Earth projection (Savric et al., 2008), the same one d3 calls geoNaturalEarth1 */
  function project(lat, lon) {
    var l = lon * D, p = lat * D, p2 = p * p, p4 = p2 * p2;
    var x = l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)));
    var y = p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)));
    return [500 + S * x, Y0 - S * y];
  }

  function pt(p) { return p && typeof p.lat === "number" ? [p.lat, p.lon] : p; }

  /* the part of the map to show for some places: { x, y, w, h } in map units, of the given shape (width / height).
     o.pad: room round the places, as a share of their spread (default .22); o.minW: never show less than this
     many map units across (default 300, about a third of the world) */
  function frame(points, o) {
    o = o || {};
    var aspect = o.aspect || 360 / 250, pad = o.pad == null ? 0.22 : o.pad, minW = o.minW || 300;
    var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, n = 0;
    (points || []).forEach(function (q) {
      q = pt(q);
      if (!q || typeof q[0] !== "number" || typeof q[1] !== "number") return;
      var m = project(q[0], q[1]);
      x0 = Math.min(x0, m[0]); x1 = Math.max(x1, m[0]); y0 = Math.min(y0, m[1]); y1 = Math.max(y1, m[1]); n++;
    });
    if (!n) return whole(aspect);
    var bw = x1 - x0, bh = y1 - y0;
    var w = Math.max(bw * (1 + 2 * pad), bh * (1 + 2 * pad) * aspect, minW);
    if (o.maxW) w = Math.min(w, o.maxW);
    if (w >= W * 0.94) return whole(aspect);        // nearly all of it: show all of it
    var h = w / aspect, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    return clamp({ x: cx - w / 2, y: cy - h / 2, w: w, h: h });
  }
  function whole(aspect) {                          // the whole map, in the shape asked for (sea shows above and below a wide map)
    aspect = aspect || 360 / 250;
    var h = W / aspect;
    return { x: 0, y: H / 2 - h / 2, w: W, h: h };
  }
  function clamp(b) {                               // keep the frame on the map where it can be
    var x = b.x, y = b.y;
    if (b.w <= W) x = Math.max(0, Math.min(W - b.w, x)); else x = (W - b.w) / 2;
    if (b.h <= H) y = Math.max(0, Math.min(H - b.h, y)); else y = (H - b.h) / 2;
    return { x: x, y: y, w: b.w, h: b.h };
  }

  /* an arrow's path between two points (pixels or anything flat): a gentle arc, bent to one side.
     bend: the sideways pull as a share of the length (default .2; negative bends the other way).
     Returns { d, c (the control point), len (a good guess at the length), a (the angle the arrow ends at) } */
  function arc(p0, p1, bend) {
    var b = bend == null ? 0.2 : bend;
    var dx = p1[0] - p0[0], dy = p1[1] - p0[1], len = Math.hypot(dx, dy) || 1;
    var mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2;
    var nx = -dy / len, ny = dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }              // bend upwards on the screen unless the sign says otherwise
    var cx = mx + nx * len * b, cy = my + ny * len * b;
    var f = function (v) { return Math.round(v * 10) / 10; };
    return {
      d: "M" + f(p0[0]) + " " + f(p0[1]) + "Q" + f(cx) + " " + f(cy) + " " + f(p1[0]) + " " + f(p1[1]),
      c: [cx, cy], len: len * 1.08, a: Math.atan2(p1[1] - cy, p1[0] - cx)
    };
  }

  /* default look: light and dark; a page overrides --wm-land, --wm-coast, --wm-sea */
  var CSS =
    ".wm{display:block;width:100%;height:auto;overflow:hidden;background:var(--wm-sea,transparent)}" +
    ".wm-land{fill:var(--wm-land,#DDE3F0);stroke:var(--wm-coast,#B9C2DA);stroke-width:.7;stroke-linejoin:round;vector-effect:non-scaling-stroke}" +
    "@media (prefers-color-scheme:dark){.wm-land{fill:var(--wm-land,#1B2040);stroke:var(--wm-coast,#343C69)}}";
  function css() {
    if (typeof document === "undefined" || document.getElementById("wm-css")) return;
    var st = document.createElement("style");
    st.id = "wm-css";
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  var NS = "http://www.w3.org/2000/svg";
  function reduced() {
    try { return !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
  }

  /* put a map into an element. o.w and o.h: the design size in pixels (default 360 by 250); o.label: its description;
     o.box: the first frame (default the whole map) */
  function mount(el, o) {
    o = o || {};
    css();
    var dw = o.w || 360, dh = o.h || 250;
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + dw + " " + dh);
    svg.setAttribute("class", "wm");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    if (o.label) { svg.setAttribute("role", "img"); svg.setAttribute("aria-label", o.label); } else svg.setAttribute("aria-hidden", "true");
    var world = document.createElementNS(NS, "g");
    world.setAttribute("class", "wm-world");
    var land = document.createElementNS(NS, "path");
    land.setAttribute("class", "wm-land");
    land.setAttribute("d", LAND);
    world.appendChild(land);
    var over = document.createElementNS(NS, "g");
    over.setAttribute("class", "wm-over");
    svg.appendChild(world);
    svg.appendChild(over);
    el.appendChild(svg);

    var map = { svg: svg, over: over, w: dw, h: dh, box: null, aspect: dw / dh, timer: 0 };
    function put(b) {
      map.box = b;
      var k = dw / b.w;
      world.setAttribute("transform", "scale(" + k + ") translate(" + (-b.x) + " " + (-b.y) + ")");
    }
    map.px = function (lat, lon) {                   // a place in design pixels, for the current frame
      var m = project(lat, lon), b = map.box, k = dw / b.w;
      return [(m[0] - b.x) * k, (m[1] - b.y) * k];
    };
    map.set = function (b) { window.cancelAnimationFrame(map.timer); put(b); };
    /* move to frame b over ms milliseconds (a zoom that eases in and out); resolves when it has arrived */
    map.show = function (b, ms) {
      window.cancelAnimationFrame(map.timer);
      var a = map.box;
      if (!ms || reduced() || !a) { put(b); return Promise.resolve(); }
      return new Promise(function (resolve) {
        var t0 = null;
        var ac = [a.x + a.w / 2, a.y + a.h / 2], bc = [b.x + b.w / 2, b.y + b.h / 2];
        function step(t) {
          if (t0 === null) t0 = t;
          var k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
          var w = a.w * Math.pow(b.w / a.w, e), h = w / map.aspect;
          var cx = ac[0] + (bc[0] - ac[0]) * e, cy = ac[1] + (bc[1] - ac[1]) * e;
          put({ x: cx - w / 2, y: cy - h / 2, w: w, h: h });
          if (k < 1) map.timer = window.requestAnimationFrame(step); else { put(b); resolve(); }
        }
        map.timer = window.requestAnimationFrame(step);
      });
    };
    map.clear = function () { while (over.firstChild) over.removeChild(over.firstChild); };
    /* the box changed shape: take a new design size (the same width in design pixels, another height) and keep the centre of the view */
    map.resize = function (w, h) {
      window.cancelAnimationFrame(map.timer);
      dw = w; dh = h; map.w = w; map.h = h; map.aspect = w / h;
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      var b = map.box, bw = b.w, bh = bw / map.aspect;
      put({ x: b.x + b.w / 2 - bw / 2, y: b.y + b.h / 2 - bh / 2, w: bw, h: bh });
    };
    put(o.box || whole(dw / dh));
    return map;
  }

  /* the same map on a canvas: the frame b drawn into the rectangle r = { x, y, w, h } (canvas pixels).
     o.fill, o.stroke, o.line: the land's colours and the outline's width */
  function draw(ctx, b, r, o) {
    o = o || {};
    var k = r.w / b.w;
    ctx.save();
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.w, r.h);
    ctx.clip();
    ctx.translate(r.x, r.y);
    ctx.scale(k, k);
    ctx.translate(-b.x, -b.y);
    var p = new Path2D(LAND);
    ctx.fillStyle = o.fill || "#DDE3F0";
    ctx.fill(p);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.w, r.h);
    ctx.clip();
    ctx.translate(r.x, r.y);
    ctx.scale(k, k);
    ctx.translate(-b.x, -b.y);
    ctx.lineWidth = (o.line || 1.4) / k;
    ctx.lineJoin = "round";
    ctx.strokeStyle = o.stroke || "#B9C2DA";
    ctx.stroke(p);
    ctx.restore();
    return function (lat, lon) {                     // a place in canvas pixels for this frame and rectangle
      var m = project(lat, lon);
      return [r.x + (m[0] - b.x) * k, r.y + (m[1] - b.y) * k];
    };
  }

  root.WorldMap = {
    version: 1, W: W, H: H, land: LAND,
    project: project, frame: frame, whole: whole, arc: arc, mount: mount, draw: draw, css: CSS
  };
})(typeof window !== "undefined" ? window : globalThis);
