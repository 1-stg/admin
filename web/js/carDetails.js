const { createApp } = Vue;
createApp({
    data() {
        return {
            car: {},
            searchText: '',
        }
    },

    methods: {
        findCarById(id) {
            const cars = this.getCars();
            for (let i = 0; i < cars.length; i++) {
                if (id == cars[i].id) {
                    return [cars[i], i];
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

        loadCar() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            this.car = this.findCarById(id)[0];
        },

        validate() {
            return true;
        },

        updateCar() {
            if (this.validate()) {
                let cars = this.getCars();
                let car = this.findCarById(this.car.id);
                car[0] = {
                    'id': this.car.id,
                    'userId': this.car.userId,
                    'images': this.car.images,
                    'mark': this.car.mark,
                    'model': this.car.model,
                    'title': this.car.title,
                    'price': this.car.price,
                    'mileage': this.car.mileage,
                    'year': this.car.age,
                    'ownersCount': this.car.ownersCount,
                    'gearbox': this.car.gearbox,
                    'color': this.car.color,
                    'engine': this.car.engine,
                    'driveShaft': this.car.driveShaft,
                    'status': this.car.status,
                };
                cars.splice(cars[1], 1);
                cars.splice(cars[1], 0, car[0]);

                localStorage.setItem('cars', JSON.stringify(cars));
            }
        },

        toggleStatus(id) {
            let cars = this.getCars();
            const carIndex = cars.findIndex(user => user.id === id);

            if (carIndex !== -1) {
                const newStatus = cars[carIndex].status === 'active' ? 'blocked' : 'active';
                cars[carIndex].status = newStatus;

                localStorage.setItem('cars', JSON.stringify(cars));

                if (this.car && this.car.id === id) {
                    this.car.status = newStatus;
                }
            } else {
                console.log('Пользователь не найден');
            }
        },

        deleteCar() {
            let cars = this.getCars();
            let car = this.findCarById(this.car.id);
            cars.splice(car[1], 1);

            localStorage.setItem('cars', JSON.stringify(cars));
            location.href = '/cars.html';
        },
    },

    mounted() {
        this.loadCar();
    }


}).mount('#app');