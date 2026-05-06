const { createApp } = Vue;
createApp({
    data() {
        return {
            cars: [],
            searchText: '',
        }
    },

    methods: {
        loadCars() {
            if (localStorage.length == 0) {
                this.cars = [];
                return;
            }

            this.cars = JSON.parse(localStorage.getItem('cars')).map((car) => {
                return {
                    ...car,
                    activeImage: 0
                };
            });

            return this.cars;
        },

        nextImage(index) {
            let car = this.cars[index];
            let activeImage = car.activeImage;

            activeImage += 1

            if (car.images.length - 1 < activeImage) {
                activeImage = 0
            }

            this.cars[index].activeImage = activeImage;
        },

        prevImage(index) {
            let car = this.cars[index];
            let activeImage = car.activeImage;

            activeImage -= 1

            if (activeImage < 0) {
                activeImage = car.images.length - 1
            }

            this.cars[index].activeImage = activeImage;
        },

        search() {
            if (this.searchText.length < 1) {
                if (this.cars !== localStorage.getItem('cars')) {
                    this.loadCars();
                }
                return;
            }

            this.cars = this.loadCars().filter((car) => {
                if (car.title.toLowerCase().includes(this.searchText.toLowerCase())) {
                    return car;
                }

                if (car.price.toLowerCase().includes(this.searchText.toLowerCase())) {
                    return car;
                }

                if (car.mileage.toLowerCase().includes(this.searchText.toLowerCase())) {
                    return car;
                }
            })
        },

        loadDataFromLocalstorage() {
            localStorage.setItem('cars', JSON.stringify(cars));
            localStorage.setItem('users', JSON.stringify(users));
            this.loadCars();
        },

        clearData() {
            localStorage.clear();
            this.loadCars();
        }

    },

    mounted() {
        this.loadCars();
    }
}).mount('#app')