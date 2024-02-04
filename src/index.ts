/**
 * @description: 实现功能：最大可执行并发任务
 */

type Task = () => Promise<any>;

export class ConcurrentTask {
  max: number;
  count: number;
  queue: Task[];

  constructor(max: number = 5) {
    this.max = max;
    this.count = 0;
    this.queue = [];
  }

  /**
   * @description: 添加任务队列
   * @param {Task} task
   * @return {*}
   */  
  add(task: Task) {
    this.queue.push(task);
    this.next();
  }

  /**
   * @description: 继续任务
   * @return {*}
   */  
  next() {
    if (this.count >= this.max) return;
    const task: Task = this.queue.shift();
    if (!task) return;
    this.count++;
    task().then().catch().finally(() => {
      this.count--;
      this.next();
    });
  }
}

/**
 * @description: 实现功能：按顺序一次执行任务，只有等待上一个任务执行完成，才能执行下一个任务
 */
export class TaskQueue {
  running: boolean;
  queue: Task[];

  constructor() {
    this.queue = [];
    this.running = false;
  }

  add(task: Task) {
    this.queue.push(task);
    if(!this.running) {
      this.run();
    }
  }

  run() {
    const task: Task = this.queue.shift();
    if (!task) return;
    this.running = true;
    task().then().catch().finally(() => {
      this.running = false;
      this.run();
    });
  }

  clear() {
    this.queue = [];
    this.running = false;
  }

}

export class TaskQueueIndex {
  queue: Task[];
  nextIndex: number;
  running: boolean;

  constructor() {
    this.queue = [];
    this.nextIndex = 0;
    this.running = false;
  }

  add(index: number, task: Task) {
    this.queue[index] = task;
    if (!this.running && this.nextIndex === index) {
      this.run();
    }
  }

  run() {
    const currentIndex = this.nextIndex;
    const task: Task = this.queue[currentIndex];
    task().finally(() => {
      this.nextIndex = currentIndex + 1;
      this.running = false;
      this.run();
    });

  }

  clear() {
    this.queue = [];
    this.running = false;
    this.nextIndex = 0;
  }
}

export default {
  ConcurrentTask,
  TaskQueue,
  TaskQueueIndex
}