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

 Project Structure
/ProjectRoot
│
├── App.tsx                   # Contains all app screens (Home, Add/Manage, Filter)
├── MenuContext.js            # Handles menu state management using Context API
├── MenuItem.js               # Reusable component for rendering menu items
├── assets/
│   └── logo.png              # App logo
├── package.json
└── README.md                 # Documentation

---

 Setup Instructions

 Install Dependencies
```bash
npm install

or if using Expo:
expo install


 Run the App
For React Native CLI:
npx react-native start
npx react-native run-android
 or
npx react-native run-ios

For Expo:
expo start


3 Core Dependencies Used
LibraryPurpose@react-navigation/nativeNavigation container@react-navigation/stackStack navigation for screen transitions@react-native-picker/pickerDropdown selector for coursesreact-native-screensImproves navigation performancereact-native-safe-area-contextHandles safe areas on devicesreact-native-reanimatedSmooth transitions and animationsreact-native-gesture-handlerEnables touch gesturesreact / react-nativeCore frameworkstypescriptType safety for .tsx files

 How It Works


MenuContext.js uses React Context to store and update menu data globally.


App.tsx defines all the screens and the navigation stack.


The menu array is shared across all screens (Home, Add/Manage, Filter).


When an item is added or deleted, the entire app updates in real-time.



 Changelog (Final Version — November 2025)
 Added


Complete TSX migration: All app screens (Home, Add/Manage, Filter) are now TypeScript components for better type safety.


React Navigation v6 integration for screen transitions.


Picker dropdown for course selection (@react-native-picker/picker).


Dynamic average price calculation per course on Home Screen.


Menu filtering feature with active button highlighting.


Full CRUD (Create/Delete) for menu items using shared Context state.


Simplified file structure — all screens combined into App.tsx as per project brief.


 Fixed


Cannot find module '@react-navigation/stack' error by adding missing dependencies.


Cannot find module '@react-native-picker/picker' error resolved via proper installation and type declarations.


Resolved TypeScript declaration errors with "skipLibCheck": true in tsconfig.json.


Improved data validation for empty or invalid inputs when adding menu items.


Cleaned redundant code to reduce the risk of runtime and type errors.


 Updated


Navigation buttons now use TouchableOpacity for a native mobile look.


Layout spacing, color scheme, and button alignment optimized for readability.


Context API logic cleaned for simpler add/remove operations.



 Testing
The app has been tested on both Android and iOS simulators using:


React Native CLI


Expo Go (for quick deployment)



 Minimum Requirements


Node.js: v18 or newer


npm: v9 or newer


React Native CLI or Expo SDK 51+



 Author
Christoffel’s Kitchen — Final MAST POE Project
Developed by Gomolemo Molebogeng Motlhabane (2025)

 License
This project is for academic and demonstration purposes under the MAST POE 2025 guidelines.

References

Fincher, M. Allrecipes. 20 different types of doughnuts you need to know, 28 July 2020. [online] Available at:

< https://www.allrecipes.com/gallery/types-of-donuts/ >

[Accessed 12 November 2025]

Fincher, M. Allrecipes, 2025. 30 most popular types of cookies. [online] Available at:

< https://www.allrecipes.com/gallery/most-popular-types-of-cookies/ >

[Accessed 12 November 2025]

Lowder, C. Delish. 38 pastry recipes from around the world, 22 September 2022. [online] Available at:

< https://www.delish.com/cooking/recipe-ideas/g41299455/pastry-recipes/ >

[Accessed 12 Novemeber 2025]

WebsturantStore. Types of bread, 11 June 2025. [online] Available at:

< https://www.webstaurantstore.com/article/801/bread-types.html?srsltid=AfmBOoqJo0aGrgTg2r3Ch6_8e_fEfst_LbewiytkSgYnwuF0cECzqww_>

[Accessed 12 Novemeber 2025]
Yodeck, Drive sales and save time with digital menu. [online] Available at:
<https://www.yodeck.com/digital-signage/menu-boards/?utm_adgroup=109114865950&utm_term=digital%20food%20menu&utm_campaign=Search:+Restaurants,+Bars+&+Cafes+(Industry)&utm_source=google&utm_medium=cpc&hsa_acc=2746003975&hsa_cam=919108208&hsa_grp=109114865950&hsa_ad=614552335656&hsa_src=g&hsa_tgt=kwd-9738732390&hsa_kw=digital%20food%20menu&hsa_mt=p&hsa_net=google&hsa_ver=3&gad_source=1&gad_campaignid=919108208&gbraid=0AAAAADiiywaoQGu5AidHoTi3-MUhOrPiB&gclid=CjwKCAiA_dDIBhB6EiwAvzc1cBzqQYFOVaqmW7IFgx0AvTAd1XnIF4kVa5fdQT-2mJU-2cHf_zqQ9RoC7GIQAvD_BwE>
[Accessed 12 November 2025]





