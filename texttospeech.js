const textarea= document.querySelector("textarea"),
voiceList=document.querySelector("select"),
speechbtn= document.querySelector("button");

let syn=speechSynthesis;
isSpeaking=true;

function voices()
{
for (let voice of syn.getVoices()){
    //  set default as US english
    let selected =voice.name ==="Google US English" ? "selected" :"";

    //option for voice and language
    let option=`<option value="${voice.name}"${selected}>${voice.name} (${voice.lang})</option>`
    voiceList.insertAdjacentHTML("beforeend", option);
}
}

syn.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utter= new SpeechSynthesisUtterance(text);
    for (let voice of syn.getVoices()){
        if(voice.name===voiceList.value){
            utter.voice=voice;
        }
    }
    syn.speak(utter);

}

speechbtn.addEventListener("click", e=>{
      e.preventDefault();
      if (textarea.value !==""){
        if(!syn.speaking){
            textToSpeech(textarea.value);
        }
        // pause and resume option
            if(textarea.value.length > 80){
                    if (isSpeaking){
                        syn.resume();
                        isSpeaking=false;
                        speechbtn.innerText="Pause Speech";
                    }else{
                        syn.pause();
                        isSpeaking=true;
                        speechbtn.innerText="Resume Speech";
                    }

                    setInterval(() =>{
                        if(!syn.speaking && !isSpeaking){
                            isSpeaking=true;
                            speechbtn.innerText="Convert to Speech";
                        }
                    });
             }else{
                speechbtn.innerText="Convert to Speech";
            }
     }
});