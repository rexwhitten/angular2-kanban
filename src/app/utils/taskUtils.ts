class TaskStatus {
    public static get TODO(): string { return 'todo'; }
    public static get IN_PROGRESS(): string { return 'inprogress'; }
    public static get DONE(): string { return 'done'; }
}

class TaskPriority {
    public static get CRITICAL(): number { return 0; }
    public static get MAJOR(): number { return 1; }
    public static get MINOR(): number { return 2; }
}

export {TaskStatus, TaskPriority};
