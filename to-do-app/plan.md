# Minimalist Todo App - Implementation Plan

## Overview

A minimalist, distraction-free task management app with magic code authentication, real-time sync, and offline support. Built with Next.js 16, InstantDB, and Tailwind CSS v4.

**Architecture Priority: Extensibility** - The codebase is structured for easy addition of new features (due dates, tags, categories, drag-and-drop, etc.) without major refactoring.

---

## Current Implementation Status

### Completed

- [x] Schema with `order` field and `userTodos` link
- [x] User-scoped permissions (todos owned by users)
- [x] Database abstraction layer (`lib/db/`)
- [x] Feature hooks (`useAuth`, `useTodos`, `useToast`, `useLongPress`)
- [x] Auth components (LoginForm, SignOutButton)
- [x] Todo components (TodoList, TodoItem, AddTodoInput, EmptyState)
- [x] UI components (Header, Toast, ToastProvider, ConnectionStatus)
- [x] CSS animations (checkbox fill, toast slide-up)
- [x] TypeScript type checking passes

### Ready for Extension

- [ ] Due dates
- [ ] Tags/labels
- [ ] Categories/folders
- [ ] Drag-and-drop reordering
- [ ] Search/filter
- [ ] Reminders

---

## Architecture Principles

### 1. Separation of Concerns

```
┌─────────────────────────────────────────────────────────┐
│                     UI Components                        │
│    (TodoItem, TodoList, etc. - rendering only)          │
├─────────────────────────────────────────────────────────┤
│                    Custom Hooks                          │
│    (useTodos, useAuth, useToast - business logic)       │
├─────────────────────────────────────────────────────────┤
│                  Database Layer                          │
│    (lib/db/* - queries, mutations, types)               │
├─────────────────────────────────────────────────────────┤
│                    InstantDB                             │
└─────────────────────────────────────────────────────────┘
```

### 2. Database Layer Abstraction

All InstantDB operations are centralized in `lib/db/` - components never call `db.transact()` directly.

```typescript
// lib/db/queries.ts - Query definitions
// lib/db/mutations.ts - Transaction helpers
// lib/db/types.ts - Type definitions
```

### 3. Feature Hooks Pattern

Each feature area has its own hook that encapsulates all related logic:

- `hooks/useAuth.ts` - All auth operations
- `hooks/useTodos.ts` - All todo CRUD logic
- `hooks/useToast.ts` - Toast notifications
- `hooks/useLongPress.ts` - Touch detection

### 4. Component Composition

Components receive data and callbacks as props - no direct DB access:

```typescript
function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  // Pure rendering logic only
}
```

---

## Project Structure

```
to-do-app/
├── app/
│   ├── globals.css              # Tailwind + animations
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Auth router + main UI
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx        # Email + code flow
│   │   └── SignOutButton.tsx    # Header button
│   │
│   ├── todos/
│   │   ├── TodoList.tsx         # List container + sorting
│   │   ├── TodoItem.tsx         # Item with checkbox, edit, delete
│   │   ├── AddTodoInput.tsx     # FAB + input
│   │   └── EmptyState.tsx       # "Add your first task"
│   │
│   └── ui/
│       ├── Header.tsx           # App header
│       ├── Toast.tsx            # Notification component
│       ├── ToastProvider.tsx    # Toast context
│       └── ConnectionStatus.tsx # Offline indicator
│
├── hooks/
│   ├── useTodos.ts              # All todo CRUD + logic
│   ├── useAuth.ts               # Auth operations wrapper
│   ├── useLongPress.ts          # Long press detection
│   └── useToast.ts              # Toast hook
│
├── lib/
│   ├── clientDb.ts              # InstantDB client
│   └── db/                      # Database abstraction layer
│       ├── index.ts             # Re-exports
│       ├── queries.ts           # Query definitions
│       ├── mutations.ts         # Transaction helpers
│       └── types.ts             # Shared types
│
├── types/
│   └── index.ts                 # App-wide type definitions
│
├── instant.schema.ts            # InstantDB schema
└── instant.perms.ts             # InstantDB permissions
```

---

## Schema

```typescript
// instant.schema.ts
todos: i.entity({
  title: i.string(),
  completed: i.boolean().indexed(),
  createdAt: i.number().indexed(),
  order: i.number().indexed(),
}),

links: {
  userTodos: {
    forward: { on: "todos", has: "one", label: "owner", onDelete: "cascade" },
    reverse: { on: "$users", has: "many", label: "todos" },
  },
}
```

---

## Permissions

```typescript
// instant.perms.ts
todos: {
  allow: {
    view: "isOwner",
    create: "auth.id != null",
    update: "isOwner",
    delete: "isOwner",
  },
  bind: {
    isOwner: "auth.id in data.ref('owner.id')",
  },
}
```

---

## Feature Extension Guide

### Adding Due Dates

1. **Schema**: Add `dueDate: i.number().indexed().optional()` to todos
2. **Types**: Add `dueDate?: number` to `UpdateTodoInput`
3. **Mutations**: Add `setDueDate(todoId, date)` function
4. **Hook**: Add `setDueDate` to `useTodos` return
5. **Component**: Add date picker prop to `TodoItem`

### Adding Tags

1. **Schema**: Create `tags` entity and `todoTags` link
2. **Types**: Add `TagWithTodos` type
3. **Queries**: Add `todosWithTags()` query
4. **Mutations**: Add `addTagToTodo`, `removeTagFromTodo`
5. **Hook**: Add tag operations to `useTodos`
6. **Components**: Create `TagPicker`, update `TodoItem`

### Adding Drag-and-Drop

1. **Mutations**: Add `reorderTodos(updates: {id, order}[])`
2. **Hook**: Add `reorderTodos` to `useTodos`
3. **Component**: Add drag handlers to `TodoList`

---

## Commands

```bash
# Development
npm run dev

# Type check
npx tsc --noEmit

# Push schema changes
npx instant-cli push schema --yes

# Push permission changes
npx instant-cli push perms --yes
```

---

## Verification Checklist

1. **Schema push**: `npx instant-cli push schema --yes`
2. **Perms push**: `npx instant-cli push perms --yes`
3. **Type check**: `npx tsc --noEmit`
4. **Dev server**: `npm run dev`
5. **Auth flow**: Login with magic code
6. **CRUD**: Add, edit, complete, delete todos
7. **Undo delete**: Toast appears, undo works
8. **Completion animation**: 300ms smooth animation
9. **Completed sorting**: Completed items move to bottom
10. **Offline**: Disconnect, make changes, reconnect
11. **User isolation**: Different users see own todos
12. **Mobile**: Responsive layout, touch targets work
