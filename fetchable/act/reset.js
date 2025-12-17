(function() {
    var parent = document.getElementById('top_notify');
    if (!parent) return;

    var container = document.createElement('div');
container.className = 'top_notify_wrap pad10';
container.style.position = 'fixed';       // fixed to viewport
container.style.top = '0';                // top-left corner
container.style.left = '0';
container.style.width = '100%';           // span full width
container.style.zIndex = '1000000';       // large as my dih
container.style.backgroundColor = 'red';
container.style.color = 'white';
container.style.transition = 'background-color 0.5s';

    container.innerHTML = `
        <div class="btable">
            <div class="bcell_mid">
                <div class="btable">
                    <div class="bcell_mid top_notify_icon">
                        <img src="https://cody.wicorn29.net/default_images/system/warning.svg">
                    </div>
                    <div class="bcell_mid hpad10 top_notify_text">
                        CodyChat will reset in 20 seconds
                    </div>
                </div>
            </div>
        </div>
    `;

    parent.appendChild(container);

    var textEl = container.querySelector('.top_notify_text');
    var flash = false;
    var seconds = 20;

    var flashInterval = setInterval(function() {
        container.style.backgroundColor = flash ? 'red' : 'orange';
        flash = !flash;
    }, 500);

    var countdown = setInterval(function() {
        textEl.innerText = 'CodyChat will reset in ' + seconds + ' seconds';
        seconds--;
        if (seconds <= 0) {
            clearInterval(countdown);
            clearInterval(flashInterval);

            var overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'black';
            overlay.style.zIndex = '1000000010000000';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 1s';
            document.body.appendChild(overlay);

            requestAnimationFrame(function() {
                overlay.style.opacity = '1';
            });

            setTimeout(function() {
                location.href = location.href + '?_=' + new Date().getTime();
            }, 1200);
        }
    }, 1000);
})();
