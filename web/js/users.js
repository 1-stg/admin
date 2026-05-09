const { createApp } = Vue;
createApp({
    data() {
        return {
            users: [],
            searchText: '',
            isToast: false,
            toastText: '',
        }
    },

    methods: {
        loadUsers() {
            if (localStorage.length == 0) {
                this.users = [];
                return;
            }

            this.users = JSON.parse(localStorage.getItem('users'));
            return this.users;
        },

        search() {
            if (this.searchText.length < 1) {
                if (this.users !== localStorage.getItem('users')) {
                    this.loadUsers();
                }
                return;
            }

            this.users = this.loadUsers().filter((user) => {
                if (user.fullName.toLowerCase().includes(this.searchText.toLowerCase())) {
                    return user;
                }

                if (user.phone.toLowerCase().includes(this.searchText.toLowerCase())) {
                    return user;
                }

                if (user.email.toLowerCase().includes(this.searchText.toLowerCase())) {
                    return user;
                }
            })
        },

        urlToast() {
            let url = new URLSearchParams(window.location.search);
            let toast = null;
            try {
                toast = url.get('toast');
            } catch {
                console.log('нет тоста');
            }

            if (toast) {
                this.showToast(toast);
            }
        },

        showToast(text = null) {
            this.isToast = true;
            this.toastText = text;
            setTimeout(() => {
                this.isToast = false;
                this.toastText = '';
            }, 10000);
        },

        loadDataFromLocalstorage() {
            localStorage.setItem('cars', JSON.stringify(cars));
            localStorage.setItem('users', JSON.stringify(users));
            this.loadUsers();
        },

        clearData() {
            localStorage.setItem("users", JSON.stringify({}));
            this.loadUsers();
        }

    },

    mounted() {
        this.loadUsers();
        this.urlToast();
    }
}).mount('#app')