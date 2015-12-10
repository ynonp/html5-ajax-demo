function refresh() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/contacts');
  xhr.addEventListener('load', onRefreshResult);
  xhr.addEventListener('error', onRefreshError);
  xhr.send();
}

function onRefreshError(e) {
  var xhr = e.target;
  alert('Error: ' + xhr.responseText);  
}

function onRefreshResult(e) {
  var xhr = e.target;
  if (xhr.status !== 200) {
    return onRefreshError(e);
  }
  var data = JSON.parse(xhr.responseText);
  var res = document.createDocumentFragment();
  var ul = document.querySelector('ul');
  ul.innerHTML = '';

  data.forEach(function(item) {
    var li = document.createElement('li');
    li.textContent = item.name;
    res.appendChild(li);
  });

  ul.appendChild(res);
}

function add() {
  var name = document.querySelector('#iname').value;
  var email = document.querySelector('#iemail').value;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/contacts');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.addEventListener('load', refresh);
  xhr.send(JSON.stringify({name: name, email: email}));
}

document.querySelector('#btn-refresh').addEventListener('click', refresh);
document.querySelector('#btn-save').addEventListener('click', add);
