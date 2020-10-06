export function showErrorModal(el='', data={}, btn={}) {
  var m = document.querySelector(el);
  var b = m.querySelectorAll('.button');
  if (!m) {
    return console.log(el + ' not existed.');
  }
  data.icon && (m.querySelector('i').className = data.icon + ' icon');
  data.title && (m.querySelector('#error-title').innerText = data.title);
  data.message && (m.querySelector('#error-message').innerText = data.message);

  if ('reject' in btn) {
    var reject = btn.reject;
    b[0].style.visibility = 'visibile';
    b[0].textContent = reject.value || 'Cancel';
  } else {
    b[0].style.visibility = 'hidden';
  }
  
  if ('resolve' in btn) {
    var resolve = btn.resolve;
    b[1].style.visibility = 'visible';
    b[1].textContent = resolve.value || 'Confirm';
  } else {
    b[1].style.visibility = 'hidden';
  }

  $(el).modal('show');
}