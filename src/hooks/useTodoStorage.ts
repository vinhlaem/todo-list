/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const isChromeStorageAvailable = () =>
  typeof window !== "undefined" &&
  typeof (window as any).chrome !== "undefined" &&
  !!(window as any).chrome?.storage?.local;

const chromeGet = async (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    (window as any).chrome.storage.local.get({ todos: [] }, (res: any) => {
      resolve(res.todos || []);
    });
  });
};

const chromeSet = async (todos: Todo[]) => {
  return new Promise((resolve) => {
    (window as any).chrome.storage.local.set({ todos }, () =>
      resolve(undefined),
    );
  });
};

export function useTodoStorage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      if (isChromeStorageAvailable()) {
        const data = await chromeGet();
        setTodos(data || []);
      } else if (typeof window !== "undefined") {
        const raw = localStorage.getItem("todos");
        setTodos(raw ? JSON.parse(raw) : []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();

    if (isChromeStorageAvailable()) {
      const listener = (changes: any, areaName: string) => {
        if (areaName === "local" && changes.todos) {
          setTodos(changes.todos.newValue || []);
        }
      };
      (window as any).chrome.storage.onChanged.addListener(listener);
      return () => {
        (window as any).chrome.storage.onChanged.removeListener(listener);
      };
    }
    return;
  }, [load]);

  const save = useCallback(async (next: Todo[]) => {
    if (isChromeStorageAvailable()) {
      await chromeSet(next);
    } else if (typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(next));
    }
    setTodos(next);
  }, []);

  const addTodo = useCallback(
    async (text: string) => {
      const newTodo: Todo = {
        id:
          typeof crypto !== "undefined" && (crypto as any).randomUUID
            ? (crypto as any).randomUUID()
            : String(Date.now()),
        text,
        completed: false,
      };
      setTodos((prev) => {
        const next = [...prev, newTodo];
        void save(next);
        return next;
      });
    },
    [save],
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      setTodos((prev) => {
        const next = prev.filter((t) => t.id !== id);
        void save(next);
        return next;
      });
    },
    [save],
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      setTodos((prev) => {
        const next = prev.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        );
        void save(next);
        return next;
      });
    },
    [save],
  );

  const updateTodo = useCallback(
    async (id: string, text: string) => {
      setTodos((prev) => {
        const next = prev.map((t) => (t.id === id ? { ...t, text } : t));
        void save(next);
        return next;
      });
    },
    [save],
  );

  return {
    todos,
    loading,
    load,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
  } as const;
}
