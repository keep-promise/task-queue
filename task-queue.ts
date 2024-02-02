/**
 * @description: 实现功能：按顺序一次执行任务，只有等待上一个任务执行完成，才能执行下一个任务
 * @return {*}
 */
type Task = () => Promise<void>;

class TaskQueue {
  queue: Task[] = [];
  running: boolean = false;
  constructor() {
    this.queue = [];
    this.running = false;
  }

  add(task: Task) {
    this.queue.push(task);
    if (!this.running) {
      this.run();
    }
  }

  run() {
    const task: Task = this.queue.shift();
    if (!task) return;
    this.running = true;
    task()
    .then(() => console.log('任务执行正常'))
    .catch(() => console.log('任务执行异常'))
    .finally(() => {
      this.running = false;
      this.run();
    });
  }

  clear() {
    this.queue = [];
    this.running = false;
  }

}

const taskQueue = new TaskQueue();

taskQueue.add(() => new Promise((resolve) => setTimeout(() => {
  console.log(2);
  resolve()
}, 100)))

taskQueue.add(() => new Promise((resolve) => setTimeout(() => {
  console.log(3);
  resolve();
}, 200)))

taskQueue.add(() => new Promise((resolve) => setTimeout(() => {
  console.log(1);
  resolve();
}, 300)))

taskQueue.add(() => new Promise((resolve) => setTimeout(() => {
  console.log(4);
  resolve();
}, 100)))

// 按顺序执行输出 2 3 1 4
