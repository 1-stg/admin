const activeAdmin = JSON.parse(localStorage.getItem('activeAdmin'));
console.log(window.location.toString().includes('auth.html'));


if (!window.location.toString().includes('auth.html')) {
    if (!activeAdmin || (Object.keys(activeAdmin).length === 0 && activeAdmin.constructor === Object)) {
        location.href = 'auth.html';
    }
}

const { createApp } = Vue;
createApp({
    data() {
        return {
            login: '',
            password: '',
            isError: false,
        }
    },

    methods: {
        validate() {
            let admins = JSON.parse(localStorage.getItem('admins'));
            let admin = admins.find((admin => {
                if (admin.login == this.login && admin.password == this.password) {
                    return admin;
                }
            }));

            if (admin) {
                localStorage.setItem('activeAdmin', JSON.stringify(admin));
                location.href = 'index.html';
            } else {
                this.isError = true;
            }
        },

        exit() {
            localStorage.activeAdmin = JSON.stringify({});
            location.href = "auth.html";
        }
    },
}).mount('#app');