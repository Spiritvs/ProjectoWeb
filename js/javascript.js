// JavaScript

var musica;
var volumeAux = 0;

$(document).ready(function() {
	$("#carregarFicheiros").uploadFile({
		url : "add_file.php",
		dataType : "text",
		allowedTypes : "mp3,wav,ogg",
		fileName : "myfile",
		showStatusAfterSuccess : false,
		onSuccess : function(files, data, xhr) {
			//alert(data.status);
			if (data.status == true) {
				//alert(":) "+ data.data);
				addMusica(files, data.data);
			} else {
				alert(":( " + data.data);
			}
		},
	});
});

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("Text", ev.target.id);
	//IMPORTANTE Define o que vai transferir, neste caso é o id do target (audio container)
}

function drop(id, ev) {

	ev.preventDefault();
	var track = document.getElementById(id);
	var imagem = ev.dataTransfer.getData("Text");
	var div = document.getElementById(imagem);
	var parentDiv = div.parentNode.parentNode;
	var texto = parentDiv.textContent;
	while (track.firstChild) {
		track.removeChild(track.firstChild);
	}
	createDiv(id, texto, imagem);
}

function playAll(nome) {
	var checkboxes = document.getElementsByName(nome);
	var checkboxesChecked = [];
	// loop todas as checkboxes
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			var id = checkboxes[i].id;
			var som = id.replace("checkbox", "som");
			var div = id.replace("checkbox", "play");
			var musica = document.getElementById(som);
			var icon = document.getElementById(div);
			musica.play();
			icon.setAttribute("style", "background-image:url(imgs/pause.png);");
		}
	}
}

function pauseAll(nome) {
	var checkboxes = document.getElementsByName(nome);
	var checkboxesChecked = [];
	// loop todas as checkboxes
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			var id = checkboxes[i].id;
			var som = id.replace("checkbox", "som");
			var div = id.replace("checkbox", "play");
			var musica = document.getElementById(som);
			var icon = document.getElementById(div);
			musica.pause();
			icon.setAttribute("style", "background-image:url(imgs/play.png);");
		}
	}
}

function stopAll(nome) {
	var checkboxes = document.getElementsByName(nome);
	var checkboxesChecked = [];
	// loop todas as checkboxes
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			var id = checkboxes[i].id;
			var som = id.replace("checkbox", "som");
			var div = id.replace("checkbox", "play");
			var musica = document.getElementById(som);
			var icon = document.getElementById(div);
			musica.pause();
			musica.currentTime = 0;
			icon.setAttribute("style", "background-image:url(imgs/play.png);");
		}
	}
}

//Toca e pausa a musica, recebe o id da musica como parametro e o id da div para mudar o icon.
function playPause(id, div) {
	musica = document.getElementById(id);
	var icon = document.getElementById(div);
	if (musica.paused) {
		icon.setAttribute("style", "background-image:url(imgs/pause.png);");
		musica.play();
	} else {
		icon.setAttribute("style", "background-image:url(imgs/play.png);");
		musica.pause();
	}
}

//Liga e desliga o loop, troca o icon de acordo com a selecção.
function repeat(id, div) {
	musica = document.getElementById(id);
	var icon = document.getElementById(div);
	if (musica.loop) {
		icon.setAttribute("style", "background-image:url(imgs/loopOff.png);");
		musica.loop = false;
	} else {
		icon.setAttribute("style", "background-image:url(imgs/loop.png);");
		musica.loop = true;
	}
}

//Para a musica e faz reset para o inicio, recebe o id da musica como parametro.
function stopmusica(id, div) {
	musica = document.getElementById(id);
	var icon = document.getElementById(div);
	musica.pause();
	musica.currentTime = 0;
	icon.setAttribute("style", "background-image:url(imgs/play.png);");
}

//Liga e desliga o mute. Guarda o volume anterior num auxiliar de forma a voltar ao som quando se faz unmute
//Tb altera o icon
function silencio(id, div) {
	musica = document.getElementById(id);
	var icon = document.getElementById(div);
	if (musica.volume === 0) {
		musica.volume = volumeAux;
		icon.setAttribute("style", "background-image:url(imgs/muteOff.png);");
	} else {
		volumeAux = musica.volume;
		musica.volume = 0;
		icon.setAttribute("style", "background-image:url(imgs/mute.png);");
	}
}

//Update do tempo para saber em que posiçao está na musica.
function updateTime(id, div) {
	musica = document.getElementById(id);
	var currentSeconds = (Math.floor(musica.currentTime % 60) < 10 ? '0' : '') + Math.floor(musica.currentTime % 60);
	var currentMinutes = Math.floor(musica.currentTime / 60);
	//Muda o innerHTML de acordo com o tempo novo
	document.getElementById(div).innerHTML = currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(musica.duration / 60) + ":" + (Math.floor(musica.duration % 60) < 10 ? '0' : '') + Math.floor(musica.duration % 60);

}

//Remove uma pista, acedendo ao parent Nod mais alto remove todos os childrens do mesmo até nada restar
//No final insere uma nova imagem de fundo na div
function removeAudio(div, id) {
	musica = document.getElementById(id);
	parentDiv = div.parentNode.parentNode;
	musica.pause();
	musica.currentTime = 0;
	while (parentDiv.firstChild) {
		parentDiv.removeChild(parentDiv.firstChild);
	}
	parentDiv.setAttribute("style", "background-image:url(imgs/draghere.png); box-shadow: -5px 5px 5px 0px rgba(50, 50, 50, 0.7);");
}

//Adiciona a musica á lista depois de ter ido feito o upload
function addMusica(nome, id) {
	// Cria uma referencia á div com o id 'musicas'
	var divMusicas = document.getElementById('musicas'),
	// Cria um novo elemento do tipo 'div'
	div = document.createElement("div"),
	// Cria um novo elemento do tipo 'img'
	img = document.createElement('img'),
	// Cria um elemento texto
	text = document.createTextNode(nome),
	// Cria o botão remove
	rmv = document.createElement('img'),
	//Div onde vai o texto
	divTxt = document.createElement("div"),
	cbtns = document.createElement("div");
	//Define os atributos das novas 'div'
	div.setAttribute("style", "width:165px; height:auto; margin-top:15px; margin-left:10px; margin-right:10px; cursor: pointer;");
	cbtns.setAttribute("style", "width:165px; height:50px;");
	divTxt.setAttribute("style", "width:165px; height:auto;font-family: font; font-size:20px; text-align: center; overflow:hidden;");
	divTxt.setAttribute("onclick","mudaNome(this)");
	//Define os atributos das novas 'img'
	img.setAttribute("dragable", "true");
	img.setAttribute("ondragstart", "drag(event)");
	img.setAttribute("id", +id);
	img.setAttribute("src", "imgs/file.png");
	img.setAttribute("height", "50");
	img.setAttribute("width", "50");
	img.setAttribute("style", "margin-left: 50px; display: block; float:left;");
	
	rmv.setAttribute("src", "imgs/remove.png");
	rmv.setAttribute("height", "20");
	rmv.setAttribute("width", "20");
	rmv.setAttribute("style", "margin-right:15px; margin-top:15px; float:right; cursor: pointer;");
	rmv.setAttribute("onclick","rmvMusica(this)");
	
		
	// Depois junta a imagem e o texto á nova div e o audio é imagem.
	cbtns.appendChild(img);
	cbtns.appendChild(rmv);
	divTxt.appendChild(text);
	div.appendChild(cbtns);
	div.appendChild(divTxt);
	//insere a nova div dentro da div já existente chamada musicas
	divMusicas.appendChild(div);
}

function mudaNome(id){
	var nome = prompt("Novo nome?");
	id.innerHTML=nome;
};

function rmvMusica(id){
var parentDiv = id.parentNode.parentNode;
	while (parentDiv.firstChild) {
		parentDiv.removeChild(parentDiv.firstChild);
	}
};

function createSlides(id, seek, trim, volume, div) {
	
		var som = document.getElementById(id);
		var icon = document.getElementById(div);
		var sliderSeek = $('#'+seek);
		var sliderTrim = $('#'+trim);
		var sliderVolume = $('#'+volume);
		var aux = [];
		aux[0] = 0;
		aux[1] = som.duration;

		sliderSeek.noUiSlider({
			range : [0, 100],
			start : 0,
			handles : 1,
			connect : false,
			slide : function() {
				som.pause();
				icon.setAttribute("style", "background-image:url(imgs/play.png);");
			}
		}).change(function() {
			som.play();
			icon.setAttribute("style", "background-image:url(imgs/pause.png);");
			var time = som.duration * (sliderSeek.val() / 100);
			som.currentTime = time;
			if (som.currentTime < aux[0]) {
				som.currentTime = aux[0];
			}
		});

		som.addEventListener("timeupdate", function() {
			var value = (100 / som.duration) * som.currentTime;
			sliderSeek.val(value);
			if (som.loop == true) {
				if (som.currentTime >= aux[1]) {
					som.currentTime = aux[0];
				};
			} else {
				if (som.currentTime >= aux[1] || som.ended) {
					som.currentTime = aux[0];
					som.pause();
					icon.setAttribute("style", "background-image:url(imgs/play.png);");
				};
			};
		});

		sliderTrim.noUiSlider({
			range : [0, 100],
			start : [0, 100],
			handles : 2,
			connect : true,
			behaviour : 'tap-drag'
		}).change(function() {
			aux = sliderTrim.val();
			aux[0] = som.duration * (aux[0] / 100);
			aux[1] = som.duration * (aux[1] / 100);
			som.currentTime = aux[0];
		});

		sliderVolume.noUiSlider({
			range : [0, 100],
			start : 100,
			handles : 1,
			connect : "lower",
			behaviour : 'tap'
		}).change(function() {
			var volume = sliderVolume.val() / 100;
			som.volume = volume;
		});

		som.addEventListener("volumechange", function() {
			sliderVolume.val(som.volume * 100);
		});
}

function createDiv(track, texto, i) {
	//Limpa
	container = document.getElementById(track);
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
	while(document.getElementById('som'+i)!=null){
		i++;
	}
	//cria a tag audio de acordo com o id da musica á qual foi feito o upload
	//Recebendo o id directamente da base de dados.
	var audio = document.createElement('audio');
	audio.setAttribute("id", "som" + i);
	audio.setAttribute("src", "uploads/" + texto + "");
	audio.setAttribute("onTimeUpdate", "updateTime('som" + i + "','tempo" + i + "')");
	//Cria o Html Todo
	container.setAttribute("style", "background-image:url(imgs/fundo.png); box-shadow: none;");
	containerUm = document.createElement('div');
	titulo = document.createElement('div');
	nome = document.createElement('div');
	tempoC = document.createElement('div');
	loop = document.createElement('div');
	wrapper = document.createElement('div');
	seek = document.createElement('div');
	trim = document.createElement('div');
	play = document.createElement('div');
	stop = document.createElement('div');
	containerDois = document.createElement('div');
	containerTres = document.createElement('div');
	mute = document.createElement('div');
	boxContainer = document.createElement('div');
	checkbox = document.createElement('input');
	label = document.createElement('label');
	remove = document.createElement('div');
	lock = document.createElement('div');
	volumeMenos = document.createElement('div');
	volumeMais = document.createElement('div');
	volume = document.createElement('div');

	containerUm.setAttribute("class", "containerUm");
	titulo.setAttribute("class", "titulo");
	nome.setAttribute("class", "nome");
	nome.innerHTML = texto;
	tempoC.setAttribute("class", "tempoC");
	tempoC.setAttribute("id", "tempo" + i);
	tempoC.innerHTML = "0:00/0:00";
	loop.setAttribute("class", "loop");
	loop.setAttribute("id", "loop" + i);
	loop.setAttribute("onClick", "repeat('som" + i + "','loop" + i + "');");
	wrapper.setAttribute("class", "wrapper");
	seek.setAttribute("class", "seek");
	seek.setAttribute("id", "seek" + i);
	trim.setAttribute("class", "trim");
	trim.setAttribute("id", "trim" + i);
	play.setAttribute("class", "play");
	play.setAttribute("id", "play" + i);
	play.setAttribute("onClick", "playPause('som" + i + "', 'play" + i + "');");
	stop.setAttribute("class", "stop");
	stop.setAttribute("onClick", "stopmusica('som" + i + "', 'play" + i + "');");
	containerDois.setAttribute("class", "containerDois");
	containerDois.setAttribute("id", "equalizer"+i);
	containerTres.setAttribute("class", "containerTres");
	mute.setAttribute("class", "mute");
	mute.setAttribute("id", "mute" + i);
	mute.setAttribute("onClick", "silencio('som" + i + "','mute" + i + "');");
	boxContainer.setAttribute("class", "checkbox");
	checkbox.setAttribute("type", "checkbox");
	checkbox.setAttribute("name", "nome");
	checkbox.setAttribute("id", "checkbox" + i);
	label.setAttribute("for", "checkbox" + i);
	remove.setAttribute("class", "remove");
	remove.setAttribute("onClick", "removeAudio(this,'som" + i + "');");
	lock.setAttribute("class","lock");
	volumeMenos.setAttribute("class", "volumeMenos");
	volumeMais.setAttribute("class", "volumeMais");
	volume.setAttribute("class", "volume");
	volume.setAttribute("id", "volume" + i);
	
	titulo.appendChild(nome);
	titulo.appendChild(tempoC);
	titulo.appendChild(loop);
	wrapper.appendChild(seek);
	wrapper.appendChild(trim);
	containerUm.appendChild(titulo);
	containerUm.appendChild(wrapper);
	containerUm.appendChild(play);
	containerUm.appendChild(stop);
	boxContainer.appendChild(checkbox);
	boxContainer.appendChild(label);
	containerDois.appendChild(audio);
	containerTres.appendChild(mute);
	containerTres.appendChild(boxContainer);
	containerTres.appendChild(remove);
	containerTres.appendChild(lock);
	containerTres.appendChild(volumeMenos);
	containerTres.appendChild(volume);
	containerTres.appendChild(volumeMais);
	container.appendChild(containerUm);
	container.appendChild(containerDois);
	container.appendChild(containerTres);
	createSlides('som' + i, 'seek' + i, 'trim' + i, 'volume' + i, 'play' + i);
	equ('equalizer'+i, i);
}
