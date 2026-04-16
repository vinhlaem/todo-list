import React, { useState } from "react";
import { useTodoStorage } from "./hooks/useTodoStorage";

const IconTrash = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 11v6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 11v6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconEdit = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 21v-3l11-11 3 3L6 21H3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 7l3 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCheck = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconX = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function App() {
  const { todos, loading, addTodo, deleteTodo, toggleTodo, updateTodo } =
    useTodoStorage();
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleAdd = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    await addTodo(trimmed);
    setText("");
  };

  return (
    <div className="app-root">
      <main className="container">
        <h1 className="title">Todo (simple)</h1>

        <div className="row">
          <input
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New task"
          />
          <button className="btn primary" onClick={handleAdd}>
            Add
          </button>
        </div>

        <div className="row">
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {todos.length === 0 ? (
              <div className="muted">No tasks yet</div>
            ) : (
              (() => {
                const filtered = todos.filter((t) =>
                  filter === "all"
                    ? true
                    : filter === "active"
                      ? !t.completed
                      : t.completed,
                );
                if (filtered.length === 0)
                  return <div className="muted">No tasks found</div>;
                return (
                  <ul className="list">
                    {filtered.map((t) => (
                      <li key={t.id} className="todo-item">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleTodo(t.id)}
                            className="checkbox"
                          />
                          {editingId === t.id ? (
                            <input
                              className="input"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                            />
                          ) : (
                            <span
                              className={`todo-text ${t.completed ? "line-through" : ""}`}
                            >
                              {t.text}
                            </span>
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          {editingId === t.id ? (
                            <>
                              <button
                                className="btn-icon btn-save"
                                onClick={async () => {
                                  const trimmed = editingText.trim();
                                  if (trimmed) await updateTodo(t.id, trimmed);
                                  setEditingId(null);
                                }}
                                aria-label="Save"
                              >
                                <IconCheck size={16} />
                              </button>
                              <button
                                className="btn-icon"
                                onClick={() => setEditingId(null)}
                                aria-label="Cancel"
                              >
                                <IconX size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn-icon"
                                onClick={() => {
                                  setEditingId(t.id);
                                  setEditingText(t.text);
                                }}
                                aria-label="Edit"
                              >
                                <IconEdit size={16} />
                              </button>
                              <button
                                className="btn-icon btn-danger"
                                onClick={() => deleteTodo(t.id)}
                                aria-label="Delete"
                              >
                                <IconTrash size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                );
              })()
            )}
          </>
        )}
      </main>
    </div>
  );
}
