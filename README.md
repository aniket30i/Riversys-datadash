# Dashboard Demo App

This is a demo dashboard application showcasing the use of Material-UI's table component, along with custom filters and search functionality for managing purchase orders. The app leverages state management using the Context API to synchronize the filters and search behavior, providing a seamless user experience.

## Features

- **Purchase Orders Table**: Displays a list of purchase orders using Material-UI's table component.
- **Custom Filters**: Filters for managing purchase orders, allowing users to filter by status, price, and other criteria. All filters work simultaneously.
- **Search Functionality**: A custom search bar to find purchase orders based on specific keywords.
- **Date Filtering**: Filter purchase orders by specific date ranges.
- **Context API**: State management using React's Context API for global state handling, ensuring that filters and search states are shared across components.
- **Third-Party Component Library**: Uses Material-UI for styling and component building, ensuring a modern and responsive UI.

## Technologies Used

- **React**: JavaScript library for building the user interface.
- **Material-UI**: UI component library for React to build the table and other UI elements.
- **Context API**: For state management across the app.
- **JavaScript (ES6+)**: Core language used for the project.


## How It Works
- The purchase orders table lists all orders, and users can sort or filter the data using various controls.
- Custom filters include options for filtering by order status, price, and other criteria. These filters work in tandem and update the table results in real time.
- Search allows users to quickly find specific purchase orders by typing keywords.
- Date filtering lets users narrow down orders within a specific date range.
- The state of the app, including the filter values and search input, is managed globally using the Context API to ensure a consistent experience across components.
