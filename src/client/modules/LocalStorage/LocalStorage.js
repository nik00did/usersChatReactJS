// export default class LocalStorage {
//
//     setLocalStorage = (key, value) => {
//         localStorage.setItem(key, JSON.stringify(value));
//     };
//
//     getLocalStorage = key => {
//         const json = localStorage.getItem(key);
//         if (json === undefined) {
//             return undefined;
//         }
//         return JSON.parse(json);
//     };
// }