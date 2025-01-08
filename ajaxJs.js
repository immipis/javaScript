init();

//최초셋팅
function init() {
  //각 태그의 이벤트 처리
  document.querySelector('#initBtn').addEventListener('click',e=>{
    document.querySelectorAll('#info input, #info select').forEach(element => { //입력 태그를 검색 : input, select
      element.value = "";
    });
  })

  document.querySelector('#insertBtn').addEventListener('click',addUserInfo)
  document.querySelector('#updateBtn').addEventListener('click',updateUserInfo)
  document.querySelector('#delBtn').addEventListener('click',delUserInfo)
  //데이터를 가져오는 작업
  getUserList();
}


function getUserList() {
  //회원데이터 전체 조회
  fetch("http://192.168.0.11:8099/userList")
    .then(response => response.json())
    .then(result => {
      addTbody2(result)
    })
    .catch(err => console.log(err))    
}
function findUserInfo(id) {
  fetch(`http://192.168.0.11:8099/userInfo?id=${id}`)
    .then(response => response.json())
    .then(result => {
      for (const key in result) {
        document.getElementsByName(key)[0].value = (key == 'joinDate') ? result[key].slice(0, 10) : result[key]
      }
    })
    .catch(err => console.log(err))
}
function addTr(list) {
  list.forEach(e => {
    let html = `          
      <tr>
          <td>${e.no}</td>
          <td>${e.id}</td>
          <td>${e.name}</td>
          <td>${(e.joinDate).slice(0, 10)}</td>
        </tr>` 
    document.querySelector('#list tbody').insertAdjacentHTML("beforeend", html);
  });
}
/*
function addTbody(list){
  for (let info of list) {
    
    let trTag = document.createElement('tr');

    let tdTag = document.createElement('td');
    tdTag.textContent = info.no;
    trTag.append(tdTag)

    tdTag = document.createElement('td');
    tdTag.textContent = info.id;
    trTag.append(tdTag)

    tdTag = document.createElement('td');
    tdTag.textContent = info.name;
    trTag.append(tdTag)

    tdTag = document.createElement('td');
    tdTag.textContent = (info.joinDate).slice(0, 10);
    trTag.append(tdTag)

    document.querySelector('#list tbody').appendChild(trTag);
  }
}
*/
function addTbody2(list){
  document.querySelector('#list tbody').replaceChildren();
  list.forEach(element => {
    let trTag = addtrTag(element)
    document.querySelector('#list tbody').append(trTag)
  });
}

function addtrTag(info){
  let fields = ['no','id','name','joinDate']
  let trTag = document.createElement('tr');
  trTag.addEventListener('click', function (e) {
    findUserInfo(e.currentTarget.children[1].innerText)
  })
  for(let field of fields){
    let tdTag = document.createElement('td');
    tdTag.textContent = (field == 'joinDate') ? info[field].slice(0, 10) : info[field];
    trTag.append(tdTag)
  }
  return trTag
}
function addUserInfo(event){  //새로운 회원 등록
  //새로운 회원 정보
  let userInfo = formUserInfo();
  // 서버에 전송 : ajax
  fetch("http://192.168.0.11:8099/userInsert", {
    method: "POST",
    /* "Content-Type" 마다 데이터가 다름 
      application/x-www-form-urlencoded  = body : new URLSearchParams(userInfo) 
    */
    body: new URLSearchParams(userInfo)
  })
  .then(response => response.json())
  .then(result =>{
    document.getElementsByName('no')[0].value = result.no
    getUserList();
   })
  .catch(err => console.log(err))

}
function formUserInfo(){
  let obj={};
  document.querySelectorAll('#info input, #info select').forEach(element => {
    obj[element.name] =element.value;
  });
  return obj;
}

function updateUserInfo(event){  //새로운 회원 등록
  let userInfo = formUserInfo();
  fetch("http://192.168.0.11:8099/userUpdate", {
    method: "POST",
    /* "Content-Type" 마다 데이터가 다름 
      application/json = body : JSON.stringify(userInfo)
    */
    headers : {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(userInfo)
  })
  .then(response => response.json())
  .then(result =>{
    getUserList();
   })
  .catch(err => console.log(err))

}
function delUserInfo(event){
  let userInfo = formUserInfo();
  fetch(`http://192.168.0.11:8099/userDelete?id=${userInfo.id}`)
  .then(response => response.json())
  .then(result =>{
    getUserList();
    document.querySelectorAll('#info input, #info select').forEach(element => {
      element.value = "";
    });
   })
  .catch(err => console.log(err))
}