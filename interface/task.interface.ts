interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  uid: string;
  expiresAt: number;
  status: TaskStatus;
  priority: TaskPriority;
}

enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
