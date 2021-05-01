window.addEventListener('load', function () {
    // 1.获取元素
    var arrow_left = document.querySelector('.arrow-left');
    var arrow_right = document.querySelector('.arrow-right');
    var pic_broadcast = document.querySelector('.pic_broadcast');
    var picture = document.querySelector('.picture');
    var pic_ul = picture.querySelector('.picture_1');
    var photo = pic_ul.querySelector('img');
    var pic_ol = picture.querySelector('.circle');
    var img_width = picture.offsetWidth;
    arrow_left.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null; //清除定时器变量
        this.style.backgroundColor = '#333';
    })
    arrow_left.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            arrow_right.click();
        }, 2000);
        this.style.backgroundColor = '';
    })
    arrow_right.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null; 
        this.style.backgroundColor = '#333';
    })
    arrow_right.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            arrow_right.click();
        }, 2000);
        this.style.backgroundColor = '';
    })
    for (var i = 0; i < pic_ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        pic_ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < pic_ol.children.length; i++) {
                pic_ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(pic_ul, -index * img_width);
        })
    }
    pic_ol.children[0].className = 'current';
    var first = pic_ul.children[0].cloneNode(true);
    pic_ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_right.addEventListener('click', function () {
        if (flag) {
            flag = false; 
        if (num == pic_ul.children.length-1) {
            pic_ul.style.left = 0;
            num = 0;
        }
            num++;
            animate(pic_ul, -num * img_width, function () {
            flag = true;
        });
        circle++;
        if (circle == pic_ol.children.length) {
            circle = 0;
        }
        circleChange();
        }
    })

    arrow_left.addEventListener('click', function () {
        if (flag) {
        flag = false;
        if (num == 0) {
            num = pic_ul.children.length-1;
            pic_ul.style.left = -num * img_width + 'px';
        }
        num--;
        animate(pic_ul, -num * img_width, function () {
            flag = true;
        });
        circle--;
        if (circle < 0) {
            circle = pic_ol.children.length - 1;
        }
        circleChange();
        }
    })
    function circleChange() {
        for (var i = 0; i < pic_ol.children.length; i++) {
            pic_ol.children[i].className = '';
        }
        pic_ol.children[circle].className = 'current';
    }
    
    var timer = setInterval(function () {
        arrow_right.click();
    }, 2000);
})

function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target) {
            clearInterval(obj.timer);
        }
        callback && callback();
        obj.style.left = obj.offsetLeft + step + 'px';
    },20)
}