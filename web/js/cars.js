const { createApp } = Vue;
createApp({
    data() {
        return {
            cars: [],
            searchText: '',
            isToast: false,
            toastText: '',
        }
    },

    methods: {
        loadCars() {
            try {
                const storedCars = JSON.parse(localStorage.getItem('cars'));
                if (storedCars && Array.isArray(storedCars)) {
                    this.cars = storedCars.map((car) => {
                        return {
                            ...car,
                            images: car.images || [],
                            activeImage: 0
                        };
                    });
                } else {
                    this.cars = [];
                }
            } catch {
                this.cars = [];
            }

            this.$nextTick(() => {
                this.initCarousels();
            });

            return this.cars;
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

        nextImage(index) {
            if (this.cars[index] && this.cars[index].images.length > 1) {
                let car = this.cars[index];
                let activeImage = car.activeImage;
                activeImage = (activeImage + 1) % car.images.length;
                this.cars[index].activeImage = activeImage;
            }
        },

        showToast(text) {
            this.isToast = true;
            this.toastText = text;
            setTimeout(() => {
                this.isToast = false;
                this.toastText = '';
            }, 10000);
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

        prevImage(index) {
            if (this.cars[index] && this.cars[index].images.length > 1) {
                let car = this.cars[index];
                let activeImage = car.activeImage;
                activeImage = activeImage - 1;
                if (activeImage < 0) {
                    activeImage = car.images.length - 1;
                }
                this.cars[index].activeImage = activeImage;
            }
        },

        search() {
            if (this.searchText.length < 1) {
                this.loadCars();
                return;
            }

            const allCars = JSON.parse(localStorage.getItem('cars')) || [];
            this.cars = allCars.filter((car) => {
                if (car.title && car.title.toLowerCase().includes(this.searchText.toLowerCase())) {
                    return true;
                }

                if (car.price && car.price.toLowerCase().includes(this.searchText.toLowerCase())) {
                    return true;
                }

                if (car.mileage && car.mileage.toLowerCase().includes(this.searchText.toLowerCase())) {
                    return true;
                }

                return false;
            }).map((car) => {
                return {
                    ...car,
                    images: car.images || [],
                    activeImage: 0
                };
            });

            this.$nextTick(() => {
                this.initCarousels();
            });
        },

        loadDataFromLocalstorage() {
            if (typeof cars !== 'undefined' && typeof users !== 'undefined') {
                localStorage.setItem('cars', JSON.stringify(cars));
                localStorage.setItem('users', JSON.stringify(users));
                this.loadCars();
                this.showToast('Данные успешно загружены');
            } else {
                this.showToast('Ошибка: данные не найдены');
            }
        },
        

        clearData() {
            localStorage.setItem("cars", JSON.stringify([]));
            this.loadCars();
            this.showToast('Данные очищены');
        }
    },

    mounted() {
        this.loadCars();
        this.urlToast();
    },

    watch: {
        cars: {
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