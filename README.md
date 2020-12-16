# Vue.js Calendar Component
This Calendar component allows you to select check-in and check-out dates of your reservation.

![Alt Text](https://media.giphy.com/media/DclsrE1l9yVhPs6Ipc/giphy.gif)

&nbsp;

## Usage
### In Vue component
```html
  <Calendar
    :price="price"
    :rate="rate"
    :reviewsCount="reviewsCount"
    :availableDates="availableDates"
    :checkInDate="checkInDate"
    :checkOutDate="checkOutDate"
    @onReservationChange="onReservationChange"
  />
```
&nbsp;

### Properties table
prop name | type | description
------------ | ------------- | -------------
price | String | the price that will be displayed 
rate | Number | represents review stars, has to be between 0 and 5
reviewsCount | String | represents reviews number
availableDates | Array | array of objects with available dates, e.g. `[{ from: dateA, to: dateB }, ...]`
checkInDate | Date | initial check-in date, is optional
checkInOut | Date | initial check-out date, is optional
onReservationChange | Function | runs each time when check-in or check-out date changes, e.g:  `({ checkInDate, checkOutDate }) => { ...your code here }`

&nbsp;
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Runs unit test
```
yarn test
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
