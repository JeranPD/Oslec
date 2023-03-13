const data = [
  {
    date: "July 2022",
    price: 627,
    brand: "HISENSE",
  },
  {
    date: "June 2022",
    price: 984,
    brand: "DELL",
  },
  {
    date: "November 2022",
    price: 985,
    brand: "HP",
  },
  {
    date: "October 2022",
    price: 690,
    brand: "SAMSUNG",
  },
  {
    date: "December 2022",
    price: 845,
    brand: "LG",
  },
  {
    date: "January 2023",
    price: 646,
    brand: "LG",
  },
  {
    date: "December 2022",
    price: 738,
    brand: "HTC",
  },
  {
    date: "September 2022",
    price: 960,
    brand: "DELL",
  },
  {
    date: "July 2022",
    price: 944,
    brand: "DELL",
  },
  {
    date: "November 2022",
    price: 842,
    brand: "HISENSE",
  },
  {
    date: "November 2022",
    price: 734,
    brand: "HTC",
  },
  {
    date: "July 2022",
    price: 944,
    brand: "HISENSE",
  },
  {
    date: "October 2022",
    price: 549,
    brand: "HISENSE",
  },
  {
    date: "August 2022",
    price: 615,
    brand: "REALME",
  },
  {
    date: "January 2023",
    price: 822,
    brand: "LENOVO",
  },
];

const groupedData = data.reduce((acc, curr) => {
  if (!acc[curr.date]) {
    acc[curr.date] = {
      date: curr.date,
      price: curr.price,
      count: 1,
      brand: {},
    };
  } else {
    acc[curr.date].price += curr.price;
    acc[curr.date].count++;
  }

  if (!acc[curr.date].brand[curr.brand]) {
    acc[curr.date].brand[curr.brand] = 1;
  } else {
    acc[curr.date].brand[curr.brand]++;
  }
  return acc;
}, {});

const finalData = Object.values(groupedData).map((dateData) => {
  let maxBrand = "";
  let maxBrandCount = 0;
  for (let brand in dateData.brand) {
    if (dateData.brand[brand] > maxBrandCount) {
      maxBrand = brand;
      maxBrandCount = dateData.brand[brand];
    }
  }
  return {
    date: dateData.date,
    price: dateData.price,
    count: dateData.count,
    brand: maxBrand,
  };
});
console.log(finalData);
