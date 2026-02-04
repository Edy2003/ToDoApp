# Todo App Design System

This document defines the visual design system for the Todo App. All UI changes should follow these guidelines.

---

## Design Philosophy

**Neumorphism (Soft UI)** — тактильний, м'який інтерфейс з ефектом "видавлених" та "втиснутих" елементів.

**Принципи:**
- М'якість та спокій — не напружує очі
- Тактильність — елементи виглядають як фізичні об'єкти
- Мінімалізм — тільки необхідні елементи
- Консистентність — однакові стилі для схожих елементів

---

## Color Palette

### Base Colors

| Назва | HEX | Використання |
|-------|-----|--------------|
| Background | `#E4E9F2` | Основний фон застосунку |
| Shadow Light | `#FFFFFF` | Світла частина тіні (верх-ліво) |
| Shadow Dark | `#A3B1C6` | Темна частина тіні (низ-право) |

### Text Colors

| Назва | HEX | Використання |
|-------|-----|--------------|
| Primary | `#2D3748` | Основний текст |
| Secondary | `#718096` | Допоміжний текст, placeholders |
| Muted | `#A0AEC0` | Завершені задачі, disabled |

### Accent Colors

| Назва | HEX | Використання |
|-------|-----|--------------|
| Accent | `#67B8DE` | Іконки, великі елементи, декоративні |
| Accent Text | `#1E7BA5` | **Текст, links (WCAG AA compliant)** |
| Accent Hover | `#4DA8D4` | Hover стан акцентних елементів |
| Accent Light | `#A8D8EA` | Subtle highlights, borders |

### State Colors

| Назва | HEX | Використання |
|-------|-----|--------------|
| Success | `#6BCB77` | Іконки, індикатори |
| Success Text | `#1D7A3E` | **Текст успіху (WCAG AA)** |
| Danger | `#FF6B6B` | Іконки, індикатори |
| Danger Text | `#C53030` | **Текст помилки (WCAG AA)** |
| Warning | `#FFD93D` | Фон для попереджень |
| Warning Text | `#8B6914` | **Текст попередження (WCAG AA)** |

### CSS Variables

```css
:root {
  /* Background */
  --bg-main: #E4E9F2;

  /* Shadows */
  --shadow-light: #FFFFFF;
  --shadow-dark: #A3B1C6;

  /* Text */
  --text-primary: #2D3748;
  --text-secondary: #718096;
  --text-muted: #A0AEC0;

  /* Accent */
  --accent: #67B8DE;
  --accent-text: #1E7BA5;       /* WCAG AA for text */
  --accent-hover: #4DA8D4;
  --accent-light: #A8D8EA;

  /* States - decorative (icons, backgrounds) */
  --success: #6BCB77;
  --danger: #FF6B6B;
  --warning: #FFD93D;

  /* States - text safe (WCAG AA compliant) */
  --success-text: #1D7A3E;
  --danger-text: #C53030;
  --warning-text: #8B6914;
}
```

---

## Typography

### Font Family

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Sizes

| Назва | Size | Line Height | Використання |
|-------|------|-------------|--------------|
| xs | 12px | 16px | Badges, captions |
| sm | 14px | 20px | Secondary text, labels |
| base | 16px | 24px | Body text, todo items |
| lg | 18px | 28px | Subheadings |
| xl | 20px | 28px | Section titles |
| 2xl | 24px | 32px | Page headers |

### Font Weights

| Назва | Weight | Використання |
|-------|--------|--------------|
| normal | 400 | Body text |
| medium | 500 | Labels, buttons |
| semibold | 600 | Headings, emphasis |
| bold | 700 | Page titles |

---

## Shadows (Neumorphism)

### Shadow Types

| Назва | CSS | Використання |
|-------|-----|--------------|
| `neu` | `8px 8px 16px #A3B1C6, -8px -8px 16px #FFFFFF` | Cards, containers |
| `neu-sm` | `4px 4px 8px #A3B1C6, -4px -4px 8px #FFFFFF` | Buttons, small elements |
| `neu-inset` | `inset 4px 4px 8px #A3B1C6, inset -4px -4px 8px #FFFFFF` | Inputs, pressed state |
| `neu-pressed` | `inset 6px 6px 12px #A3B1C6, inset -6px -6px 12px #FFFFFF` | Active/checked elements |

### Tailwind v4 Config (@theme)

```css
/* In globals.css or app.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-neu-bg: #E4E9F2;
  --color-neu-light: #FFFFFF;
  --color-neu-dark: #A3B1C6;
  --color-accent: #67B8DE;
  --color-accent-text: #1E7BA5;
  --color-accent-hover: #4DA8D4;
  --color-accent-light: #A8D8EA;
  --color-success: #6BCB77;
  --color-success-text: #1D7A3E;
  --color-danger: #FF6B6B;
  --color-danger-text: #C53030;
  --color-warning: #FFD93D;
  --color-warning-text: #8B6914;
  --color-text-primary: #2D3748;
  --color-text-secondary: #718096;
  --color-text-muted: #A0AEC0;

  /* Shadows */
  --shadow-neu: 8px 8px 16px #A3B1C6, -8px -8px 16px #FFFFFF;
  --shadow-neu-sm: 4px 4px 8px #A3B1C6, -4px -4px 8px #FFFFFF;
  --shadow-neu-inset: inset 4px 4px 8px #A3B1C6, inset -4px -4px 8px #FFFFFF;
  --shadow-neu-pressed: inset 6px 6px 12px #A3B1C6, inset -6px -6px 12px #FFFFFF;

  /* Border Radius */
  --radius-neu: 16px;
  --radius-neu-lg: 24px;

  /* Animations */
  --animate-slide-up: slide-up 0.3s ease-out;
  --animate-neu-press: neu-press 0.3s ease-out forwards;
  --animate-fade-out: fade-out 0.2s ease-out forwards;
}
```

### Legacy Tailwind v3 Config (if needed)

```js
// tailwind.config.ts
boxShadow: {
  'neu': '8px 8px 16px #A3B1C6, -8px -8px 16px #FFFFFF',
  'neu-sm': '4px 4px 8px #A3B1C6, -4px -4px 8px #FFFFFF',
  'neu-inset': 'inset 4px 4px 8px #A3B1C6, inset -4px -4px 8px #FFFFFF',
  'neu-pressed': 'inset 6px 6px 12px #A3B1C6, inset -6px -6px 12px #FFFFFF',
}
```

---

## Border Radius

| Назва | Value | Використання |
|-------|-------|--------------|
| `neu` | 16px | Cards, buttons |
| `neu-lg` | 24px | Large containers |
| `full` | 9999px | Checkboxes, circular buttons |

---

## Spacing

Використовуємо 4px grid system (Tailwind default).

| Назва | Value | Використання |
|-------|-------|--------------|
| `1` | 4px | Minimal spacing |
| `2` | 8px | Tight spacing |
| `3` | 12px | Compact spacing |
| `4` | 16px | Default spacing |
| `6` | 24px | Comfortable spacing |
| `8` | 32px | Loose spacing |

---

## Z-Index Scale

| Назва | Value | Використання |
|-------|-------|--------------|
| `z-0` | 0 | Base content |
| `z-10` | 10 | Elevated cards, dropdowns trigger |
| `z-20` | 20 | Sticky header |
| `z-30` | 30 | Dropdown menus, popovers |
| `z-40` | 40 | Modal backdrop |
| `z-50` | 50 | Modal content, dialogs |
| `z-60` | 60 | Toasts, notifications |

```css
/* Custom z-index in @theme */
@theme {
  --z-dropdown: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-toast: 60;
}
```

---

## Components

### Card / Container

```tsx
<div className="bg-neu-bg rounded-neu shadow-neu p-6">
  {children}
</div>
```

### Button (Convex)

```tsx
// Primary
<button className="
  bg-neu-bg rounded-neu shadow-neu
  px-6 py-3
  text-accent-text font-medium
  hover:shadow-neu-sm
  active:shadow-neu-pressed
  transition-shadow duration-200
">
  Button Text
</button>

// With accent background
<button className="
  bg-neu-accent rounded-neu shadow-neu-sm
  px-6 py-3
  text-white font-medium
  hover:bg-neu-accent-hover
  active:shadow-neu-pressed
  transition-all duration-200
">
  Primary Action
</button>
```

### Input (Inset)

```tsx
<input
  className="
    w-full bg-neu-bg rounded-neu shadow-neu-inset
    px-4 py-3
    text-primary placeholder:text-secondary
    focus:outline-none focus:ring-2 focus:ring-neu-accent/50
    transition-shadow duration-200
  "
  placeholder="Enter task..."
/>
```

### Checkbox

```tsx
<div className={`
  w-6 h-6 rounded-full
  flex items-center justify-center
  transition-all duration-200
  ${checked
    ? 'shadow-neu-pressed bg-neu-accent'
    : 'shadow-neu-sm bg-neu-bg hover:shadow-neu'
  }
`}>
  {checked && <CheckIcon className="w-4 h-4 text-white" />}
</div>
```

### Todo Item

```tsx
<div className="
  bg-neu-bg rounded-neu shadow-neu
  p-4
  flex items-center gap-4
  transition-shadow duration-200
">
  <Checkbox checked={completed} />

  <span className={`
    flex-1 text-base
    ${completed ? 'line-through text-muted' : 'text-primary'}
  `}>
    {title}
  </span>

  <button className="
    p-2 rounded-full shadow-neu-sm
    text-secondary hover:text-danger
    hover:shadow-neu active:shadow-neu-pressed
    transition-all duration-200
  ">
    <TrashIcon className="w-5 h-5" />
  </button>
</div>
```

### Header

```tsx
<header className="
  bg-neu-bg shadow-neu-sm
  px-6 py-4
  flex items-center justify-between
">
  <h1 className="text-xl font-semibold text-primary">
    My Tasks
  </h1>
  <UserMenu />
</header>
```

### Floating Action Button (FAB)

```tsx
<button className="
  fixed bottom-6 right-6
  w-14 h-14
  bg-neu-accent rounded-full shadow-neu
  flex items-center justify-center
  text-white
  hover:bg-neu-accent-hover hover:shadow-neu-sm
  active:shadow-neu-pressed
  transition-all duration-200
">
  <PlusIcon className="w-6 h-6" />
</button>
```

### Toast

```tsx
<div className="
  bg-neu-bg rounded-neu shadow-neu
  px-4 py-3
  flex items-center gap-3
  animate-slide-up
  z-60
">
  <span className="text-primary">{message}</span>
  <button className="text-accent-text hover:text-accent-hover">
    Undo
  </button>
</div>
```

### Loading Skeleton

```tsx
<div className="animate-pulse">
  <div className="bg-neu-bg rounded-neu shadow-neu-inset h-16 mb-3" />
  <div className="bg-neu-bg rounded-neu shadow-neu-inset h-16 mb-3" />
  <div className="bg-neu-bg rounded-neu shadow-neu-inset h-16" />
</div>
```

### Empty State

```tsx
<div className="text-center py-12">
  <ClipboardIcon className="w-12 h-12 text-muted mx-auto" />
  <p className="text-secondary mt-4">No tasks yet</p>
  <p className="text-muted text-sm mt-1">Add your first task to get started</p>
</div>
```

### Input Error State

```tsx
<div>
  <input
    className="
      w-full bg-neu-bg rounded-neu shadow-neu-inset
      px-4 py-3
      text-primary
      ring-2 ring-danger/50
      focus:outline-none focus:ring-danger
    "
    aria-invalid="true"
    aria-describedby="error-message"
  />
  <p id="error-message" className="text-danger-text text-sm mt-1">
    This field is required
  </p>
</div>
```

### Disabled Button

```tsx
<button
  className="
    bg-neu-bg rounded-neu
    px-6 py-3
    text-muted font-medium
    opacity-50 cursor-not-allowed
    shadow-neu-inset
  "
  disabled
  aria-disabled="true"
>
  Disabled
</button>
```

### Modal / Dialog

```tsx
{/* Backdrop */}
<div className="fixed inset-0 bg-black/30 z-40" aria-hidden="true" />

{/* Modal */}
<div
  className="
    fixed inset-0 z-50
    flex items-center justify-center p-4
  "
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <div className="bg-neu-bg rounded-neu-lg shadow-neu p-6 max-w-md w-full">
    <h2 id="modal-title" className="text-xl font-semibold text-primary">
      Modal Title
    </h2>
    <p className="text-secondary mt-2">Modal content goes here.</p>
    <div className="flex gap-3 mt-6">
      <button className="flex-1 ...">Cancel</button>
      <button className="flex-1 bg-accent ...">Confirm</button>
    </div>
  </div>
</div>
```

---

## Layout

### Page Structure

```
┌──────────────────────────────────────┐
│           HEADER (shadow-neu-sm)     │
├──────────────────────────────────────┤
│                                      │
│   ┌──────────────────────────────┐   │
│   │                              │   │
│   │    TODO LIST CONTAINER       │   │
│   │    (shadow-neu, p-6)         │   │
│   │                              │   │
│   │    ┌────────────────────┐    │   │
│   │    │   Todo Item        │    │   │
│   │    └────────────────────┘    │   │
│   │                              │   │
│   │    ┌────────────────────┐    │   │
│   │    │   Todo Item        │    │   │
│   │    └────────────────────┘    │   │
│   │                              │   │
│   └──────────────────────────────┘   │
│                                      │
│                           [FAB]      │
└──────────────────────────────────────┘
```

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| mobile | < 640px | Single column, full width |
| sm | 640px | Max-width container |
| md | 768px | Comfortable padding |
| lg | 1024px | Centered content, max-w-2xl |

### Container Widths

```css
.container {
  max-width: 640px; /* max-w-2xl */
  margin: 0 auto;
  padding: 0 16px;
}
```

---

## Animations

### Transitions

```css
/* Default transition for interactive elements */
.neu-interactive {
  transition: box-shadow 0.2s ease-in-out,
              background-color 0.2s ease-in-out,
              transform 0.2s ease-in-out;
}
```

### Keyframes

```css
/* Toast slide up */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Checkbox completion */
@keyframes neu-press {
  0% {
    box-shadow: 4px 4px 8px #A3B1C6, -4px -4px 8px #FFFFFF;
  }
  50% {
    box-shadow: inset 6px 6px 12px #A3B1C6, inset -6px -6px 12px #FFFFFF;
  }
  100% {
    box-shadow: inset 6px 6px 12px #A3B1C6, inset -6px -6px 12px #FFFFFF;
  }
}

/* Fade out for deleted items */
@keyframes fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

### Tailwind Animation Config

```js
animation: {
  'slide-up': 'slide-up 0.3s ease-out',
  'neu-press': 'neu-press 0.3s ease-out forwards',
  'fade-out': 'fade-out 0.2s ease-out forwards',
}
```

---

## Accessibility

### Contrast Ratios

| Element | Foreground | Background | Ratio | Status |
|---------|------------|------------|-------|--------|
| Primary text | #2D3748 | #E4E9F2 | 7.2:1 | AAA |
| Secondary text | #718096 | #E4E9F2 | 4.5:1 | AA |
| Accent text | #1E7BA5 | #E4E9F2 | 4.6:1 | **AA** |
| Success text | #1D7A3E | #E4E9F2 | 5.8:1 | **AA** |
| Danger text | #C53030 | #E4E9F2 | 5.2:1 | **AA** |
| Warning text | #8B6914 | #E4E9F2 | 4.7:1 | **AA** |
| Accent (decorative) | #67B8DE | #E4E9F2 | 2.1:1 | Icons only |

### Focus States

All interactive elements must have visible focus states:

```tsx
// Button focus
<button className="
  ...
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-accent-text
  focus-visible:ring-offset-2
  focus-visible:ring-offset-neu-bg
">

// Input focus
<input className="
  ...
  focus:outline-none
  focus:ring-2
  focus:ring-accent/50
  focus:shadow-neu-inset
">

// Checkbox focus
<div className="
  ...
  focus-visible:ring-2
  focus-visible:ring-accent-text
  focus-visible:ring-offset-2
" tabIndex={0} role="checkbox">
```

### Touch Targets

- Minimum touch target size: 44x44px
- Checkbox: 24x24px visible, 44x44px touch area (use padding)
- Buttons: minimum 44px height
- Links in text: adequate spacing or underline

```tsx
// Checkbox with larger touch area
<button
  className="p-2 -m-2" // Extends touch area
  role="checkbox"
  aria-checked={checked}
>
  <div className="w-6 h-6 ...">
    {/* visible checkbox */}
  </div>
</button>
```

### ARIA Guidelines

#### Checkbox

```tsx
<button
  role="checkbox"
  aria-checked={checked}
  aria-label="Mark task as complete"
  onClick={toggle}
>
```

#### Todo Item

```tsx
<li
  role="listitem"
  aria-label={`Task: ${title}, ${completed ? 'completed' : 'pending'}`}
>
```

#### Delete Button

```tsx
<button
  aria-label={`Delete task: ${title}`}
  onClick={handleDelete}
>
  <TrashIcon aria-hidden="true" />
</button>
```

#### Modal

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
```

#### Toast

```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
```

#### Loading State

```tsx
<div
  role="status"
  aria-busy="true"
  aria-label="Loading tasks..."
>
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next interactive element |
| `Shift+Tab` | Move to previous element |
| `Space/Enter` | Activate button/checkbox |
| `Escape` | Close modal/cancel action |

### Screen Reader Considerations

- Use semantic HTML (`<button>`, `<input>`, `<ul>/<li>`)
- Provide `aria-label` for icon-only buttons
- Use `aria-live` for dynamic content updates
- Hide decorative icons with `aria-hidden="true"`

---

## Icons

Використовуємо **Heroicons** (outline style).

### Sizes

| Context | Size | Class |
|---------|------|-------|
| Inline text | 16px | `w-4 h-4` |
| Buttons | 20px | `w-5 h-5` |
| FAB | 24px | `w-6 h-6` |
| Empty state | 48px | `w-12 h-12` |

### Common Icons

- Add: `PlusIcon`
- Delete: `TrashIcon`
- Check: `CheckIcon`
- Edit: `PencilIcon`
- Close: `XMarkIcon`
- User: `UserCircleIcon`
- Logout: `ArrowRightOnRectangleIcon`

---

## Dark Mode (Future)

Reserved for future implementation:

```css
:root.dark {
  --bg-main: #1A1A2E;
  --shadow-light: #252542;
  --shadow-dark: #12121E;
  --text-primary: #E4E4E7;
  --text-secondary: #A1A1AA;
  --accent: #67B8DE;
}
```

---

## Resources

- [Neumorphism.io](https://neumorphism.io/) — Shadow generator
- [Heroicons](https://heroicons.com/) — Icon library
- [Tailwind CSS](https://tailwindcss.com/) — Utility framework
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) — Accessibility
