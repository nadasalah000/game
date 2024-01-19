var cards = document.getElementById("cards");
var loading = document.getElementById("loading");
var oneLink = document.getElementById("oneLink");
var nav = document.getElementById("nav");
var details = document.getElementById("details");
var gd = document.getElementById("gd");
const activeLink=document.querySelectorAll('ul li a');


var arr =[];
var idd ;
var det;
getGame("MMORPG");


async function getGame(key){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '74f32ac738mshbbcc036eb7f5108p1b2dd6jsnd8bed3865285',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${key}`,options);
    const respons = await api.json();
    arr = respons;
   //  console.log(arr);
    loading.classList.replace("d-flex","d-none");
    display();
}

for(let clickTab of activeLink){  
    clickTab.onclick=function(){
        let activeClass=document.querySelectorAll('li a.active');
        activeClass[0].classList.remove('active')
        clickTab.classList.add('active'); 
    }  
}

document.addEventListener("click", function(e){
  if(e.target.text==="mmorpg"|| e.target.text==="shooter"|| e.target.text==="sailing"||e.target.text==="permadeath"||e.target.text==="superhero"||e.target.text==="pixel"){
   //  console.log(e.target.text);
    getGame(e.target.text);
  }
})

function display(){
    var cartoona = ``;
    for(var i=0; i<arr.length; i++){
        cartoona +=` <div class="col-md-6 col-lg-4 col-xl-3 g-4" id="card">
        <div class="card mt-4">
          <img src="${arr[i].thumbnail}" alt="game photo" id="${arr[i].id}">
           <div class="one">
             <div class="ab">
                 <h5>${arr[i].title}</h5>
             </div>
             <button type="button" class="btn btn-primary">free</button>
           </div>
           <p class="text-center text-muted">${arr[i].short_description}</p>
           <div class="two">
             <div class="two1">
                 <h6>${arr[i].genre}</h6>
             </div>
             <div class="two2">
                 <h6>${arr[i].platform}</h6>
             </div>
           </div>
        </div>
     </div>`
    }
    cards.innerHTML = cartoona;
}

cards.addEventListener("click", function(e){
  var x=e.target;
//   console.log(x);
  var parentElement = x.parentNode;  
//   console.log(parentElement);
  idd=parentElement.children[0].id;
//   console.log(idd);
   open(idd);  
})

function open(index){
  console.log(index)
//   console.log(arr)
  for(var i=0; i<arr.length;i++){
    if(index == arr[i].id){
      // console.log(arr[i])
      det =arr[i];
    }
  }
  details.classList.replace("d-none","d-block");
  nav.classList.replace("d-block","d-none")
  edit()
}

function edit(){
  console.log(det);
  var car = `<div class="play">
  <h1 class="">Details Game</h1>
  <span class="bg-transparent close mt-2" id="btnClose"><i class="fa-solid fa-xmark"></i></span>
</div>

  <div class="row g-4 pt-3" id="detailsContent">
     <div class="col-lg-4">
        <img src="${det.thumbnail}" class="w-100">
     </div>
     <div class="col-lg-8">
        <div class="row">
           <h2>Title: ${det.title}</h2>
        </div>
        <div class="row p1">
           <h4>Category:</h4>
           <p class="bg-primary text-dark">${det.genre}</p>
        </div>
        <div class="row p1 p2">
           <h4>Platform:</h4>
           <p class="bg-primary text-dark">${det.platform}</p>
        </div>
        <div class="row p1 p3">
           <h4>Status:</h4>
           <p class="bg-primary text-dark">Live</p>
        </div>
        <div class="row">
           <p class="pTop">${det.short_description}</p>
        </div>
        <div class="row">
           <div class="col-md-3">
              <button class="btn btn-outline-warning text-light"><a target="_blank" href="${det.game_url}">Show Game</a></button>
           </div>
        </div>
     </div>
  </div>`
  gd.innerHTML = car;
//   console.log(gd);
  let btnClose = document.getElementById("btnClose");

  btnClose.addEventListener("click",function(){
    details.classList.replace("d-block","d-none");
    nav.classList.replace("d-none","d-block")
  })
}
