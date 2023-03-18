import todoDao from "~/dao/todoDao";

const todos = todoDao;

export default function dos() {
  console.log(todoDao.getData());
  todoDao.setData("blasbdasuiodhasuiodhuiasdui");
}
