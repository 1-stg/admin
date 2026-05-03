const users = [
    {
        id: 1,
        fullName: "Иван Иванов",
        gender: "Мужской",
        age: 25,
        photo: "1.jpg",
        password: "ivan123",
        phone: "+7 (901) 123-45-67",
        email: "ivan.ivanov@example.com"
    },
    {
        id: 2,
        fullName: "Мария Петрова",
        gender: "Женский",
        age: 30,
        photo: "",
        password: "maria2023",
        phone: "+7 (902) 234-56-78",
        email: "maria.petrova@example.com"
    },
    {
        id: 3,
        fullName: "Алексей",
        gender: "Мужской",
        age: 22,
        photo: "",
        password: "alexey123",
        phone: "+7 (903) 345-67-89",
        email: "alexey@example.com"
    },
    {
        id: 4,
        fullName: "Елена Смирнова",
        gender: "Женский",
        age: 28,
        photo: "",
        password: "elena2804",
        phone: "+7 (904) 456-78-90",
        email: "elena.smirnova@example.com"
    },
    {
        id: 5,
        fullName: "Дмитрий",
        gender: "Мужской",
        age: 35,
        photo: "",
        password: "dima1989",
        phone: "+7 (905) 567-89-01",
        email: "dmitry@example.com"
    },
    {
        id: 6,
        fullName: "Анна Козлова",
        gender: "Женский",
        age: 27,
        photo: "",
        password: "anna2712",
        phone: "+7 (906) 678-90-12",
        email: "anna.kozlova@example.com"
    },
    {
        id: 7,
        fullName: "Сергей Новиков",
        gender: "Мужской",
        age: 32,
        photo: "",
        password: "sergey2023",
        phone: "+7 (907) 789-01-23",
        email: "sergey.novikov@example.com"
    },
    {
        id: 8,
        fullName: "Ольга",
        gender: "Женский",
        age: 24,
        photo: "",
        password: "olga2405",
        phone: "+7 (908) 890-12-34",
        email: "olga@example.com"
    },
    {
        id: 9,
        fullName: "Павел Морозов",
        gender: "Мужской",
        age: 29,
        photo: "",
        password: "pavel123",
        phone: "+7 (909) 901-23-45",
        email: "pavel.morozov@example.com"
    },
    {
        id: 10,
        fullName: "Татьяна",
        gender: "Женский",
        age: 26,
        photo: "",
        password: "tatiana2023",
        phone: "+7 (910) 012-34-56",
        email: "tatiana@example.com"
    }
];

const { createApp } = Vue;
createApp({
    data() {
        return {
            users: users,
            searchText: '',
        }
    },

    methods: {
        loadUsers() {
            this.users = users;
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

    computed: {
    }
}).mount('#app')