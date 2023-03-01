let data = [
  { period: "Март", name: "В программе ЦП", value: 120 },
  { period: "Апрель", name: "В программе ЦП", value: 120 },
  { period: "Май", name: "В программе ЦП", value: 120 },
  { period: "Июнь", name: "В программе ЦП", value: 120 },
  { period: "Июль", name: "В программе ЦП", value: 120 },
  { period: "Август", name: "В программе ЦП", value: 120 },
  { period: "Сентябрь", name: "В программе ЦП", value: 120 },
  { period: "Март", name: "В программе ИТ", value: 220 },
  { period: "Апрель", name: "В программе ИТ", value: 182 },
  { period: "Май", name: "В программе ИТ", value: 191 },
  { period: "Июнь", name: "В программе ИТ", value: 234 },
  { period: "Июль", name: "В программе ИТ", value: 290 },
  { period: "Август", name: "В программе ИТ", value: 330 },
  { period: "Сентябрь", name: "В программе ИТ", value: 310 },
  { period: "Март", name: "Вне программ ЦП", value: 620 },
  { period: "Апрель", name: "Вне программ ЦП", value: 732 },
  { period: "Май", name: "Вне программ ЦП", value: 701 },
  { period: "Июнь", name: "Вне программ ЦП", value: 734 },
  { period: "Июль", name: "Вне программ ЦП", value: 1090 },
  { period: "Август", name: "Вне программ ЦП", value: 1130 },
  { period: "Сентябрь", name: "Вне программ ЦП", value: 1120 },
  { period: "Март", name: "Вне программ ИТ", value: 120 },
  { period: "Апрель", name: "Вне программ ИТ", value: 132 },
  { period: "Май", name: "Вне программ ИТ", value: 101 },
  { period: "Июнь", name: "Вне программ ИТ", value: 134 },
  { period: "Июль", name: "Вне программ ИТ", value: 290 },
  { period: "Август", name: "Вне программ ИТ", value: 230 },
  { period: "Сентябрь", name: "Вне программ ИТ", value: 220 },
];

const inCpData = data
  .filter((el) => el.name === "В программе ЦП")
  .map((el) => el.value);

const inItData = data
  .filter((el) => el.name === "В программе ИТ")
  .map((el) => el.value);

const outCpData = data
  .filter((el) => el.name === "Вне программ ЦП")
  .map((el) => el.value);

const outItData = data
  .filter((el) => el.name === "Вне программ ИТ")
  .map((el) => el.value);

const months = [...new Set(data.map((item) => item.period))];

const categoryName = [...new Set(data.map((item) => item.name))];

function changeArr(arr, a, b) {
  arr[a] = arr.splice(b, 1, arr[a])[0];
}
changeArr(categoryName, 0, 1);
changeArr(categoryName, 2, 3);

const dom = document.getElementById("chart-container");
const myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});

const option = {
  title: {
    text: "Проекты в программах и вне программ",
    subtext:
      "Сумма и процентное соотношение проектов, находящихся в программах и вне программ",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    type: "scroll",
    orient: "horizontal",
    bottom: 10,
    data: categoryName,
  },
  toolbox: {
    feature: {
      magicType: {
        type: ["stack"],
      },
    },
  },
  calculable: true,
  xAxis: [
    {
      type: "category",
      data: months,
    },
  ],
  yAxis: [
    {
      type: "value",
      min: 100,
      max: 1500,
      interval: 100,
    },
  ],

  series: [
    {
      name: "В программе ЦП",
      type: "bar",
      color: "#56B9F2",
      stack: "one",
      data: inCpData,
    },
    {
      name: "В программе ИТ",
      type: "bar",
      color: "#0078D2",
      stack: "one",
      data: inItData,
    },
    {
      name: "Вне программ ЦП",
      type: "bar",
      color: "#22C38E",
      stack: "two",
      data: outCpData,
    },
    {
      name: "Вне программ ИТ",
      type: "bar",
      color: "#00724C",
      stack: "two",
      data: outItData,
    },
  ],
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
