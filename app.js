const auth='563492ad6f91700001000001c84723fce83d46c993eddb350985e0bc';
const gallery=document.querySelector('.gallery');
const searchBtn=document.querySelector('.search-btn');
const searchInput=document.querySelector('.search-input');
const form=document.querySelector('form');
const more=document.querySelector('.more');
let page=1;
let fetchLink;
let searchValue;
// Event
searchBtn.addEventListener('click',searchPhotos);
form.addEventListener('submit',(e)=>{
    e.preventDefault();
});

more.addEventListener('click',loadMore);

// functions
 
async function dataFetch(url){
    const dataFetch=await fetch(url,{
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization:auth
        }
    });
    const data=await dataFetch.json();
    return data;
}

async function curatedPhtos(){
    fetchLink='https://api.pexels.com/v1/curated?per_page=15&page=1';
  const data=await dataFetch(fetchLink);
    data.photos.forEach(photo=>{
        const galleryImg=document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML=`<a href='${photo.src.original}'><img src="${photo.src.large}"></a>`;;
        gallery.appendChild(galleryImg);
    })

}
async function searchPhotos(){
    const inputValue=searchInput.value;
    searchValue=searchInput.value;
    searchInput.value='';
    fetchLink=`https://api.pexels.com/v1/search?query=${inputValue}+query&per_page=15&page=${page}`;
    const data=await dataFetch(fetchLink);
    // removing old photos
    gallery.innerHTML='';
    // adding new photos
    data.photos.forEach(photo=>{
        const galleryImg=document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML=`<a href='${photo.src.original}'><img src="${photo.src.large}"></a>`;
        gallery.appendChild(galleryImg);
    })
    
}

async function loadMore(e){
    page++;
    if(!searchValue){
        fetchLink=`https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }else{
        fetchLink=`https://api.pexels.com/v1/search?query=${searchValue}+query&per_page=15&page=${page}`;  
    }
        const data=await dataFetch(fetchLink);
        data.photos.forEach(photo=>{
            const galleryImg=document.createElement('div');
            galleryImg.classList.add('gallery-img');
            galleryImg.innerHTML=`<a href='${photo.src.original}'><img src="${photo.src.large}"></a>`;
            gallery.appendChild(galleryImg);
        });
}




curatedPhtos();