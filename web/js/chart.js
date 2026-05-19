// Инициализация Vue приложения
const app = Vue.createApp({
    data() {
        return {
            usersCount: [42, 58, 72, 88, 104, 135, 162, 198, 225, 270, 310, 365],
            months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            maxHeight: 150
        }
    },
    computed: {
        maxCount() {
            return Math.max(...this.usersCount, 1);
        }
    },
    mounted() {
        this.updateMaxHeight();
        window.addEventListener('resize', this.updateMaxHeight);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateMaxHeight);
    },
    methods: {
        updateMaxHeight() {
            const width = window.innerWidth;
            if (width < 576) {
                this.maxHeight = 100;
            } else if (width < 768) {
                this.maxHeight = 120;
            } else if (width < 992) {
                this.maxHeight = 140;
            } else {
                this.maxHeight = 160;
            }
        },
        getBarHeight(count) {
            if (this.maxCount === 0) return 30;
            const ratio = count / this.maxCount;
            return Math.max(30, ratio * this.maxHeight);
        },
        getInnerHeight(count) {
            if (this.maxCount === 0) return 0;
            const ratio = count / this.maxCount;
            let percent = ratio * 100;
            return Math.min(Math.max(percent, 5), 95);
        },
        formatNumber(num) {
            return num.toLocaleString('ru-RU');
        }
    }
});

app.mount('#app');