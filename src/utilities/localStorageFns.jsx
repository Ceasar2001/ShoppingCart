
//how the code work
//this function takes two parameters name which is the key we will use to save the data in local storage.
// so local storage only store string data, we use JSON.stringify to convert the data to string before saving it in local storage

export const setItemsInStorage = (name, data) => localStorage?.setItem(name, JSON.stringify(data))

export const getItemFromStorage = (name) => localStorage?.getItem(name)

export const getParsedItemFromStorage = (name) => JSON.parse(localStorage?.getItem(name))

export const removeItemFromStorage = (name) => localStorage?.removeItem(name)