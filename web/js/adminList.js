const admins = [{
    login: 'vasya123',
    password: '123456',
},
{
    login: 'gleb',
    password: '1234567',
},
{
    login: 'ivan',
    password: '12345678',
},]

localStorage.setItem('admins', JSON.stringify(admins));
localStorage.setItem('activeAdmin', JSON.stringify({}));