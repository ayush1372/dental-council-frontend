# How to add multilingual to the Application

-Installed i18next library
npm i i18next@latest
-Created folder and individual dependency json file structuring in respective language folders into
`/src/locales\en\`
-Imported Translation hook in all the available pages
`import { useTranslation } from 'react-i18next'` declared a variable `t` and wrapped the dependencies properties with it.
