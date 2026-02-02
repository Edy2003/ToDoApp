export const queries = {
  // Basic todos query ordered by order field
  todos: () =>
    ({
      todos: {
        $: { order: { order: "asc" } },
      },
    }) as const,

  // With owner included (for admin views)
  todosWithOwner: () =>
    ({
      todos: {
        $: { order: { order: "asc" } },
        owner: {},
      },
    }) as const,
};
