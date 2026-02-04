"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTodos } from "@/hooks/useTodos";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { Header } from "@/components/ui/Header";
import { ConnectionStatus } from "@/components/ui/ConnectionStatus";
import { LoginForm } from "@/components/auth/LoginForm";
import { TodoList } from "@/components/todos/TodoList";
import { AddTodoInput } from "@/components/todos/AddTodoInput";

function AppContent() {
  const {
    user,
    isLoading: authLoading,
    error: authError,
    authStep,
    email,
    isSending,
    isVerifying,
    sendMagicCode,
    verifyCode,
    signOut,
    resetAuth,
  } = useAuth();

  const {
    todos,
    isLoading: todosLoading,
    createTodo,
    updateTodo,
    toggleComplete,
    deleteTodo,
  } = useTodos(user?.id);

  // Loading state
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neu-bg" role="status" aria-busy="true" aria-label="Loading...">
        <div className="h-10 w-10 rounded-full bg-neu-bg shadow-neu animate-pulse" />
      </div>
    );
  }

  // Not authenticated - show login
  if (!user) {
    return (
      <LoginForm
        authStep={authStep}
        email={email}
        error={authError}
        isSending={isSending}
        isVerifying={isVerifying}
        onSendCode={sendMagicCode}
        onVerifyCode={verifyCode}
        onBack={resetAuth}
      />
    );
  }

  // Authenticated - show todos
  return (
    <div className="flex min-h-screen flex-col bg-neu-bg">
      <Header userEmail={user.email ?? undefined} onSignOut={signOut} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6">
        <TodoList
          todos={todos}
          isLoading={todosLoading}
          onToggle={toggleComplete}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </main>

      <AddTodoInput onAdd={createTodo} />
      <ConnectionStatus />
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
