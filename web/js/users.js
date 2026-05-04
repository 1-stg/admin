const { createApp } = Vue;
createApp({
    data() {
        return {
            users: [],
            searchText: '',
        }
    },

    methods: {
        loadUsers() {
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
        }
    },

    mounted() {
        this.loadUsers();
    }
}).mount('#app')