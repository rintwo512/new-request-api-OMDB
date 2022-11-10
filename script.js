
// ******** Requset API menggunakan modern javascript *******

// function imdb(){
    
//     const btn = document.querySelector("#btn");
//     btn.addEventListener("click", async () =>{        
//         const inp = document.getElementById("keyword").value;
//         const dataFetch = await fungsiFetch(inp);

//         fungsiLoop(dataFetch);

//     });

// }

// function fungsiFetch(dataInp){
//     return fetch(`http://www.omdbapi.com/?apikey=b657b74e&s=${dataInp}`)
//         .then(success => success.json())
//         .then(result => result.Search);
// }

// function fungsiLoop(data){
//     let card = "";
    // cara loop 1

    // for (el of data){
    //     console.log(el);
    // }

    // cara loop 2

    // for(let i = 0; i < data.length; i ++){
    //     console.log(data[i]);
    // }

    // cara loop 3
//     data.forEach(el => {
//         card += fungsiView(el);
//     });

//     const container = document.querySelector(".card-cont");

//     container.innerHTML = card;

// }

// imdb();


// ******** Requset API menggunakan modern javascript *******



// ******** Requset API menggunakan modern vanilla javascript *******

// const btn = document.querySelector("#btn");
// function getData(success, error){
//     btn.addEventListener("click", function () {
        
//         const inp = document.getElementById("keyword").value;
//         const req = new XMLHttpRequest();

//         req.onreadystatechange = () =>{
//             if(req.readyState == 4 ){
//                 if(req.status === 200){
//                     success(req.response);
//                 }else{
//                     error(req.statusText);
//                 }
//             }
//         }

//         req.open("GET", `http://www.omdbapi.com/?apikey=b657b74e&s=${inp}`);
//         req.send();

//     });
// }

// getData(success => {

//       const data = JSON.parse(success);

//       const dataReal = data.Search;
      
//       fungsiLoop(dataReal);
      

//     }, error => {
//         error(alert("Oops!"));
// });

// function fungsiLoop(dataRealLoop){
//     let card = "";
//     for(let i = 0; i < dataRealLoop.length; i++){
//         card += fungsiView(dataRealLoop[i]);
//       }
//     const container = document.querySelector(".card-cont");
//     container.innerHTML = card;
// }
// ******** Requset API menggunakan modern vanilla javascript *******



// ******** Requset API menggunakan jQuery *******

function requestData(url){
    $("#btn").on("click", function() {

        const inp = $("#keyword").val();

        $.ajax({
            url: url + inp,
            success: res =>{
                const data = res.Search;
                let card = ""
                for(el of data){
                    card += fungsiView(el);
                }
                $(".card-cont").html(card);

                const allBTN = document.querySelectorAll(".modal-detail-btn");
                fungsigetDataDetails(allBTN);

            },
            error: err => {
                alert(err);
            }
        })

    });    
}


requestData("http://www.omdbapi.com/?apikey=b657b74e&s=");

function fungsigetDataDetails(btn){
    
    btn.forEach(el => {
        $(el).on("click", function() {
            const imdb = $(this).data("imdbid");
            $.ajax({
                url : `http://www.omdbapi.com/?apikey=b657b74e&i=${imdb}`,
                success : res => {                    

                    let cardUpdate = fungsiUpdateUI(res);

                    $(".modal-body").html(cardUpdate);
                },
                error : err => {
                    alert(err);
                }
            })
        });
    });

}


// ******** Requset API menggunakan jQuery *******




// http://www.omdbapi.com/?apikey=b657b74e&s=


function fungsiView(m){
    return `<div class="col-md-4 my-5">
    <div class="card" style="width: 18rem;">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title text-muted">${m.Title}</h5>
          <p class="card-text">${m.Year}</p>
          <a href="#" class="btn btn-primary modal-detail-btn" data-toggle="modal" data-target="#exampleModal" data-imdbid="${m.imdbID}">Details</a>
        </div>
      </div>
   </div>`;
}

function fungsiUpdateUI(det){
    return `<ul class="list-group">
    <li class="list-group-item"><strong>Actors</strong> : ${det.Actors}</li>
    <li class="list-group-item"><strong>Director : </strong> ${det.Director}</li>
    <li class="list-group-item"><strong>Genre : </strong>${det.Genre}</li>
    <li class="list-group-item"><strong>Plot : </strong>${det.Plot}</li>    
  </ul>`;
}