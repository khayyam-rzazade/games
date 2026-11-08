/* the tests' stand-in for a blog or a Moodle page: pastes the embed code from ?code= into the page, as a person would */
(function () {
  var code = new URLSearchParams(location.search).get("code") || "";
  var slot = document.getElementById("slot");
  slot.innerHTML = code;
  Array.prototype.forEach.call(slot.querySelectorAll("script"), function (old) { var s = document.createElement("script"); s.src = old.src; s.async = true; old.replaceWith(s); });
})();
