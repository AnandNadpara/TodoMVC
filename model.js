class Todo {
    constructor(todoArr) {
        this.todoArr = [];
        this.todoArr = todoArr;
        this.state = "All";
    }
    getTodo() {
        return this.todoArr;
    }
    getState() {
        return this.state;
    }
    getLastId() {
        return this.todoArr.length ? this.todoArr[this.todoArr.length - 1].id + 1 : 1;
    }
    add(obj) {
        this.todoArr.push(obj);
    }
    destroy(destroyID) {
        this.todoArr = this.todoArr.filter(item => item.id != destroyID);
    }
    filterState(state) {
        this.state = state;
    }
    changeState(toggleID) {
        this.todoArr = this.todoArr.map(item => {
            if (item.id == toggleID) {
                item.status = !item.status;
            }
            return item;
        });
    }
    clearCompleted() {
        this.todoArr = this.todoArr.filter(item => item.status !== true);
    }
    selectAll() {
        let counter = this.todoArr.reduce((x, y) => x + (y.status ? 1 : 0), 0);
        let flag = true;
        if (counter == this.todoArr.length)
            flag = false;
        this.todoArr.forEach(item => {
            item.status = flag;
        });
    }
    searchInTodo(target) {
        let flag = '';
        if (!target)
            return flag;
        this.todoArr.map(item => {
            if (!flag && item.task.indexOf(target) === 0)
                flag = item.task;
        });
        return flag;
    }
    itemsActive() {
        return this.todoArr.filter(item => !item.status).length;
    }
}
export default Todo;
