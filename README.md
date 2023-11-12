# Flight Booking Web App

This application implements the following basic features:

- Select single / return flight
- Select travel from / to city
- Select travel take-off / return date
- Display flight information matching search queries

### Used tools & frameworks & libraries

- [Vite](https://vitejs.dev/) for frontend tooling
- [PrimeReact](https://primereact.org/) for UI component library
- [PrimeFlex](https://primeflex.org/) for CSS utility
- [dayjs](https://day.js.org/en/) for date/time processing

## How to run the project

```js
git clone {project-link}

cd flight-booking

npm install

npm run dev
```

#### What could be optimized

- unfortunately there is not enough time for building a real backend service / mock server, so the flight data is directly imported in the frontend.
- If time permits, maybe we could have a 2nd page to display flight booking detail, thus utilizing routing
- More animation could be added
