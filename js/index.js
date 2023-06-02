
const listUsers = async () => {

  const response = await fetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole');
  const users = await response.json();

  return users;

};

window.onload = async function () {

  const userResponse = await listUsers();
  renderTemplate(userResponse);
  filterUsers(userResponse);
};

function renderTemplate(data) {
  const source = document.getElementById('my-template').innerHTML;

  const template = Handlebars.compile(source);
  const renderedHtml = template({ users: data });
  document.getElementById('table-handlebars').innerHTML = renderedHtml;
}


function seniorityUser(created,name) {

  const dateNow = new Date();
  let textMonth = 'mes';
  let textYear = 'Año';
  let diff = dateNow - new Date(created);

  let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  diff -= years * (1000 * 60 * 60 * 24 * 365);

  let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  diff -= months * (1000 * 60 * 60 * 24 * 30);

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if(months > 1 ) textMonth = 'meses';
  if(years > 1) textYear = 'Años';

  let concatYear;
  let concatMonth;
  let concatDay;
  years > 0 ? concatYear = years + ' ' + textYear + ',' : concatYear = '';
  months > 0 ? concatMonth = months + ' ' + textMonth : concatMonth = '';
  days > 0 ? concatDay = days + ' ' + ' dias ' : concatDay = '';

  const seniorityText = document.getElementById("old");

  if(months === 0 && years === 0 && days === 0) return seniorityText.innerText = `${name} no tiene antiguedad`;
  

  seniorityText.innerText = `${name} tiene ${concatYear} ${concatMonth} ${concatDay} de antiguedad.`
} 

function userDetail(address,created,balance) {

  const source =  document.getElementById("my-template-detail").innerHTML;
  const template = Handlebars.compile(source);


  Handlebars.registerHelper('greaterThan', function (val1,val2,options) {
    return val1 > val2 ? options.fn(this) : options.inverse(this);
  });

  const limit = balance.substring(1,balance.length).replace(/,/g,'');
  const data = {
    address,
    created,
    balance:parseFloat(limit),
  };

  const renderedHtml = template(data);
  document.getElementById("user-detail-table").innerHTML = renderedHtml;

}


