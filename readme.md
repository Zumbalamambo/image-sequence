### 序列帧动画插件

##  调用方法

```
new sequence({
    saveBtn: "v-button",  // 选择按钮
    speedAgo: 50,  // 前进速度
    speedRear: 30,  // 后退速度
    x: 0,  // canvar-X
    y: 0,  // canvar-Y
    width: 640,  // 画布宽
    height: 1039,  // 画布高
    saveUrl: [
        {src:'images/sequence/v10006.png'},
        {src:'images/sequence/v10007.png'},
        {src:'images/sequence/v10008.png'},
        {src:'images/sequence/v10009.png'},
        {src:'images/sequence/v10010.png'}
    ], // 序列帧
}, function(){
    alert("结束");
});

```