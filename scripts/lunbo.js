var right=document.getElementById('turnRight');
	var lsit=document.getElementById('list');
	var left=document.getElementById('turnLeft');
	right.onclick=function(){
		list.style.transform="translateX(-575px)";
	}
	left.onclick=function(){
		list.style.transform="translateX(0px)";
	}