

//https://raw.githubusercontent.com/uzairahmed-uzzi/SMIT-ASSIGN-3-MOVIE-RECOMMENDATION-APP/main/data.json
const url="https://image.tmdb.org/t/p/w45";
(async()=>{
    const response=await fetch("https://raw.githubusercontent.com/uzairahmed-uzzi/SMIT-ASSIGN-3-MOVIE-RECOMMENDATION-APP/main/data.json");
    const result=await response.json();
    let genDropDown=document.getElementById("genre");
    let yearDropDown=document.getElementById("year");
    let langDropDown=document.getElementById("lang");
    let ratingDropDown=document.getElementById("rating");
    let films=document.getElementById("films");
    let btnSearch=document.getElementById("btnSearch");
    let genre=new Set();
    let year=new Set();
    let lang=new Set();
    let rating=new Set();
    
    await result.forEach(obj => {
        for(let i of obj['genres']){
            if (Array.isArray( obj['genres'])){
                genre.add(i);
            }    
        }
        year.add(obj.release_date.slice(0,4));
        lang.add(obj.original_language);
        rating.add(obj.vote_average);
    });
    for(let o of genre){
    genDropDown.innerHTML+=`<option value="${o}">${o}</option>`;
}
    for(let y of year){
        yearDropDown.innerHTML+=`<option value="${y}">${y}</option>`;
}
    for(let l of lang){
        langDropDown.innerHTML+=`<option value="${l}">${l}</option>`;
}
for(let r of rating){
    ratingDropDown.innerHTML+=`<option value="${r}">${r}</option>`;
}
const renderMovies=(obj)=>{
    films.innerHTML=`
    <div id="headingHeader"class="heading">
    <div class="rank">
        <h3>RANK</h3>
    </div>
    <div class="title">
        <h3>TITLE</h3>
    </div>
    <div class="year">
        <h3>YEAR</h3>
    </div>        
</div>
      
    `;
    let count=1;
    obj.forEach((o)=>{
        films.innerHTML+=`<div class="heading">
        <div class="rank">
            <h3>${count}</h3>
        </div>
        <div class="title">
            <div class="image">
                <a href="${o.homepage}"><img src="${url}${o.poster_path}" alt="IMAGE" ></a>
            </div>
            <div class="titleContent">
            <h3>${o.title}</h3>
            <p>${[...o.genres]}</p>
        </div>
        </div>
        <div class="year">
            <h3>${o.release_date.slice(0,4)}</h3>
        </div>        
    </div>`
        ;
        count++;
        
        if(count>=100){

            throw ("");
        }
    
    })
}


const filterMovies= ()=>{
    let query= document.getElementById("search").value;
    let genVal= genDropDown.value;
    let langVal=langDropDown.value;
    let yearVal=yearDropDown.value;
    let ratingVal=ratingDropDown.value;
    let resQuery;
    if(genVal!="all"&&langVal!="all"&&yearVal!="all"&&ratingVal!="all"&&query!==""){
        resQuery=result.filter((obj)=>{
            if (obj['title'].toLowerCase().includes(query.toLowerCase())&&obj['genres'].includes(genVal)&&obj['release_date'].slice(0,4).includes(yearVal)&&obj['original_language'].includes(langVal)&&String(obj['vote_average']).includes(String(ratingVal))){       
                
                return true;
               }    
        });
    }
    else if(genVal==="all"&&langVal==="all"&&yearVal==="all"&&ratingVal==="all"&&query===""){
        resQuery=result;
    }
    else{
        resQuery=result.filter((obj)=>{
            if(query!==""){
            if (obj['title'].toLowerCase().includes(query.toLowerCase())){
                        return true;
               }   
            }
            else{
                return obj['genres'].includes(genVal)||obj['release_date'].slice(0,4).includes(yearVal)||obj['original_language'].includes(langVal)||String(obj['vote_average']).includes(String(ratingVal));
            }
        });
    }
    renderMovies(resQuery);
};
btnSearch.addEventListener("click",filterMovies);
setTimeout(filterMovies,2000);
})()
