# React Pagination Assignment

A highly performant, scalable Data Grid implementation using **React Query** and **TanStack Table**.

## 🚀 Features

-   **Efficient Pagination**: Uses React Query's `keepPreviousData` for smooth transitions.
-   **Prefetching**: Automatically preloads the next page in the background for instant navigation.
-   **Skeleton Loading**: Polished loading state with shimmering rows.
-   **Robust Error Handling**: Graceful error UI with Retry mechanism.
-   **Dynamic Limits**: User selectable page sizing (10/20/50 items).
-   **Mobile Reponsive**: Adaptive layout that works beautifully on small screens.
-   **Optimized Performance**:
    -   Requests cancelled automatically if stale.
    -   Images use `loading="lazy"`.
    -   Data caching with 5-minute stale time.

## 🛠 Tech Stack

-   **React** (Vite)
-   **TypeScript**
-   **@tanstack/react-query** (Data Fetching & Caching)
-   **@tanstack/react-table** (Headless Table Logic)
-   **Axios** (API Client)
-   **CSS Modules/Global** (Styled for premium feel)

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🏗 Architecture

### Data Layer (`src/api`, `src/hooks`)
-   **API Client**: Centralized Axios instance with timeout and base URL configuration.
-   **Hooks**: Custom `usePaginatedUsers` hook encapsulates all React Query logic, including key management and types.

### UI Components (`src/components`)
-   **DataGrid**: The core component. It decouples UI from Data using TanStack Table. it handles:
    -   Rendering
    -   Pagination Controls
    -   Error States
    -   Prefetching triggers
-   **SkeletonRow**: A reusable component for the loading state, ensuring visual consistency.

## ✅ Assignment Checklist

-   [x] **React Query Usage**: Implemented with caching and stale times.
-   [x] **Pagination**: Full Previous/Next navigation with page indicators.
-   [x] **Loading/Error States**: Skeletons for loading, Alert UI for errors.
-   [x] **Prefetching**: Next page data is pre-fetched for performance (Bonus).
-   [x] **TypeScript**: Full type safety for API responses and Components.
-   [x] **Clean Architecture**: Modular folder structure.

## 📱 Mobile Support
The grid automatically adjusts padding and column widths for smaller screens, ensuring a native-app-like feel on mobile devices.
