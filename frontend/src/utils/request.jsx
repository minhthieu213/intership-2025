import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const fetchColumns = async () => {
  try {
    const response = await axios.get(`${API_URL}/columns`);

    if (response.data.success === true) {
      return response.data.data ?? [];
    } else {
      throw new Error(response.data.message || "Failed to fetch columns");
    }
  } catch (error) {
    console.error("Error fetching columns:", error.message);
    throw new Error("Failed to fetch columns");
  }
};

const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);

    if (response.data.success === true) {
      return response.data.data ?? [];
    } else {
      throw new Error(response.data.message || "Failed to fetch tasks");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error("Failed to fetch tasks");
  }
};

const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);

    if (response.data.success === true) {
      return response.data.data ?? {};
    } else {
      throw new Error(response.data.message || "Failed to create task");
    }
  } catch (error) {
    console.error("Error creating task:", error.message);
    throw new Error("Failed to create task");
  }
};

const updateTask = async ({ id, ...task }) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/update/${id}`, task);

    if (response.data.success === true) {
      return response.data.data ?? {};
    } else {
      throw new Error(response.data.message || "Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error.message);
    throw new Error("Failed to update task");
  }
};

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/update/${id}`);

    if (response.data.success === true) {
      return response.data.data ?? {};
    } else {
      throw new Error(response.data.message || "Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw new Error("Failed to delete task");
  }
};

const updateColumnOrder = async (columnOrder) => {
  try {
    const response = await axios.put(`${API_URL}/columns/order`, {
      columnOrder,
    });

    if (response.data.success === true) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to update column order");
    }
  } catch (error) {
    console.error("Error updating column order:", error.message);
    throw new Error("Failed to update column order");
  }
};

const updateTaskOrder = async ({
  taskId,
  newOrder,
  columnId,
  title,
  description,
}) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/order`, {
      tasks: [
        {
          id: taskId,
          orderTask: newOrder,
          columnId: columnId,
          title: title,
          description: description,
        },
      ],
    });

    if (response.data.success === true) {
      return response.data.data ?? {};
    } else {
      console.log(response);
      throw new Error(response.data.message || "Failed to update task order");
    }
  } catch (error) {
    console.error("Error updating task order:", error.message);
    throw new Error("Failed to update task order");
  }
};

export const useColumns = () => {
  return useQuery({
    queryKey: ["columns"],
    queryFn: fetchColumns,
    staleTime: 5000,
  });
};

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    staleTime: 5000,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

export const useUpdateColumnOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateColumnOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["columns"]);
    },
  });
};

export const useUpdateTaskOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTaskOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};
