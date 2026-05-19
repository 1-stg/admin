const { createApp } = Vue;
createApp({
    data() {
        return {
            user: {
                cars: [],
            },
            isToast: false,
            toastText: '',
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
            let userCars = cars.filter((car) => {
                if (this.user.id == car.userId) {
                    return car;
                }
            }).map((car) => {
                return {
                    ...car,
                    activeImage: 0
                };
            });

            this.user.cars = userCars;

            this.$nextTick(() => {
                this.initCarousels();
            });
        },

        nextImage(index) {
            let car = this.user.cars[index];
            let activeImage = car.activeImage;

            activeImage += 1

            if (car.images.length - 1 < activeImage) {
                activeImage = 0
            }

            this.user.cars[index].activeImage = activeImage;
        },

        prevImage(index) {
            let car = this.user.cars[index];
            let activeImage = car.activeImage;

            activeImage -= 1

            if (activeImage < 0) {
                activeImage = car.images.length - 1
            }

            this.user.cars[index].activeImage = activeImage;
        },

        initCarousels() {
            if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                const carousels = document.querySelectorAll('.carousel');
                carousels.forEach(carousel => {
                    const existingCarousel = bootstrap.Carousel.getInstance(carousel);
                    if (existingCarousel) {
                        existingCarousel.dispose();
                    }

                    new bootstrap.Carousel(carousel, {
                        interval: 3000,
                        ride: 'carousel',
                        wrap: true,
                        pause: 'hover'
                    });
                });
            } else {
                console.warn('Bootstrap не загружен, повторная попытка через 100мс');
                setTimeout(() => this.initCarousels(), 100);
            }
        },

        validate() {
            if (!this.user.fullName || this.user.fullName.trim() === '') {
                this.showToast('Пожалуйста, введите ФИО');
                return false;
            }
            if (!this.user.phone || this.user.phone.trim() === '') {
                this.showToast('Пожалуйста, введите телефон');
                return false;
            }
            if (!this.user.email || this.user.email.trim() === '') {
                this.showToast('Пожалуйста, введите email');
                return false;
            }
            return true;
        },

        updateUser(toastText) {
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
                    status: this.user.status
                };
                users.splice(user[1], 1);
                users.splice(user[1], 0, user[0]);


                localStorage.setItem('users', JSON.stringify(users));
                this.showToast(toastText);
            }
        },

        toggleStatus(id) {
            let users = this.getUsers();
            const userIndex = users.findIndex(user => user.id === id);

            if (userIndex !== -1) {
                const newStatus = users[userIndex].status === 'active' ? 'blocked' : 'active';
                users[userIndex].status = newStatus;

                localStorage.setItem('users', JSON.stringify(users));

                if (this.user && this.user.id === id) {
                    this.user.status = newStatus;
                }
            } else {
                console.log('Пользователь не найден');
            }
        },

        deleteUser() {
            if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
                let users = this.getUsers();
                let user = this.findUserById(this.user.id);
                users.splice(user[1], 1);

                localStorage.setItem('users', JSON.stringify(users));
                location.href = '/admin/users.html?toast=Пользователь%20удалён';
                console.log(localStorage);
            }
        },

        showToast(text) {
            this.isToast = true;
            this.toastText = text;
            setTimeout(() => {
                this.isToast = false;
                this.toastText = '';
            }, 10000);
        }
    },

    mounted() {
        this.loadUser();
    },

    watch: {
        'user.cars': {
            handler(newCars) {
                if (newCars && newCars.length > 0) {
                    this.$nextTick(() => {
                        this.initCarousels();
                    });
                }
            },
            deep: true
        }
    }

}).mount('#app');