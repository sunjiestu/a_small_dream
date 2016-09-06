//运动步骤
//1、闪（瞬间把宽高都变成0），scal，随机
//2、由小变大透明度1变为0,上一步效果走完了才会发生
//3、图片旋转，同时透明度由0变为1，当所有图片透明度都变为0才会发生
window.onload= function () {
	var btn=document.getElementById("btn");
	var imgs=document.querySelectorAll("img");
	
	var can=true;
	//添加点击事件
	btn.onmouseover=function(){
		if(!can){
			return;
		}
		can=false;
		var endImg=0;
	var endAll=0;
		for (var i=0;i<imgs.length;i++){
			//过渡效果，obj.style.tansition=“1s”
//			imgs[i].style.transition="1s";
			(function (i){
				setTimeout(function () {
					motion(imgs[i],"80ms", function () {
						//缩放到0
//						imgs[i].style.transform="scale(0)";
						this.style.transform="scale(0)";
					},function () {
						motion(this,"1s",function(){
							this.style.transform="scale(1)";
							this.style.opacity=0;
						},function(){
							endImg++;
							if(endImg==imgs.length){
//								第三次运动,函数zhuanImg
								zhuanImg();
								
							}
							
						})
					});
				},Math.random()*1500);
			})(i)
		}
		function zhuanImg(){
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.transition="";
			imgs[i].style.transform='rotateY(0deg) translateZ(-'+Math.random()*500+'px)';
		    (function(i){
		    	setTimeout(function(){
		    		motion(imgs[i],'3s',function(){
		    			this.style.transform="scale(1)";
							this.style.opacity=1;
							this.style.transform='rotateY(720deg) translateZ(0)';
		    		},function(){
							endAll++;
							if(endAll==imgs.length){
//								可以再次点击的条件
								can=true;
									}				
								})
		    			},Math.random()*800);	
		   		 })(i);
		    }
		}
		
	};
	
//运动函数（运动对象，运动的时间，运动的属性函数，运动完成后要做的事）
function motion (obj,time,dofn,callBack){
	obj.style.transition=time;
	dofn.call(obj);//调用函数并且把this的指向给obj
	var called=false;
	obj.addEventListener('transitionend', function () {
		if(!called){
			callBack&&callBack.call(obj);
			called=true;
		}
			
		},false);
	}
}
