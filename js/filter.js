
function filterUsers(data) {

  const users = JSON.stringify(data);
  localStorage.setItem("data",users);
  
}
document.getElementById("button3").addEventListener("click",getData);
function getData() {
  const users = JSON.parse(localStorage.getItem("data"));
  const newUsers = [];
  for (const item of users) {
    
    const newBalance = item.balance.substring(1,item.balance.length).replace(/,/g,'');
    if(parseFloat(newBalance) > 5000) {
      newUsers.push(item);
    }

  }

  renderTemplate(newUsers);

}
