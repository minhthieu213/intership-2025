import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🟢 Fetch columns
const fetchColumns = async () => {
  try {
    const response = await fetch(`${API_URL}/columns`);
    const data = await response.json();

    if (data.success) {
      return data.data ?? [];
    } else {
      throw new Error(data.message || "Failed to fetch columns");
    }
  } catch (error) {
    console.error("Error fetching columns:", error.message);
    throw new Error("Failed to fetch columns");
  }
};

// 🟢 Fetch tasks
const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();

    if (data.success) {
      return data.data ?? [];
    } else {
      throw new Error(data.message || "Failed to fetch tasks");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error("Failed to fetch tasks");
  }
};

// 🟢 Create task
const createTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await response.json();

    if (data.success) {
      return data.data ?? {};
    } else {
      throw new Error(data.message || "Failed to create task");
    }
  } catch (error) {
    console.error("Error creating task:", error.message);
    throw new Error("Failed to create task");
  }
};

// 🟢 Update task
const updateTask = async ({ id, ...task }) => {
  try {
    const response = await fetch(`${API_URL}/tasks/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await response.json();

    if (data.success) {
      return data.data ?? {};
    } else {
      throw new Error(data.message || "Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error.message);
    throw new Error("Failed to update task");
  }
};

// 🟢 Delete task
const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tasks/update/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      return data.data ?? {};
    } else {
      throw new Error(data.message || "Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw new Error("Failed to delete task");
  }
};

// 🟢 Update column order
const updateColumnOrder = async (columnOrder) => {
  try {
    const response = await fetch(`${API_URL}/columns/order`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ columnOrder }),
    });

    const data = await response.json();

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Failed to update column order");
    }
  } catch (error) {
    console.error("Error updating column order:", error.message);
    throw new Error("Failed to update column order");
  }
};

// 🟢 Update task order
const updateTaskOrder = async ({ taskId, newOrder, columnId, title, description }) => {
  try {
    const response = await fetch(`${API_URL}/tasks/order`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tasks: [{ id: taskId, orderTask: newOrder, columnId, title, description }],
      }),
    });

    const data = await response.json();

    if (data.success) {
      return data.data ?? {};
    } else {
      throw new Error(data.message || "Failed to update task order");
    }
  } catch (error) {
    console.error("Error updating task order:", error.message);
    throw new Error("Failed to update task order");
  }
};

// 🟢 Hooks sử dụng react-query
export const useColumns = () => useQuery({ queryKey: ["columns"], queryFn: fetchColumns, staleTime: 5000 });

export const useTasks = () => useQuery({ queryKey: ["tasks"], queryFn: fetchTasks, staleTime: 5000 });

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });
};

export const useUpdateColumnOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateColumnOrder,
    onSuccess: () => queryClient.invalidateQueries(["columns"]),
  });
};

export const useUpdateTaskOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTaskOrder,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });
};
