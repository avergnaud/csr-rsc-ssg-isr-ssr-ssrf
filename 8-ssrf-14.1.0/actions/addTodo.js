'use server';

export default async function addTodo(formData) {

    const todoItem = formData.get('todo');
    if (!todoItem) {
        // redirect ?
        console.log('ko');
        return;
    }
    console.log('ok');
}