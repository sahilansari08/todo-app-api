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
let s = list[0]
console.log(s);
const list2 = Object.keys(s)
// console.log(list2);
console.log(!list2.includes("title") && !list2.includes("completed"))

