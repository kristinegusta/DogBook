function togglePW() {
    var password = document.querySelector('[name=password]');
    if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', 'text');
        document.getElementById("icon").style.color = 'orange';
    } else {
        password.setAttribute('type', 'password');
        document.getElementById("icon").style.color = 'black';

    }
}