export default (function () {
  const letters = "កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវសហឡអ".split("");

  const Lessons = [
    {
      name: "Lesson 1",
      main: [...letters],
      picker: [...letters],
      shuffle: "main",
      mainFont: "khmerosmoul",
      pickerFont: "battambang",
    },
    {
      name: "Lesson 2",
      main: [...letters].map((c) => "្" + c),
      picker: [...letters],
      shuffle: "main",
      mainFont: "battambang",
      pickerFont: "battambang",
    },
  ];

  function getLesson(lesson_index) {
    let lesson = { ...Lessons[lesson_index] };

    if (lesson.shuffle) {
      lesson[lesson.shuffle] = lesson[lesson.shuffle].sort(() => (Math.random() > 0.5 ? 1 : -1));
    }

    return lesson;
  }

  function getList() {
    let selectList = Lessons.map((v, i) => ({name: v.name, value: i}))
    return selectList;
  }

  return {
    getList: getList,
    getLesson: getLesson
  };
})();
