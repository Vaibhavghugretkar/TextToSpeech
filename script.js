const SelectTag=document.querySelectorAll("select"),
 fromText=document.querySelector(".from-text"),
 translateBtn=document.querySelector("button"),
 toText=document.querySelector(".to-text"),
 exchangeIcon=document.querySelector(".exchange"),
 icons=document.querySelectorAll(".row span");

SelectTag.forEach((tag, id)=>{
    for (const country_code in countries) {
    //    console.log(countries[country_code]);
    let selected;
    if(id==0 && country_code =="en-GB")              //defualt english and hindi
    {
        selected="selected";
    } else if( id==1 && country_code =="hi-IN"){
    selected="selected"
    }
    let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
       tag.insertAdjacentHTML("beforeend",option);
    }
});


exchangeIcon.addEventListener("click", ()=>{
    let tempText=fromText.value;
    let tempLang= SelectTag[0].value;
    fromText.value=toText.value;
    SelectTag[0].value=SelectTag[1].value;
    toText.value=tempText;
    SelectTag[1].value=tempLang; 
});


translateBtn.addEventListener("click", ()=>{
    let text=fromText.value,
    translateFrom= SelectTag[0].value,
   translateTo=SelectTag[1].value;
    // console.log(text, translateFrom, translateTo);  
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...")
   let myAPI=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
   fetch(myAPI).then(res=>res.json()).then(data=>{
    console.log(data);
    toText.value=data.responseData.translatedText;
    toText.setAttribute("placeholder", "Translation")
   })
});
 
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        let utterance;
        if (target.classList.contains("material-symbols-outlined")) {

            if (target.id === "fromVolume") {
               utterance=new SpeechSynthesisUtterance(fromText.value);
               utterance.lang=SelectTag[0].value;
            }
            else if(target.id === "toVolume"){
                utterance=new SpeechSynthesisUtterance(toText.value);
                utterance.lang=SelectTag[1].value;
            }
          
           else if (target.id === "fromCopy") {
                      navigator.clipboard.writeText(fromText.value);
            } 
            else if (target.id === "toCopy") {
                navigator.clipboard.writeText(toText.value);
            }
        }
          speechSynthesis.speak(utterance);
    });
});