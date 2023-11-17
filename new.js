var list = [
    {
        "title": "Ghumne jana hai",
        "completed": false,
    },
    {
        "id": 1,
        "title": "Nahane jana hai",
        "completed": false,
        "created_at": "2023-11-10T13:54:12.459Z",
        "updated_at": null
    },
]
// for (let item of list){
//     if (item.id == 1){
//         // list.pop(list.indexOf(item))
//         item.title = "pratik "
//     }
// }
// let s = list[0]
// console.log(s);
// const list2 = Object.keys(s)
// // console.log(list2);
// console.log(!list2.includes("title") && !list2.includes("completed"))

// const bcryptjs = require('bcryptjs');s

// const password = '123';

// // const en_pass = bcryptjs.hashSync(password, 1);
// // console.log(en_pass);


// const bc = "$2a$08$JPaVMPLgUD13mugR7UILl.S0SlWqTRseZwGyjkSIWmPwDfe8GCIY2"
// const isValid = bcryptjs.compareSync("123", bc)
// console.log(isValid);

const jwt = require('jsonwebtoken');

// Secret key used to sign and verify the JWT
const secretKey = 'your_secret_key';

// User information to be included in the token
const user = {
  id: 123,
  username: 'example_user',
  role: 'admin',
};

// Create a JWT
const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

console.log('Generated JWT:', token);

// Verify the JWT
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('JWT verification failed:', err.message);
  } else {
    console.log('Decoded JWT:', decoded);
  }
});
