import _ from "lodash";
import './common.css';
import './common.scss';
import getData from '../utils';

const fnc = async () =>{ 
  console.log("是否支持bable");
  const data =  await getData();
  console.log(data);
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
