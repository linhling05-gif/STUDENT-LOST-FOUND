---
name: LF Premium Glassmorphism
colors:
  surface: '#f4fafd'
  surface-dim: '#d4dbdd'
  surface-bright: '#f4fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef5f7'
  surface-container: '#e8eff1'
  surface-container-high: '#e2e9ec'
  surface-container-highest: '#dde4e6'
  on-surface: '#161d1f'
  on-surface-variant: '#4f4449'
  inverse-surface: '#2b3234'
  inverse-on-surface: '#ebf2f4'
  outline: '#817379'
  outline-variant: '#d3c2c8'
  surface-tint: '#804f69'
  primary: '#804f69'
  on-primary: '#ffffff'
  primary-container: '#f8bbd9'
  on-primary-container: '#774861'
  inverse-primary: '#f2b5d3'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#6b5a60'
  on-tertiary: '#ffffff'
  tertiary-container: '#dec7cf'
  on-tertiary-container: '#635259'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8e9'
  primary-fixed-dim: '#f2b5d3'
  on-primary-fixed: '#330d24'
  on-primary-fixed-variant: '#653851'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#f4dce4'
  tertiary-fixed-dim: '#d7c1c8'
  on-tertiary-fixed: '#25181e'
  on-tertiary-fixed-variant: '#524249'
  background: '#f4fafd'
  on-background: '#161d1f'
  surface-variant: '#dde4e6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style
The design system for the LF university app centers on a high-end **Glassmorphism** aesthetic that prioritizes clarity, trust, and ease of use for students. The brand personality is empathetic and sophisticated, acknowledging the stress of losing an item while providing a calm, organized environment for recovery.

The visual direction utilizes multi-layered translucent surfaces over organic, blurred background shapes. By combining a clean minimalist layout with tactile glass effects, the UI feels lightweight and modern. The experience is defined by soft depth, high-quality typography, and an atmosphere of transparency.

## Colors
The palette is anchored by **Soft Pastel Pink (#F8BBD9)**, used intentionally for primary actions and brand presence to evoke a sense of care and approachability. 

- **Primary:** Soft Pastel Pink (#F8BBD9) for key buttons, active states, and brand accents.
- **Glass Base:** Pure White (#FFFFFF) at varying opacities (40% to 80%) to create the glass effect.
- **Backgrounds:** Subtle gradients blending White and Tertiary Pink (#FCE4EC) to provide a soft canvas for glass containers.
- **Typography/Neutral:** Deep Charcoal (#2D3436) ensures WCAG-compliant contrast against light glass surfaces.
- **Success/Error:** Muted sage greens and soft corals are used sparingly for status indicators to maintain the pastel harmony.

## Typography
This design system utilizes **Inter** exclusively to ensure a systematic, utilitarian, and highly readable experience. The type scale is generous, with increased line heights to maintain a sense of "air" within glass containers.

Headlines should use a tighter letter spacing and heavier weights to stand out against blurred backgrounds. Body text is kept clean and dark to ensure maximum accessibility on translucent layers. Use `label-md` for button text and navigation items to ensure clear call-to-actions.

## Layout & Spacing
The design system follows a strict **8px grid system**. Layouts are primarily fluid, adapting to student mobile devices while maintaining comfortable margins.

- **Mobile:** 20px side margins with a single column stack.
- **Desktop/Tablet:** 12-column fluid grid with 24px gutters.
- **Containers:** Content is grouped into glass modules. Internal padding within these modules should never be less than 24px (`lg`) to maintain the "premium" feel.
- **Vertical Rhythm:** Use 32px (`xl`) spacing between distinct sections to reinforce the minimal aesthetic.

## Elevation & Depth
Elevation is achieved through a combination of **Backdrop Blurs** and **Tonal Layering** rather than traditional heavy shadows.

- **Surface Level 1 (Background):** Soft mesh gradients of pink and white.
- **Surface Level 2 (Glass Card):** White fill at 60% opacity with an 18px to 24px `backdrop-filter: blur()`. A 1px solid white border at 30% opacity mimics a highlight on the edge of the glass.
- **Surface Level 3 (Floating Elements):** Items like modals or active menus use a higher blur (40px) and a very subtle, diffused shadow (0px 10px 30px rgba(0,0,0, 0.05)) to suggest they are closer to the user.
- **Interactions:** Hovering over a glass card should trigger a subtle vertical lift (-4px) and an increase in border opacity to 60%.

## Shapes
The shape language is ultra-soft and inviting. All primary glass containers utilize a **24px corner radius** to create a friendly, modern silhouette.

- **Buttons:** Use a 16px radius for a distinct but harmonious look.
- **Inputs:** A 12px radius provides enough structure for form-heavy pages (e.g., "Report a Lost Item").
- **Media/Images:** Found item photos should match the container's 24px radius to feel integrated into the glass cards.

## Components

### Buttons
Primary buttons use the Soft Pastel Pink (#F8BBD9) with white text and a subtle 10% dark shadow for depth. Secondary buttons are "Glass Buttons"—translucent white with a 1px white border. All buttons should have a `transition: 0.3s ease` for hover states, featuring a slight scale-up (1.02x).

### Glass Cards
The core component of this design system. Used for displaying lost item listings. Each card features an 18px backdrop blur, 24px rounded corners, and a 1px internal stroke. Content inside should be padded by 24px.

### Input Fields
Inputs are semi-transparent white (40%) with a 1px border. On focus, the border transitions to Primary Pink and the background opacity increases to 80% to indicate active status.

### Status Chips
Small, 32px-height capsules used for "Found", "Lost", or "Claimed". These use high-contrast text on top of low-opacity versions of status colors (e.g., Green for Found) to stay within the glass aesthetic.

### Lists & Navigation
Navigation bars are fixed to the bottom or top with a heavy 32px backdrop blur, creating a "frosted" look that allows content to scroll beautifully underneath. Items in a list should be separated by thin, 10% opacity dividers.

### Micro-interactions
- **Fade-ins:** New list items should fade in and slide up 10px when the screen loads.
- **Active State:** Tapping a card results in a "squish" effect (0.98x scale) to provide tactile feedback.