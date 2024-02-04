/**
 * @description: 实现功能：按指定顺序执行任务，如果该位置的任务没有进入队列，阻塞执行
 *                       只有等待该任务进入队列，继续开始执行该任务
 * @return {*}
 */

class TaskQueue {
  queue = [];
  running = false;
  nextIndex = 0;
  constructor() {
    this.queue = [];
    this.running = false;
    this.nextIndex = 0;
  }

  addTaskByIndex(index, task) {
    this.queue[index] = task;
    if (!this.running && this.nextIndex == index) {
      this.runByIndex();
    }
  }

  runByIndex() {
    // console.log('runByIndex', this.nextIndex, this.queue)
    const currentIndex = this.nextIndex;
    const task = this.queue[this.nextIndex];
    if (!task) return;
    this.running = true;
    task()
      .then(() => console.log(`任务${currentIndex}执行正常`))
      .catch(() => console.log(`任务${currentIndex}执行异常`))
      .finally(() => {
        this.running = false;
        this.nextIndex = currentIndex + 1;
        this.runByIndex();
      });
  }

  clear() {
    this.queue = [];
    this.nextIndex = 0;
    this.running = false;
  }
}

const taskQueue = new TaskQueue();

taskQueue.addTaskByIndex(0,
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log(0);
        resolve();
      }, 100)
    )
);

taskQueue.addTaskByIndex(4,
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log(4);
        resolve();
      }, 200)
    )
);

taskQueue.addTaskByIndex(2,
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log(2);
        resolve();
      }, 300)
    )
);

taskQueue.addTaskByIndex(3,
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log(3);
        resolve();
      }, 100)
    )
);

taskQueue.addTaskByIndex(1,
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log(1);
        resolve();
      }, 100)
    )
);

// 按指定顺序任务0,1,2,3,4 输出0 1 2 3 4
