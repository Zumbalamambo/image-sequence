/**
 * Created by shuning on 2017/2/28.
 */
var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var touchstart = mobile ? "touchstart" : "mousedown";
var touchend = mobile ? "touchend" : "mouseup";
var touchmove = mobile ? "touchmove" : "mousemove";

function sequence(opt,getBack){
    this.pagemax = opt.saveUrl.length - 1;
    this.speed = [opt.speedAgo,opt.speedRear];
    this.nature = {x: opt.x, y:opt.y, width:opt.width, height:opt.height};
    this.fruit = getBack;
    this.init(opt);
}

sequence.prototype = {
    sequence_state:0, // 0 不执行  1向前  -1向后
    pagemax:0, // 最大帧
    sequence_page:0, // 序列帧控制器
    imageDom:[],
    init: function(opt){
        // 获取元素
        for (var i=0;i<opt.saveUrl.length;i++)
        {
            var img = new Image();
            img.src = opt.saveUrl[i].src;
            this.imageDom[i] = img;
        }
        this.btn(opt);
    },
    btn: function(opt){
        var me = this;
        document.getElementById(opt.saveBtn).addEventListener(touchstart, function(){
            if(me.sequence_state == 0){
                me.sequence_state = 1;
                execute();
            }
            me.sequence_state = 1;
        });

        document.getElementById(opt.saveBtn).addEventListener(touchend, function(){
            me.sequence_state = -1;
        });

        var c=document.getElementById("b-canvas");
        var ctx=c.getContext("2d");

        function execute(){
            if(me.sequence_state == 1){ // 向前
                me.sequence_page ++;
                var speed = me.speed[0];
            }
            if(me.sequence_state == -1){ // 向后
                me.sequence_page --;
                var speed = me.speed[1];
            }
            ctx.clearRect(me.nature.x,me.nature.y,me.nature.width,me.nature.height);
            ctx.drawImage(me.imageDom[me.sequence_page],me.nature.x,me.nature.y,me.nature.width,me.nature.height);
            if(me.sequence_page >0 && me.sequence_page < me.pagemax){
                setTimeout(function(){
                    execute();
                },speed);
            }else if(me.sequence_page == 0){
                me.sequence_state = 0;
            }else if(me.sequence_page == me.pagemax){
                me.fruit();
            }
        }
    }
}