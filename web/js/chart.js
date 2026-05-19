(function () {
    const usersMonthly = [42, 58, 72, 88, 104, 135, 162, 198, 225, 270, 310, 365];
    const adsMonthly = [18, 24, 31, 39, 47, 58, 69, 84, 97, 112, 130, 148];
    const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

    const adsActive = 1240;
    const adsBlocked = 312;
    const adsArchived = 568;
    const totalAds = adsActive + adsBlocked + adsArchived;
    const adsActivePercent = Math.round((adsActive / totalAds) * 100);
    const adsBlockedPercent = Math.round((adsBlocked / totalAds) * 100);
    const adsArchivedPercent = 100 - adsActivePercent - adsBlockedPercent;

    const subscriptionIncome = 84500;
    const promotionIncome = 37200;
    const totalEarnings = subscriptionIncome + promotionIncome;
    const subscriptionsPercent = Math.round((subscriptionIncome / totalEarnings) * 100);
    const promotionPercent = 100 - subscriptionsPercent;

    const formatMoney = (value) => {
        return value.toLocaleString('ru-RU') + ' ₽';
    };

    const CIRCUMFERENCE = 282.743;

    function getDashArray(percent) {
        const dash = (percent / 100) * CIRCUMFERENCE;
        return `${dash} ${CIRCUMFERENCE - dash}`;
    }

    function getOffset(prevPercentSum) {
        const offset = (prevPercentSum / 100) * CIRCUMFERENCE;
        return -offset;
    }

    const app = Vue.createApp({
        data() {
            return {
                usersCount: [...usersMonthly],
                advertisementCount: [...adsMonthly],
                months: [...monthNames],
                currentYear: new Date().getFullYear(),
                currentDate: new Date().toLocaleDateString('ru-RU'),
                adsActiveCount: adsActive,
                adsBlockedCount: adsBlocked,
                adsArchivedCount: adsArchived,
                adsActivePercent: adsActivePercent,
                adsBlockedPercent: adsBlockedPercent,
                adsArchivedPercent: adsArchivedPercent,
                subscriptionAmount: subscriptionIncome,
                promotionAmount: promotionIncome,
                subscriptionsPercent: subscriptionsPercent,
                promotionPercent: promotionPercent,
                adsColors: {
                    active: '#353535',
                    blocked: '#a8a8a8',
                    archived: '#6c757d'
                },
                earnColors: {
                    subscriptions: '#4a6a85',
                    promotion: '#ffffff'
                },
                windowWidth: window.innerWidth,
                maxBarHeightUsers: 150,
                maxBarHeightAds: 150
            }
        },
        computed: {
            totalUsersFormatted() {
                return this.usersCount.reduce((a, b) => a + b, 0).toLocaleString('ru-RU');
            },
            totalAdsCountFormatted() {
                return totalAds.toLocaleString('ru-RU');
            },
            totalAdsNewFormatted() {
                return this.advertisementCount.reduce((a, b) => a + b, 0).toLocaleString('ru-RU');
            },
            totalEarningsFormatted() {
                return formatMoney(totalEarnings);
            },
            subscriptionsAmountFormatted() {
                return formatMoney(subscriptionIncome);
            },
            promotionAmountFormatted() {
                return formatMoney(promotionIncome);
            },
            maxUsersValue() {
                return Math.max(...this.usersCount, 1);
            },
            maxAdsValue() {
                return Math.max(...this.advertisementCount, 1);
            }
        },
        mounted() {
            this.updateMaxHeights();
            window.addEventListener('resize', this.handleResize);
            this.updateThemeColors();
            this.observeThemeChanges();
        },
        beforeUnmount() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            handleResize() {
                this.windowWidth = window.innerWidth;
                this.updateMaxHeights();
            },
            updateMaxHeights() {
                const width = this.windowWidth;
                let heightVal = 150;
                if (width < 576) heightVal = 100;
                else if (width < 768) heightVal = 120;
                else if (width < 992) heightVal = 140;
                else heightVal = 160;
                this.maxBarHeightUsers = heightVal;
                this.maxBarHeightAds = heightVal;
            },
            getBarHeight(count, type) {
                let maxCount = type === 'users' ? this.maxUsersValue : this.maxAdsValue;
                let maxH = type === 'users' ? this.maxBarHeightUsers : this.maxBarHeightAds;
                if (maxCount === 0) return 30;
                const ratio = count / maxCount;
                return Math.max(30, ratio * maxH);
            },
            getInnerHeight(count, type) {
                let maxCount = type === 'users' ? this.maxUsersValue : this.maxAdsValue;
                if (maxCount === 0) return 0;
                const ratio = count / maxCount;
                let percent = ratio * 100;
                return Math.min(Math.max(percent, 5), 95);
            },
            formatNumber(num) {
                return num.toLocaleString('ru-RU');
            },
            getAdsActiveDash() {
                return getDashArray(this.adsActivePercent);
            },
            getAdsBlockedDash() {
                return getDashArray(this.adsBlockedPercent);
            },
            getAdsBlockedOffset() {
                return getOffset(this.adsActivePercent);
            },
            getAdsArchivedDash() {
                return getDashArray(this.adsArchivedPercent);
            },
            getAdsArchivedOffset() {
                return getOffset(this.adsActivePercent + this.adsBlockedPercent);
            },
            getSubscriptionsDash() {
                return getDashArray(this.subscriptionsPercent);
            },
            getPromotionDash() {
                return getDashArray(this.promotionPercent);
            },
            getPromotionOffset() {
                return getOffset(this.subscriptionsPercent);
            },
            updateThemeColors() {
                const isDark = document.body.getAttribute('data-bs-theme') === 'dark';
                if (isDark) {
                    this.adsColors = {
                        active: '#a7a7a7',
                        blocked: '#6e6e6e',
                        archived: '#474747'
                    };
                    this.earnColors = {
                        subscriptions: '#686868',
                        promotion: '#cecece'
                    };
                } else {
                    this.adsColors = {
                        active: '#919191',
                        blocked: '#434343',
                        archived: '#6c757d'
                    };
                    this.earnColors = {
                        subscriptions: '#bfbfbf',
                        promotion: '#454545'
                    };
                }
            },
            observeThemeChanges() {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.attributeName === 'data-bs-theme') {
                            this.updateThemeColors();
                        }
                    });
                });
                observer.observe(document.body, { attributes: true });
            }
        }
    });

    app.mount('#app');
})();