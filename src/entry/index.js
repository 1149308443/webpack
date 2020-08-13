import _ from "lodash";
import './common.css';
import './common.less';
import getData from '../utils';

const fnc = async () =>{ 
  const data =  await getData();
  console.log('支持es6语法');
  const what = data.wahta?.id || 1;
  console.log(what)
}

function component() {
  var element = document.createElement("div");

  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack","你好"], " ");
  element.classList.add('hello');
  fnc();
  return element;

}

document.body.appendChild(component());
