const data = [
  {
    date: "February 2022",
    price: 1258,
    count: 2,
    brand: "ASUS",
  },
  {
    date: "March 2022",
    price: 2281,
    count: 3,
    brand: "HTC",
  },
  {
    date: "April 2022",
    price: 2414,
    count: 3,
    brand: "SAMSUNG",
  },
  {
    date: "May 2022",
    price: 2515,
    count: 3,
    brand: "LG",
  },
  {
    date: "June 2022",
    price: 2947,
    count: 4,
    brand: "DELL",
  },
  {
    date: "July 2022",
    price: 2515,
    count: 3,
    brand: "HISENSE",
  },
  {
    date: "August 2022",
    price: 615,
    count: 1,
    brand: "REALME",
  },
  {
    date: "September 2022",
    price: 960,
    count: 1,
    brand: "DELL",
  },
  {
    date: "October 2022",
    price: 1239,
    count: 2,
    brand: "SAMSUNG",
  },
  {
    date: "November 2022",
    price: 2561,
    count: 3,
    brand: "HP",
  },
  {
    date: "December 2022",
    price: 1583,
    count: 2,
    brand: "LG",
  },
  {
    date: "January 2023",
    price: 1468,
    count: 2,
    brand: "LG",
  },
];

const databrand = data.map((e) => {
  if (e.price === 1258) {
    return e.brand;
  }
});

console.log(databrand.filter((e) => e)[0]);

console.log();
