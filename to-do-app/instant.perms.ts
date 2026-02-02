// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
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
  },
} satisfies InstantRules;

export default rules;
