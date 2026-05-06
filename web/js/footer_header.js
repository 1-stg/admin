function addHeader() {
    const headerHTML = `
        <header class="shadow p-2 rounded-2 mt-3">
            <nav class="row mx-1">
                <li class="col-6 d-flex align-items-center justify-content-start">
                    <a class="d-flex gap-1 text-decoration-none" href="index.html">
                        <img src="web/assets/logo.svg" alt="логотип" class="header_img">
                        <h2 class="fs-5 p-0 mb-0 mt-1">Админ</h2>
                    </a>
                </li>
                <div class="col-6 d-flex justify-content-end">
                    <a href="cars.html" class="d-flex justify-content-end">
                        <img src="web/assets/blank.svg" alt="Объявления" class="w-75">
                    </a>
                    <a href="users.html" class="d-flex justify-content-end">
                        <img src="web/assets/user.svg" alt="Объявления" class="w-75">
                    </a>
                    <img src="/web/assets/sun.svg" alt="Смена темы" class="toggle ms-2 cursor-pointer">
                </div>
            </nav>
        </header>
    `;

    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.insertAdjacentHTML('beforebegin', headerHTML);
    } else {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
}

function addFooter() {
    const footerHTML = `
        <footer class="mt-3 rounded-top-4 p-3 bg-black shadow d-flex justify-content-center align-items-center">
            2026 &copy;
        </footer>
    `;

    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.insertAdjacentHTML('afterend', footerHTML);
    } else {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    addHeader();
    addFooter();
});