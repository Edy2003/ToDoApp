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
| Accent | `#67B8DE` | Кнопки, активні елементи, links |
| Accent Hover | `#4DA8D4` | Hover стан акцентних елементів |
| Accent Light | `#A8D8EA` | Subtle highlights, borders |

### State Colors

| Назва | HEX | Використання |
|-------|-----|--------------|
| Success | `#6BCB77` | Завершення, підтвердження |
| Danger | `#FF6B6B` | Видалення, помилки |
| Warning | `#FFD93D` | Попередження |

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
  --accent-hover: #4DA8D4;
  --accent-light: #A8D8EA;

  /* States */
  --success: #6BCB77;
  --danger: #FF6B6B;
  --warning: #FFD93D;
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

### Tailwind Config

```js
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
  text-neu-accent font-medium
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
    text-text-primary placeholder:text-text-secondary
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
    ${completed ? 'line-through text-text-muted' : 'text-text-primary'}
  `}>
    {title}
  </span>

  <button className="
    p-2 rounded-full shadow-neu-sm
    text-text-secondary hover:text-danger
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
  <h1 className="text-xl font-semibold text-text-primary">
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
">
  <span className="text-text-primary">{message}</span>
  <button className="text-neu-accent hover:text-neu-accent-hover">
    Undo
  </button>
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
| Accent on bg | #67B8DE | #E4E9F2 | 2.1:1 | Use for large text/icons |
| Accent text | #4DA8D4 | #E4E9F2 | 2.5:1 | Use with underline |

### Focus States

```css
/* Visible focus ring for keyboard navigation */
.focus-visible:focus {
  outline: none;
  box-shadow:
    inset 4px 4px 8px #A3B1C6,
    inset -4px -4px 8px #FFFFFF,
    0 0 0 3px #67B8DE;
}
```

### Touch Targets

- Minimum touch target size: 44x44px
- Checkbox: 24x24px visible, 44x44px touch area
- Buttons: минимум 44px height

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
