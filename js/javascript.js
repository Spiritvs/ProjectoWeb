// JavaScript Document

//var teste = document.getElementById('som1');
//var end = 0;
//
//
//teste.addEventListener('ontimeupdate', function(ev) {
//  if (teste.currentTime > end) {
//    teste.pause();
//    }
//},false);
//
//function playSpecial(){
//    teste.currentTime = 0;
//    end = 1;
//    teste.play();
//}

var musica;
var volumeAux = 0;
//Toca e pausa a musica, recebe o id da musica como parametro e o id da div para mudar o icon.
function playPause(id, div){
    musica = document.getElementById(id);
	var icon = document.getElementById(div);
    if (musica.paused){
		icon.setAttribute("style","background-image:url(imgs/pause.png);");
         musica.play();
    }else{
		icon.setAttribute("style","background-image:url(imgs/play.png);");
         musica.pause();
    }
}

function repeat(id, div){
	musica = document.getElementById(id);
	var icon = document.getElementById(div);
	if (musica.loop){
		icon.setAttribute("style","background-image:url(imgs/loopOff.png);");
        musica.loop = false;
    }else{
		icon.setAttribute("style","background-image:url(imgs/loop.png);");
		musica.loop = true;
    }
}

//Para a musica e faz reset para o inicio, recebe o id da musica como parametro.
function stopmusica(id, div){
    musica = document.getElementById(id);
	var icon = document.getElementById(div);
    musica.pause();
    musica.currentTime = 0;
	icon.setAttribute("style","background-image:url(imgs/play.png);");
}

function silencio(id, div){
    musica = document.getElementById(id);
	var icon = document.getElementById(div);
	if (musica.volume === 0){
		musica.volume = volumeAux;
		icon.setAttribute("style","background-image:url(imgs/muteOff.png);");
	}
	else{
		volumeAux = musica.volume;
		musica.volume = 0;
		icon.setAttribute("style","background-image:url(imgs/mute.png);");
	}
  }


//Update do tempo para saber em que posiçao está na musica tb faz o update do seeker.
function updateTime(id, div){
    musica = document.getElementById(id);
    var currentSeconds = (Math.floor(musica.currentTime % 60) < 10 ? '0' : '') + Math.floor(musica.currentTime % 60);
    var currentMinutes = Math.floor(musica.currentTime / 60);
    //Sets the current song location compared to the song duration.
    document.getElementById(div).innerHTML = currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(musica.duration / 60) + ":" + (Math.floor(musica.duration % 60) < 10 ? '0' : '') + Math.floor(musica.duration % 60);

}

function removeAudio(div){
	parentDiv = div.parentNode.parentNode;
	while(parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
	}
	parentDiv.setAttribute("style","background-image:url(imgs/draghere.png);");
}


function addMusica(){
// Criar uma referencia á div com o id 'musicas'
var divMusicas = document.getElementById('musicas'),
// Cria um novo elemento do tipo 'div'
	div = document.createElement("div"),
// Cria um novo elemento do tipo 'img'
    img = document.createElement('img'),
// Cria um novo elemento do tipo 'i'
    ital = document.createElement('i'),
// Cria o texto
    text = document.createTextNode('Musica '+j);
//Define os atributos da nova 'div'
div.setAttribute("style", "width:185px; height:auto; margin-top:15px; text-align: center;");
//Define os atributos da nova 'img'
img.setAttribute("dragable", "true");
img.setAttribute("ondragstart", "drag(event)");
img.setAttribute("id", "m"+j);
img.setAttribute("src", "imgs/file.png");
img.setAttribute("height", "50");
img.setAttribute("width", "50");
img.setAttribute("style", "margin-left:68px;  display: block;");
//Define os atributos do novo 'i'
ital.setAttribute("style", "font-family: font; font-size:20px;");
// Faz o append (junta) o novo texto criado ao novo i
ital.appendChild(text);
// Depois junta a imagem e o texto á nova div
div.appendChild(img);
div.appendChild(ital);
//Por fim insere a nova div dentro da div já existente chamada musicas
divMusicas.appendChild(div);

var audio = document.createElement('audio');
audio.setAttribute("id", "som"+j);
audio.setAttribute("src", "musicas/som"+j+".mp3");
audio.setAttribute("type", "audio/mp3");
audio.setAttribute("onTimeUpdate", "updateTime('som"+j+"','tempo"+j+"')");
 
img.appendChild(audio);
//document.getElementById('audioC1').appendChild(audio);
j++;
}

function createSlides(id, seek, trim, volume){
var som = document.getElementById(id);
var sliderSeek = $('#'+seek);
var sliderTrim = $('#'+trim);
var sliderVolume = $('#'+volume);

sliderSeek.noUiSlider({
range: [0,100]
,start: 0
,handles:1
,connect: "lower"
,slide: function(){  som.pause();}
}).change( function(){
	som.play();
	var time = som.duration * (sliderSeek.val() / 100);
	som.currentTime = time;
});

som.addEventListener("timeupdate", function() {
  var value = (100 / som.duration) * som.currentTime;
  sliderSeek.val(value);
});

sliderTrim.noUiSlider({
		range: [0,100]
		,start: [50,60]
		,handles:2
		,connect: true
		,behaviour: 'fixed-drag'
	});
	//sliderTrim.noUiSlider.on("mousedown", function(){alert("draggin");});
	
sliderVolume.noUiSlider({
		range: [0,100]
		,start: 50
		,handles:1
		,connect: "lower"
		,behaviour: 'tap'
	}).change( function(){
		var volume = sliderVolume.val() / 100;
		som.volume = volume;
	});
	
som.addEventListener("volumechange", function() {
	  sliderVolume.val(som.volume*100);
	});
}


function createDiv(track, som){
	container = document.getElementById(track);
	while(container.firstChild) {
    container.removeChild(container.firstChild);
	}
	container.setAttribute("style","background-image:url(imgs/fundo.png);");
	containerUm = document.createElement('div');
	titulo = document.createElement('div');
	nome = document.createElement('div');
	tempoC = document.createElement('div');
	loop = document.createElement('div');
	seekContainer = document.createElement('div');
	seek = document.createElement('div');
	play = document.createElement('div');
	trimContainer = document.createElement('div');
	trim = document.createElement('div');
	stop = document.createElement('div');
	containerDois = document.createElement('div');
	containerTres = document.createElement('div');
	mute = document.createElement('div');
	volumeMenos = document.createElement('div');
	volumeMais = document.createElement('div');
	volume = document.createElement('div');
	
	containerUm.setAttribute("class", "containerUm");
	titulo.setAttribute("class", "titulo");
	nome.setAttribute("class", "nome");
	nome.innerHTML = "Musica " +i+ ".mp3";
	tempoC.setAttribute("class", "tempoC");
	tempoC.setAttribute("id", "tempo"+i);
	tempoC.innerHTML = "0:00/0:00";
	loop.setAttribute("class", "loop");
	loop.setAttribute("id", "loop"+i);
	loop.setAttribute("onClick", "repeat('som"+i+"','loop"+i+"');");
	seekContainer.setAttribute("class", "seekContainer");
	seek.setAttribute("class", "seek");
	seek.setAttribute("id", "seek"+i);
	play.setAttribute("class", "play");
	play.setAttribute("id", "play"+i);
	play.setAttribute("onClick", "playPause('som"+i+"', 'play"+i+"');");
	//	play.setAttribute("onClick", "playPause('"+som+"', 'play"+i+"');");
	trimContainer.setAttribute("class", "trimContainer");
	trim.setAttribute("class", "trim");
	trim.setAttribute("id", "trim"+i);
	stop.setAttribute("class", "stop");
	stop.setAttribute("onClick", "stopmusica('som"+i+"', 'play"+i+"');");
	containerDois.setAttribute("class", "containerDois");
	containerTres.setAttribute("class", "containerTres");
	mute.setAttribute("class", "mute");
	mute.setAttribute("id", "mute"+i);
	mute.setAttribute("onClick", "silencio('som"+i+"','mute"+i+"');");
	volumeMenos.setAttribute("class", "volumeMenos");
	volumeMais.setAttribute("class", "volumeMais");
	volume.setAttribute("class", "volume");
	volume.setAttribute("id", "volume"+i);
	
	titulo.appendChild(nome);
	titulo.appendChild(tempoC);
	titulo.appendChild(loop);
	seekContainer.appendChild(seek);
	seekContainer.appendChild(play);
	trimContainer.appendChild(trim);
	trimContainer.appendChild(stop);
	containerUm.appendChild(titulo);
	containerUm.appendChild(seekContainer);
	containerUm.appendChild(trimContainer);
	containerTres.appendChild(mute);
	containerTres.appendChild(volumeMenos);
	containerTres.appendChild(volume);
	containerTres.appendChild(volumeMais);
	container.appendChild(containerUm);
	container.appendChild(containerDois);
	container.appendChild(containerTres);
	createSlides('som'+i,'seek'+i,'trim'+i,'volume'+i);
	i++;
}