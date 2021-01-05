
console.log('Client side javascript file is loaded!')

const form=document.querySelector("form");
const input=document.querySelector("input");
let mess1=document.querySelector("#message1");
let mess2=document.querySelector("#message2");
const button=document.querySelector("button");
console.log(form);
console.log(input.value);
console.log(button);



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    mess1.textContent="Loading.....";
    mess2.textContent="";

    fetch(`http://localhost:3000/weather?address=${input.value}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data);
            mess1.textContent=data.error;
            mess2.textContent="";
        }
        else{
        mess1.textContent=data.forcast;
        mess2.textContent=data.place;
        console.log(data.place);}
    });
    });
});