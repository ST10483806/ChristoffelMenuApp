> Why do I have a folder named ".expo" in my project?

The ".expo" folder is created when an Expo project is started using "expo start" command.

> What do the files contain?

- "devices.json": contains information about devices that have recently opened this project. This is used to populate the "Development sessions" list in your development builds.
- "packager-info.json": contains port numbers and process PIDs that are used to serve the application to the mobile device/simulator.
- "settings.json": contains the server configuration that is used to serve the application manifest.

> Should I commit the ".expo" folder?

No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.

Upon project creation, the ".expo" folder is already added to your ".gitignore" file.
 Christoffel's Kitchen Menu App

A React Native (TypeScript) mobile application designed for restaurant menu management.  
The app allows restaurant owners and chefs to **add**, **view**, **filter**, and **manage** menu items, while guests can browse dishes easily.  
It uses **React Navigation** for screen transitions and **React Context API** for global state management.

---

 App Features

 Home Screen
- Displays the restaurant name and logo.
- Shows total menu items.
- Calculates and displays the average prices per course (Starters, Mains, Desserts).
- Lists all menu items with name, description, course, and price.
- Provides navigation buttons to:
  - Add / Manage Menu (for staff)
  - Filter Menu (for guests)

 Add / Manage Menu Screen
- Allows adding new dishes with:
  - Dish name
  - Description
  - Course type (Starters, Mains, Desserts)
  - Price in South African Rand (R)
- Displays the full list of menu items with a delete (×) button next to each item.
- Updates the shared menu state across the app.

 Filter Screen
- Allows users to filter the menu by course.
- Filter options: All | Starters | Mains | Desserts.
- Displays the filtered menu dynamically.
- Provides a button to return to the home screen.

---

## 🧩 Project Structure

