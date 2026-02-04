"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface AddTodoInputProps {
  onAdd: (title: string) => void;
}

export function AddTodoInput({ onAdd }: AddTodoInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSubmit = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
      // Keep expanded for rapid entry
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setValue("");
      setIsExpanded(false);
    }
  };

  const handleBlur = () => {
    // Small delay to allow click on submit button
    setTimeout(() => {
      if (!value.trim()) {
        setIsExpanded(false);
      }
    }, 150);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-neu transition-all duration-200 hover:bg-accent-hover hover:shadow-neu-sm active:shadow-neu-pressed sm:bottom-8 sm:right-8"
        aria-label="Add new task"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neu-bg p-4 shadow-neu sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:rounded-[24px]">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="What needs to be done?"
          maxLength={100}
          className="flex-1 rounded-[16px] bg-neu-bg px-4 py-3 text-text-primary shadow-neu-inset placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-accent text-white shadow-neu-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-neu active:shadow-neu-pressed disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-neu-inset"
          aria-label="Add task"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            setValue("");
            setIsExpanded(false);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-neu-bg text-text-secondary shadow-neu-sm transition-all duration-200 hover:shadow-neu hover:text-text-primary active:shadow-neu-pressed"
          aria-label="Cancel"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p className="mt-2 text-xs text-text-muted">
        Press Enter to add, Escape to cancel
      </p>
    </div>
  );
}
