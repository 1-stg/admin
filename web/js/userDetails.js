const { createApp } = Vue;
createApp({
    data() {
        return {
            user: {},
            searchText: '1243',
        }
    },

    methods: {
        findUserById(id) {
            const users = this.getUsers();
            for (let i = 0; i < users.length; i++) {
                if (id == users[i].id) {
                    return [users[i], i];
                }
            }
            return null;
        },

        getCars() {
            return JSON.parse(localStorage.getItem('cars'));
        },

        getUsers() {
            return JSON.parse(localStorage.getItem('users'));
        },

        loadUser() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            this.user = this.findUserById(id)[0];

            const cars = this.getCars();
            const userCars = cars.filter((car) => {
                if(this.user.id == car.userId) {
                    return car;
                }
            })
            this.user.cars = userCars;
        },

        validate() {
            return true;
        },

        updateUser() {
            if (this.validate()) {
                let users = this.getUsers();
                let user = this.findUserById(this.user.id);
                user[0] = {
                    id: this.user.id,
                    fullName: this.user.fullName,
                    gender: this.user.gender,
                    age: this.user.age,
                    photo: this.user.photo,
                    password: this.user.password,
                    phone: this.user.phone,
                    email: this.user.email,
                };
                users.splice(user[1], 1);
                users.splice(user[1], 0, user[0]);

                localStorage.setItem('users', JSON.stringify(users));
                console.log(localStorage);
            }
        },

        search() {
            if (this.searchText.length < 1) {
                if (this.users !== users) {
                    this.loadUsers();
                }
                return;
            }


            this.users = users.filter((user) => {
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
        this.loadUser();
    }


}).mount('#app');