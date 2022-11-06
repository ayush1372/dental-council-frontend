# How to add new page route

- Create page into `/src/pages`
- export created page into `/src/pages/index.js`
- Add route meta into `/src/constants/NavigationMeta.js`

  Page will get rendered automatically.

  # How to add nesting route

- Create nesting page into `/src/pages/sub-pages`
- export created page into `/src/pages/index.js`
- Add sub route meta as subNav into `/src/constants/NavigationMeta.js`
