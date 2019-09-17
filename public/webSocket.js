// const ws = new WebSocket(`ws://localhost:5000`);
//
// ws.onmessage = function (event) {
//     console.log(event.data);
//     console.log(JSON.parse(event.data));
//     callback();
//     this.pushToModel((JSON.parse(event.data)));
// };
//
// ws.onopen = function () {
//     console.log('Connection complite');
// };
//
// ws.onclose = function (event) {
//     if (event.wasClean) {
//         console.log('соединение закрыто чисто')
//     } else {
//         console.log('Обрыв соединения');
//     }
// };
//
// ws.onerror = function (error) {
//     console.log(`Error = ` + error.message);
// };

