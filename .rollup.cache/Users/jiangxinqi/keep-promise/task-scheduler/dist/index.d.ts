/**
 * @description: 实现功能：最大可执行并发任务
 */
declare type ITask = () => Promise<any>;
export declare class ConcurrentTask {
    max: number;
    count: number;
    queue: ITask[];
    constructor(max?: number);
    /**
     * @description: 添加任务队列
     * @param {Task} task
     * @return {*}
     */
    add(task: ITask): void;
    /**
     * @description: 继续任务
     * @return {*}
     */
    next(): void;
}
/**
 * @description: 实现功能：按顺序一次执行任务，只有等待上一个任务执行完成，才能执行下一个任务
 */
export declare class TaskQueue {
    running: boolean;
    queue: ITask[];
    constructor();
    add(task: ITask): void;
    run(): void;
    clear(): void;
}
export declare class TaskQueueIndex {
    queue: ITask[];
    nextIndex: number;
    running: boolean;
    constructor();
    add(index: number, task: ITask): void;
    run(): void;
    clear(): void;
}
declare const TaskScheduler: {
    ConcurrentTask: typeof ConcurrentTask;
    TaskQueue: typeof TaskQueue;
    TaskQueueIndex: typeof TaskQueueIndex;
};
export default TaskScheduler;
