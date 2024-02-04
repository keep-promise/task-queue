/**
 * @description: 实现功能：最大可执行并发任务
 */
var ConcurrentTask = /** @class */ (function () {
    function ConcurrentTask(max) {
        if (max === void 0) { max = 5; }
        this.max = max;
        this.count = 0;
        this.queue = [];
    }
    /**
     * @description: 添加任务队列
     * @param {Task} task
     * @return {*}
     */
    ConcurrentTask.prototype.add = function (task) {
        this.queue.push(task);
        this.next();
    };
    /**
     * @description: 继续任务
     * @return {*}
     */
    ConcurrentTask.prototype.next = function () {
        var _this = this;
        if (this.count >= this.max)
            return;
        var task = this.queue.shift();
        if (!task)
            return;
        this.count++;
        task().then().catch().finally(function () {
            _this.count--;
            _this.next();
        });
    };
    return ConcurrentTask;
}());
export { ConcurrentTask };
/**
 * @description: 实现功能：按顺序一次执行任务，只有等待上一个任务执行完成，才能执行下一个任务
 */
var TaskQueue = /** @class */ (function () {
    function TaskQueue() {
        this.queue = [];
        this.running = false;
    }
    TaskQueue.prototype.add = function (task) {
        this.queue.push(task);
        if (!this.running) {
            this.run();
        }
    };
    TaskQueue.prototype.run = function () {
        var _this = this;
        var task = this.queue.shift();
        if (!task)
            return;
        this.running = true;
        task().then().catch().finally(function () {
            _this.running = false;
            _this.run();
        });
    };
    TaskQueue.prototype.clear = function () {
        this.queue = [];
        this.running = false;
    };
    return TaskQueue;
}());
export { TaskQueue };
var TaskQueueIndex = /** @class */ (function () {
    function TaskQueueIndex() {
        this.queue = [];
        this.nextIndex = 0;
        this.running = false;
    }
    TaskQueueIndex.prototype.add = function (index, task) {
        this.queue[index] = task;
        if (!this.running && this.nextIndex === index) {
            this.run();
        }
    };
    TaskQueueIndex.prototype.run = function () {
        var _this = this;
        var currentIndex = this.nextIndex;
        var task = this.queue[currentIndex];
        task().finally(function () {
            _this.nextIndex = currentIndex + 1;
            _this.running = false;
            _this.run();
        });
    };
    TaskQueueIndex.prototype.clear = function () {
        this.queue = [];
        this.running = false;
        this.nextIndex = 0;
    };
    return TaskQueueIndex;
}());
export { TaskQueueIndex };
var TaskScheduler = {
    ConcurrentTask: ConcurrentTask,
    TaskQueue: TaskQueue,
    TaskQueueIndex: TaskQueueIndex
};
export default TaskScheduler;
//# sourceMappingURL=index.js.map