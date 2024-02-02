
/**
 * @description: 实现功能：最大可执行并发任务
 * @return {*}
 */
class Scheduler {

  constructor(max) {
    // 最大可并发任务数
    this.max = max;
    // 当前并发任务数
    this.count = 0;
    // 阻塞的任务队列
    this.queue = [];
  }

  add(fn) {
    this.queue.push(fn);
    this.next();
  }

  next() {
    if (this.count < this.max && this.queue.length) {
      this.count++;
      const fn = this.queue.shift();
      fn().then(res => {
      }).catch(err => {
      }).finally(() => {
        this.count--;
        this.next();
      })
    }
  }
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const scheduler = new Scheduler(2);

const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => console.log(val));
  });
};



addTask(1000, '1');
console.log('scheduler1', scheduler)
addTask(500, '2');
// console.log('scheduler2', scheduler)
addTask(300, '3');
// console.log('scheduler3', scheduler)
addTask(400, '4');
// console.log('scheduler4', scheduler)

// 最大并发数是2，任务1和任务2同时并发执行，任务2先执行完成，时间过去500ms，
// 任务3加并发，任务1还需要500ms执行，任务3执行300ms完成，加入任务4
// 任务还剩200ms执行完，因此任务1执行完成，最后任务4执行完成
// 2
// 3
// 1
// 4
