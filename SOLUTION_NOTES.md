# Solution Overview

## 1. Design System

After reviewing the Figma designs, I noticed that some UI elements that were logically expected to share the same style had minor inconsistencies. I standardized these elements by consolidating them into shared classes and made maximum use of Tailwind CSS utility classes.

## 2. Reusable components

I also created reusable UI components to keep the interface consistent and make future changes easier.. In the future, these components can be reused not only on the filters page but also in other parts of the user interface.

## 3. Data

Since filter data is standard across all users, I implemented caching to reuse the data and avoid making redundant requests.

## 4. Testing

I added tests alongside the implementation to verify the filter behavior and shared UI components. The tests cover individual logic and components, as well as how the homepage and filter modal work together.
