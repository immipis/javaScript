document.addEventListener('DOMContentLoaded', e => {


  /* 이벤트 캡쳐링 버블링 
    캡쳐링 = > 이벤트 찾아가는거 ex) hmtl > body > div ..... 별중요 x
    버블링 = > 다시 위로 
  */
  /* 
  ---필드
  event.target         //고정, 실제 이벤트 발생 태그     아닐수도 있슴
  event.currentTarget // 유동, 이벤트 버블링을 따라변함, 이벤트 핸들러가 등록된 태그
 
  ---메소드
  event.preventDefault()  // 기본막다 기본적으로 등록된 이벤트를 일시정지
  event.stopPropagation() // 이벤트 버블링 정지 stopPropagation 직역 => 전파 정지
  */


  document.querySelector("#insertBtn").addEventListener('click', e=>{
    insertTrTag()


  }) // 제거 가능 removeEventListener로

  // DOMContentLoaded 화면을 구성하는 DOM이 완성되는 시점 화면이 확실하게 완성이 된다면 실행
 
})

// onclick =  // 제거가 안댐
function insertTrTag(e) {
  let trTag = document.createElement('tr');
  let tdTag = document.createElement('td');5
  let inputTag = document.createElement('input');
  inputTag.type = 'checkbox';
  tdTag.append(inputTag);
  trTag.append(tdTag);

  tdTag = document.createElement('td');
  tdTag.textContent = getNextNo();
  trTag.append(tdTag);

  tdTag = document.createElement('td');
  inputTag = document.createElement('input');
  inputTag.type = 'text';
  inputTag.name = 'id';
  tdTag.append(inputTag);
  trTag.append(tdTag);

  tdTag = `<td><input type='password' name = 'password'></input></td>`;
  trTag.insertAdjacentHTML("beforeend", tdTag);

  tdTag = `<td>
    <select name = "gender">
      <option value="Male">남자</option>
      <option value="Female">여자</option>
    </select>
    </td>`;
  trTag.insertAdjacentHTML("beforeend", tdTag);

  tdTag = document.createElement('td');
  inputTag = document.createElement('input');
  inputTag.type = 'text';
  inputTag.name = 'name';
  tdTag.append(inputTag);
  trTag.append(tdTag);

  tdTag = document.createElement('td');
  inputTag = document.createElement('input');
  inputTag.type = 'date';
  inputTag.name = 'joinDate';
  tdTag.append(inputTag);
  trTag.append(tdTag);

  tdTag = document.createElement('td');
  let btnTag = document.createElement('button');
  tdTag.append(btnTag);
  btnTag.type = 'button';
  btnTag.textContent = '삭제';
  btnTag.addEventListener('click',function(event){
    let delbtn = event.currentTarget;
    let trTag = delbtn.closest('tr');
    trTag.remove();
  })

  trTag.append(tdTag);

  //기존 DOM에 등록된 태그에 추가
  document.querySelector('tbody').appendChild(trTag);
  
  let trList = document.querySelectorAll('tbody > tr');
  trList.forEach(trTag => {
    trTag.addEventListener('click', function (e) {
      if(e.target.tagName == 'SELECT') return;
      
      console.log(e.target)
      console.log(e.currentTarget)
    })
  })
  
}

function getNextNo() {
  let noList = document.querySelectorAll('tbody > tr >  td:nth-of-type(2)');
  console.log(noList)
  return ('00' + (Number(noList[noList.length - 1].textContent) + 1)).slice(-3);
};